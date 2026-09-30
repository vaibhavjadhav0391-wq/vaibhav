import { NextResponse } from "next/server";

export const revalidate = 60; // Cache for 60 seconds

const USERNAME = "vaibhav032526";

interface AcSubmissionNum {
  difficulty: string;
  count: number;
}

export async function GET() {
  // Strategy 1: Query Official LeetCode GraphQL directly
  try {
    const graphqlQuery = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
            userCalendar {
              submissionCalendar
            }
          }
        }
      `,
      variables: { username: USERNAME },
    };

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify(graphqlQuery),
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      const matchedUser = data?.data?.matchedUser;
      if (matchedUser) {
        const statsList: AcSubmissionNum[] = matchedUser.submitStats?.acSubmissionNum || [];
        const total = statsList.find((s) => s.difficulty === "All")?.count || 0;
        const easy = statsList.find((s) => s.difficulty === "Easy")?.count || 0;
        const medium = statsList.find((s) => s.difficulty === "Medium")?.count || 0;
        const hard = statsList.find((s) => s.difficulty === "Hard")?.count || 0;
        const ranking = matchedUser.profile?.ranking || 0;

        let submissionCalendar: Record<string, number> = {};
        const rawCalendar = matchedUser.userCalendar?.submissionCalendar;
        if (typeof rawCalendar === "string") {
          try {
            submissionCalendar = JSON.parse(rawCalendar);
          } catch {
            submissionCalendar = {};
          }
        } else if (rawCalendar && typeof rawCalendar === "object") {
          submissionCalendar = rawCalendar;
        }

        return NextResponse.json({
          success: true,
          totalSolved: total,
          easySolved: easy,
          mediumSolved: medium,
          hardSolved: hard,
          ranking,
          submissionCalendar,
        });
      }
    }
  } catch (e) {
    console.warn("LeetCode direct GraphQL failed, trying mirror:", e);
  }

  // Strategy 2: Fallback to high-speed Vercel mirror
  try {
    const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${USERNAME}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      const statsList: AcSubmissionNum[] = data?.matchedUserStats?.acSubmissionNum || [];
      const total = data.totalSolved || statsList.find((s) => s.difficulty === "All")?.count || 0;
      const easy = data.easySolved ?? statsList.find((s) => s.difficulty === "Easy")?.count ?? 0;
      const medium = data.mediumSolved ?? statsList.find((s) => s.difficulty === "Medium")?.count ?? 0;
      const hard = data.hardSolved ?? statsList.find((s) => s.difficulty === "Hard")?.count ?? 0;
      const ranking = data.ranking || 0;

      let submissionCalendar = data.submissionCalendar;
      if (typeof submissionCalendar === "string") {
        try {
          submissionCalendar = JSON.parse(submissionCalendar);
        } catch {
          submissionCalendar = {};
        }
      }

      return NextResponse.json({
        success: true,
        totalSolved: total,
        easySolved: easy,
        mediumSolved: medium,
        hardSolved: hard,
        ranking,
        submissionCalendar: submissionCalendar || {},
      });
    }
  } catch (e) {
    console.warn("LeetCode Vercel mirror failed, trying Render mirror:", e);
  }

  // Strategy 3: Fallback to Alfa LeetCode Render mirror
  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${USERNAME}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      const statsList: AcSubmissionNum[] = data?.matchedUserStats?.acSubmissionNum || [];
      const total = data.totalSolved || statsList.find((s) => s.difficulty === "All")?.count || 0;
      const easy = data.easySolved ?? statsList.find((s) => s.difficulty === "Easy")?.count ?? 0;
      const medium = data.mediumSolved ?? statsList.find((s) => s.difficulty === "Medium")?.count ?? 0;
      const hard = data.hardSolved ?? statsList.find((s) => s.difficulty === "Hard")?.count ?? 0;
      const ranking = data.ranking || 0;

      let submissionCalendar = data.submissionCalendar;
      if (typeof submissionCalendar === "string") {
        try {
          submissionCalendar = JSON.parse(submissionCalendar);
        } catch {
          submissionCalendar = {};
        }
      }

      return NextResponse.json({
        success: true,
        totalSolved: total,
        easySolved: easy,
        mediumSolved: medium,
        hardSolved: hard,
        ranking,
        submissionCalendar: submissionCalendar || {},
      });
    }
  } catch (e) {
    console.error("All LeetCode API strategies failed:", e);
  }

  return NextResponse.json(
    { success: false, error: "Failed to fetch live LeetCode stats" },
    { status: 500 }
  );
}
