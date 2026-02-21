import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const what = searchParams.get("what") || "developer";
    const where = searchParams.get("where") || "india";

    const app_id = process.env.ADZUNA_APP_ID;
    const app_key = process.env.ADZUNA_APP_KEY;

    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${app_id}&app_key=${app_key}&what=${what}&where=${where}&results_per_page=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return NextResponse.json(data.results);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}