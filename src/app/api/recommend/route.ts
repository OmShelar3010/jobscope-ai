// import { NextResponse } from "next/server";

// const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID;
// const ADZUNA_APP_KEY = process.env.ADZUNA_APP_KEY;

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { skills } = body;

//     if (!skills) {
//       return NextResponse.json({ error: "Skills are required" }, { status: 400 });
//     }

//     if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) {
//       console.error("Adzuna credentials missing");
//       return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
//     }

//     console.log(`Searching Adzuna for: ${skills}`);

//     // Fetch jobs from Adzuna (India - 'in')
//     // Docs: https://developer.adzuna.com/docs/search
//     const response = await fetch(
//       `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=10&what=${encodeURIComponent(skills)}&content-type=application/json`
//     );

//     if (!response.ok) {
//       console.error(`Adzuna API Error: ${response.status} ${response.statusText}`);
//       return NextResponse.json({ error: "Failed to fetch jobs from Adzuna" }, { status: response.status });
//     }

//     const data = await response.json();

//     // Map Adzuna results to our Job interface
//     const jobs = data.results.map((job: any) => ({
//       id: String(job.id),
//       title: job.title,
//       company: job.company.display_name,
//       location: job.location.display_name,
//       description: job.description,
//       posted_at: job.created,
//     }));

//     return NextResponse.json({ jobs });
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { skills } = body;

    if (!skills) {
      return NextResponse.json(
        { error: "Skills are required" },
        { status: 400 }
      );
    }

    const APP_ID = process.env.ADZUNA_APP_ID;
    const APP_KEY = process.env.ADZUNA_APP_KEY;

    if (!APP_ID || !APP_KEY) {
      return NextResponse.json(
        { error: "API keys not configured properly" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${encodeURIComponent(
        skills
      )}&results_per_page=10`
    );


    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs from Adzuna" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({ jobs: data.results });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
