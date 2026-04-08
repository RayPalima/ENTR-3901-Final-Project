import { NextRequest, NextResponse } from "next/server";
import { fetchHasDataListings } from "@/lib/listing-search";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { keyword?: string };
    const keyword = body?.keyword?.trim();

    if (!keyword) {
      return NextResponse.json(
        { error: "Missing keyword in request body." },
        { status: 400 },
      );
    }

    const hasDataEnabled = Boolean(process.env.HASDATA_API_KEY);

    if (!hasDataEnabled) {
      return NextResponse.json({
        keyword,
        listings: null,
        note: "HASDATA_API_KEY is not set. Featured listings unavailable (debug mode).",
      });
    }

    const listings = await fetchHasDataListings({
      keyword,
      type: "forSale",
      "beds[min]": 2,
    });

    const propCount = listings && typeof listings === "object" && Array.isArray((listings as Record<string, unknown>).properties)
      ? ((listings as Record<string, unknown>).properties as unknown[]).length
      : 0;
    console.log(`[featured] HasData returned ${propCount} properties for "${keyword}"`);

    return NextResponse.json({ keyword, listings });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
