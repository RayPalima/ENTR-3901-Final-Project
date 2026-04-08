import { NextRequest, NextResponse } from "next/server";
import {
  fetchHasDataListings,
  parseNaturalLanguageToZillowParams,
} from "@/lib/listing-search";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { query?: string };
    const query = body?.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Missing query in request body." },
        { status: 400 },
      );
    }

    const parsedParams = await parseNaturalLanguageToZillowParams(query);
    const listings = await fetchHasDataListings(parsedParams);

    return NextResponse.json({
      query,
      parsedParams,
      listings,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected search error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
