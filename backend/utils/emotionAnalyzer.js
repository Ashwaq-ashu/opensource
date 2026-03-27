/**
 * 🧠 Emotion Analysis Helper
 * Analyzes user messages for emotional signals and generates context hints for the LLM.
 */

// Keyword-to-emotion mapping with categories
const EMOTION_PATTERNS = {
  frustration: {
    keywords: ["frustrated", "annoyed", "angry", "irritated", "hate", "sick of", "fed up", "can't stand", "ugh", "wtf", "damn"],
    label: "frustrated or irritated",
    guidance: "Be calm and validating. Don't minimize their frustration. Acknowledge it, then gently redirect."
  },
  sadness: {
    keywords: ["sad", "lonely", "depressed", "crying", "hopeless", "empty", "numb", "miss", "heartbroken", "grief", "tears"],
    label: "sad or emotionally low",
    guidance: "Be warm and gentle. Don't rush to 'fix' things. Sit with their feelings first."
  },
  anxiety: {
    keywords: ["anxious", "worried", "scared", "panic", "nervous", "overthinking", "can't sleep", "restless", "stressed", "overwhelmed", "pressure"],
    label: "anxious or overwhelmed",
    guidance: "Be grounding and steady. Help them slow down. Offer one small, concrete step."
  },
  confusion: {
    keywords: ["confused", "lost", "don't know", "no idea", "stuck", "uncertain", "directionless", "what should", "idk", "clueless"],
    label: "confused or directionless",
    guidance: "Don't give a roadmap. Ask clarifying questions. Help them find their own clarity."
  },
  distraction: {
    keywords: ["distracted", "scroll", "waste", "procrastinate", "lazy", "binge", "youtube", "instagram", "tiktok", "netflix", "phone", "screen time"],
    label: "distracted or unproductive",
    guidance: "Don't shame them. Normalize the struggle. Suggest a tiny action to rebuild momentum."
  },
  guilt: {
    keywords: ["guilty", "should have", "regret", "blame", "fault", "ashamed", "disappointed in myself", "let down", "failed"],
    label: "guilty or self-critical",
    guidance: "Be compassionate. Challenge their inner critic gently. Reframe failure as learning."
  },
  positive: {
    keywords: ["good", "better", "progress", "proud", "achieved", "happy", "excited", "motivated", "grateful", "amazing", "great day"],
    label: "positive or making progress",
    guidance: "Celebrate with them genuinely. Reinforce the behavior. Ask what helped them get here."
  },
  burnout: {
    keywords: ["tired", "exhausted", "burnt out", "burnout", "drained", "no energy", "can't focus", "done", "over it"],
    label: "burnt out or exhausted",
    guidance: "Validate their exhaustion. Don't push productivity. Suggest rest as a valid strategy."
  }
};

/**
 * Analyzes text for emotional signals.
 * @param {string} text - The user's latest message
 * @returns {{ emotions: string[], label: string, guidance: string, effortLevel: string }}
 */
export function analyzeEmotion(text) {
  const lowerText = text.toLowerCase();
  const detected = [];

  for (const [emotionKey, config] of Object.entries(EMOTION_PATTERNS)) {
    for (const keyword of config.keywords) {
      if (lowerText.includes(keyword)) {
        detected.push({ key: emotionKey, ...config });
        break; // One match per category is enough
      }
    }
  }

  // Determine effort level from message length and punctuation
  let effortLevel = "normal";
  if (text.length < 15) {
    effortLevel = "low-effort (short reply — user may be disengaged or tired)";
  } else if (text.length > 300) {
    effortLevel = "high-effort (long message — user is deeply reflecting or venting)";
  }

  // Check for question marks (user seeking direction)
  const hasQuestions = (text.match(/\?/g) || []).length;
  const seekingDirection = hasQuestions >= 1;

  // Build the final analysis
  if (detected.length === 0) {
    return {
      emotions: ["neutral"],
      label: "neutral or unclear",
      guidance: "Respond naturally. Ask a gentle, open-ended question to understand them better.",
      effortLevel,
      seekingDirection
    };
  }

  // Use the first (strongest) detected emotion as primary
  const primary = detected[0];
  return {
    emotions: detected.map(d => d.key),
    label: primary.label,
    guidance: primary.guidance,
    effortLevel,
    seekingDirection
  };
}

/**
 * Builds the emotion context system message for the LLM.
 * @param {string} text - The user's latest message
 * @returns {{ role: string, content: string }}
 */
export function buildEmotionContext(text) {
  const analysis = analyzeEmotion(text);

  const lines = [
    `[Emotion Detection]`,
    `Detected mood: ${analysis.label}`,
    `Detected emotions: ${analysis.emotions.join(", ")}`,
    `User effort level: ${analysis.effortLevel}`,
    `User seeking direction: ${analysis.seekingDirection ? "Yes" : "No"}`,
    ``,
    `[Response Guidance]`,
    analysis.guidance
  ];

  return {
    role: "system",
    content: lines.join("\n")
  };
}

/**
 * Logs the emotional insights for future storage/analytics.
 * @param {string} userId - The authenticated user's ID
 * @param {string} text - The user's latest message
 */
export function logInsights(userId, text) {
  const analysis = analyzeEmotion(text);
  console.log(`📊 [Insight] User: ${userId} | Mood: ${analysis.label} | Emotions: ${analysis.emotions.join(",")} | Effort: ${analysis.effortLevel} | Seeking direction: ${analysis.seekingDirection}`);
  return analysis;
}
