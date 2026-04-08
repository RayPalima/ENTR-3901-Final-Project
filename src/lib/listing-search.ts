export type ZillowListingType = "forSale" | "forRent" | "sold";

export type ZillowListingParams = {
  keyword: string;
  type: ZillowListingType;
  sort?: string;
  "price[min]"?: number;
  "price[max]"?: number;
  "beds[min]"?: number;
  "beds[max]"?: number;
  "baths[min]"?: number;
  "baths[max]"?: number;
  "yearBuilt[min]"?: number;
  "yearBuilt[max]"?: number;
  "squareFeet[min]"?: number;
  "squareFeet[max]"?: number;
  page?: number;
};

type OpenRouterMessage = {
  role: "system" | "user";
  content: string;
};

type OpenRouterChoice = {
  message?: {
    content?: string;
  };
};

type OpenRouterResponse = {
  choices?: OpenRouterChoice[];
};

type OpenRouterErrorPayload = {
  error?: {
    message?: string;
    code?: number;
  };
};

type ParsedModelOutput = {
  keyword?: unknown;
  type?: unknown;
  sort?: unknown;
  "price[min]"?: unknown;
  "price[max]"?: unknown;
  "beds[min]"?: unknown;
  "beds[max]"?: unknown;
  "baths[min]"?: unknown;
  "baths[max]"?: unknown;
  "yearBuilt[min]"?: unknown;
  "yearBuilt[max]"?: unknown;
  "squareFeet[min]"?: unknown;
  "squareFeet[max]"?: unknown;
  page?: unknown;
};

const ALLOWED_TYPES = new Set<ZillowListingType>(["forSale", "forRent", "sold"]);

const ALLOWED_SORTS = new Set([
  "globalrelevanceex",
  "pricea",
  "priced",
  "days",
  "beds",
  "baths",
  "size",
  "lot",
  "zest",
  "paymenta",
  "paymentd",
]);

function asPositiveNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return Math.floor(value);
  if (typeof value === "string") {
    const n = Number(value.replace(/[^\d.]/g, ""));
    if (Number.isFinite(n) && n > 0) return Math.floor(n);
  }
  return undefined;
}

function asPage(value: unknown): number | undefined {
  const n = asPositiveNumber(value);
  if (!n) return undefined;
  return Math.min(n, 20);
}

function extractJsonObject(raw: string): string {
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Model did not return a JSON object.");
  }
  return raw.slice(firstBrace, lastBrace + 1);
}

function sanitizeParsedOutput(input: ParsedModelOutput): ZillowListingParams {
  const keyword = typeof input.keyword === "string" ? input.keyword.trim() : "";
  if (!keyword) {
    throw new Error("Could not determine a location keyword from the query.");
  }

  const typeRaw = typeof input.type === "string" ? input.type.trim() : "forSale";
  const type: ZillowListingType = ALLOWED_TYPES.has(typeRaw as ZillowListingType)
    ? (typeRaw as ZillowListingType)
    : "forSale";

  const params: ZillowListingParams = {
    keyword,
    type,
  };

  if (typeof input.sort === "string" && ALLOWED_SORTS.has(input.sort)) {
    params.sort = input.sort;
  }

  params["price[min]"] = asPositiveNumber(input["price[min]"]);
  params["price[max]"] = asPositiveNumber(input["price[max]"]);
  params["beds[min]"] = asPositiveNumber(input["beds[min]"]);
  params["beds[max]"] = asPositiveNumber(input["beds[max]"]);
  params["baths[min]"] = asPositiveNumber(input["baths[min]"]);
  params["baths[max]"] = asPositiveNumber(input["baths[max]"]);
  params["yearBuilt[min]"] = asPositiveNumber(input["yearBuilt[min]"]);
  params["yearBuilt[max]"] = asPositiveNumber(input["yearBuilt[max]"]);
  params["squareFeet[min]"] = asPositiveNumber(input["squareFeet[min]"]);
  params["squareFeet[max]"] = asPositiveNumber(input["squareFeet[max]"]);
  params.page = asPage(input.page);

  return params;
}

