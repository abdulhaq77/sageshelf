import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

// Simple in-memory cache to save free tier requests
const searchCache = new Map();

export const getSearchSuggestions = async (req, res) => {
  console.log("testing getSearchSuggestions : ", req.body);
  try {
    const { query } = req.body;
    const cleanQuery = query?.trim().toLowerCase();

    if (!cleanQuery || cleanQuery.length < 3) {
      return res.status(200).json({ success: true, keywords: [] });
    }

    // Strategy 1: Cache Hit (Returns instantly, bypasses Gemini entirely)
    if (searchCache.has(cleanQuery)) {
      console.log(`Cache Hit for query: "${cleanQuery}"`);
      return res.status(200).json({
        success: true,
        keywords: searchCache.get(cleanQuery),
        source: "cache",
      });
    }

    const prompt = `
      You are an e-commerce catalog optimizer. Analyze this search phrase: "${query}"
      Extract 3 clean, unique target category keywords or genres for a book marketplace database query.
      Respond strictly with a JSON string array. No backticks, no prose:
      ["word1", "word2", "word3"]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let cleanText = response.text.trim();
    if (cleanText.startsWith("```json")) {
      cleanText = cleanText
        .replace(/^```json/, "")
        .replace(/```$/, "")
        .trim();
    }

    const keywords = JSON.parse(cleanText);

    // Strategy 2: Store in cache for future requests
    searchCache.set(cleanQuery, keywords);

    // Prevent cache from eating up all your server RAM over time
    if (searchCache.size > 200) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }

    return res.status(200).json({
      success: true,
      keywords: Array.isArray(keywords) ? keywords : [],
      source: "gemini-api",
    });
  } catch (error) {
    // Strategy 3: Graceful Error Recovery (If rate limits hit, don't crash)
    console.error("⚠️ Gemini Free Tier Limit Hit or Error:", error.message);
    return res.status(200).json({
      success: true,
      keywords: [], // Return empty array so UI fails silently and acts like a normal search bar
      message: "Rate limit safety fallback active.",
    });
  }
};
