/**
 * 🐙 GitHub Activity Insights
 * Fetches and analyzes a user's public GitHub activity.
 */

/**
 * Fetches GitHub insights for a given username.
 * @param {string} username - GitHub username
 * @returns {Promise<{ commitCount: number, activityLevel: string, lastActive: string, repoCount: number } | null>}
 */
export async function getGithubInsights(username) {
  if (!username) return null;

  try {
    // Fetch recent public events
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, {
      headers: { 'User-Agent': 'LifeOptimizerChat/1.0' }
    });

    if (!eventsRes.ok) {
      console.warn(`⚠️ GitHub API error for "${username}": ${eventsRes.status}`);
      return null;
    }

    const events = await eventsRes.json();

    // Count commits from PushEvents
    let commitCount = 0;
    let lastActive = null;

    for (const event of events) {
      if (event.type === 'PushEvent') {
        commitCount += event.payload?.commits?.length || 0;
      }
      if (!lastActive && event.created_at) {
        lastActive = event.created_at;
      }
    }

    // Determine activity level
    let activityLevel = "inactive";
    if (commitCount >= 20) activityLevel = "active";
    else if (commitCount >= 5) activityLevel = "moderate";
    else if (commitCount >= 1) activityLevel = "low";

    // Format last active into a human-readable relative time
    const lastActiveLabel = lastActive ? getRelativeTime(lastActive) : "no recent activity";

    // Optionally fetch repo count
    let repoCount = 0;
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: { 'User-Agent': 'LifeOptimizerChat/1.0' }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        repoCount = userData.public_repos || 0;
      }
    } catch (e) {
      // Silently skip repo count on failure
    }

    const insights = { commitCount, activityLevel, lastActive: lastActiveLabel, repoCount };
    console.log(`🐙 [GitHub] ${username}: ${commitCount} commits, ${activityLevel}, last active ${lastActiveLabel}, ${repoCount} repos`);
    return insights;

  } catch (error) {
    console.error(`🐙 GitHub fetch failed for "${username}":`, error.message);
    return null;
  }
}

/**
 * Builds a system message with GitHub context for LLM injection.
 * @param {{ commitCount: number, activityLevel: string, lastActive: string, repoCount: number } | null} insights
 * @returns {{ role: string, content: string } | null}
 */
export function buildGithubContext(insights) {
  if (!insights) return null;

  const lines = [
    `[GitHub Activity Context]`,
    `- Recent commits: ${insights.commitCount}`,
    `- Activity level: ${insights.activityLevel}`,
    `- Last active: ${insights.lastActive}`,
    `- Public repositories: ${insights.repoCount}`,
    ``,
    `[Mentoring Guidance Based on GitHub]`
  ];

  if (insights.activityLevel === "inactive") {
    lines.push(`User has no recent GitHub activity. They might be in a break or haven't started yet.`);
    lines.push(`Don't mention this unless they bring up coding. If they do, be encouraging — not guilt-tripping.`);
  } else if (insights.activityLevel === "low") {
    lines.push(`User is making small efforts on GitHub. This is worth celebrating.`);
    lines.push(`Acknowledge any effort. Suggest tiny next steps like "maybe push one small thing today?"`);
  } else if (insights.activityLevel === "moderate") {
    lines.push(`User is consistently active. They're building momentum.`);
    lines.push(`Reinforce the habit. Ask about what they're working on. Show genuine interest.`);
  } else if (insights.activityLevel === "active") {
    lines.push(`User is very active on GitHub. They're in a flow state.`);
    lines.push(`Celebrate this. Ask about their projects. Help them not burn out.`);
  }

  return {
    role: "system",
    content: lines.join("\n")
  };
}

/**
 * Returns a human-readable relative time string.
 */
function getRelativeTime(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now - then;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
}