function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  const next = { ...obj };
  for (const key of Object.keys(next)) {
    if (next[key] === undefined) {
      delete next[key];
    }
  }
  return next;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getOpenRouterModels(): string[] {
  const fromEnv = process.env.OPENROUTER_PARSER_MODELS
    ?.split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }

  return [
    "qwen/qwen3-next-80b-a3b-instruct:free",
    "qwen/qwen3-coder:free",
    "meta-llama/llama-3.1-8b-instruct:free",
  ];
}

async function callOpenRouterOnce(
  model: string,
  apiKey: string,
  messages: OpenRouterMessage[],
): Promise<OpenRouterResponse> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.1,
      messages,
    }),
  });

  if (response.ok) {
    return (await response.json()) as OpenRouterResponse;
  }

  const bodyText = await response.text();
  let payload: OpenRouterErrorPayload | undefined;
  try {
    payload = JSON.parse(bodyText) as OpenRouterErrorPayload;
  } catch {
    payload = undefined;
  }

  const message = payload?.error?.message ?? bodyText;
  const error = new Error(`OpenRouter request failed (${response.status}): ${message}`);
  (error as Error & { status?: number }).status = response.status;
  throw error;
}

async function callOpenRouterWithFallback(
  apiKey: string,
  messages: OpenRouterMessage[],
): Promise<OpenRouterResponse> {
  const models = getOpenRouterModels();
  const errors: string[] = [];

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        return await callOpenRouterOnce(model, apiKey, messages);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const status = (error as Error & { status?: number }).status;
        const isRateLimit = status === 429;
        errors.push(`${model} attempt ${attempt}: ${message}`);

        if (isRateLimit && attempt === 1) {
          await sleep(700);
          continue;
        }

        if (!isRateLimit) {
          break;
        }
      }
    }
  }

  throw new Error(
    "All configured OpenRouter parser models are currently unavailable or rate-limited. " +
      "Set OPENROUTER_PARSER_MODELS to additional models or retry shortly. " +
      `Details: ${errors.slice(0, 3).join(" | ")}`,
  );
}

export async function parseNaturalLanguageToZillowParams(userQuery: string): Promise<ZillowListingParams> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY.");
  }

  const trimmed = userQuery.trim();
  if (!trimmed) {
    throw new Error("Search query is required.");
  }

  const messages: OpenRouterMessage[] = [
    {
      role: "system",
      content:
        "You convert real-estate search text into HasData Zillow Listing API params. " +
        "Return only JSON object with allowed keys: " +
        'keyword, type, sort, "price[min]", "price[max]", "beds[min]", "beds[max]", "baths[min]", "baths[max]", "yearBuilt[min]", "yearBuilt[max]", "squareFeet[min]", "squareFeet[max]", page. ' +
        'type must be one of: forSale, forRent, sold. If uncertain, set type to "forSale". ' +
        "keyword must be a concise location phrase (city/state/zip/neighborhood). " +
        "Never include explanations, markdown, or extra keys.",
    },
    {
      role: "user",
      content: trimmed,
    },
  ];

  const data = await callOpenRouterWithFallback(apiKey, messages);
  const content = data.choices?.[0]?.message?.content ?? "";
  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  const jsonText = extractJsonObject(content);
  const parsed = JSON.parse(jsonText) as ParsedModelOutput;
  return stripUndefined(sanitizeParsedOutput(parsed));
}

export async function fetchHasDataListings(params: ZillowListingParams): Promise<unknown> {
  const apiKey = process.env.HASDATA_API_KEY;
  if (!apiKey) {
    throw new Error("Missing HASDATA_API_KEY.");
  }

  const url = new URL("https://api.hasdata.com/scrape/zillow/listing");
  for (const [key, value] of Object.entries(stripUndefined(params))) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HasData request failed (${response.status}): ${body}`);
  }

  return response.json();
}
