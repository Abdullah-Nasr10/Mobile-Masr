import React, { useState } from "react";
import { SiOpenai } from "react-icons/si";
import "./AskAiRecommendation.css";
function AskAiRecommendation({ compareItems }) {
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const askAiAboutBestItem = async (items) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `You are an expert product analyst.
                    Your task is to evaluate a list of products and pick the BEST one based on a strict value-for-money analysis.
                    Your evaluation criteria:
                    - Price (lower is better if specs are similar)
                    - Discounts (prefer products that currently have discounts)
                    - Warranty duration (longer warranty is better)
                    - Specifications and features
                    - Price-to-spec ratio (the most important factor)
                    - Performance compared to the price
                    - Overall value for money
                    Important rules:
                    - The best product is NOT always the most expensive one.
                    - Choose the product that offers the strongest specifications for the lowest possible price.
                    Your response MUST be a valid JSON object with the following structure only:
                    {
                    "name": "best product name",
                    "message": "short explanation in English why this product is the best"
                    }
                    Do NOT include any text outside this JSON.`,
              },
              {
                role: "user",
                content: `Here are the products to compare: ${JSON.stringify(
                  items
                )}. Please identify the best product among them and explain why.`,
              },
            ],
          }),
        }
      );
      const data = await response.json();
      const parsedContent = JSON.parse(data.choices[0].message.content);
      return parsedContent;
    } catch (error) {
      console.error("Error asking AI:", error);
      return null;
    }
  };

  console.log("AI response data:", aiRecommendation);

  const [loading, setLoading] = useState(false);

  return (
    <div className="abd-askAiBestItem mt-5">
      <button
        className="abd-askAiBtn d-flex align-items-center gap-2"
        onClick={() => {
          setLoading(true);
          setAiRecommendation(null);
          askAiAboutBestItem(compareItems)
            .then((recommendation) => {
              setAiRecommendation(recommendation);
            })
            .catch((err) => {
              console.error(err);
              setAiRecommendation(null);
            })
            .finally(() => setLoading(false));
        }}
        disabled={loading}
      >
        <SiOpenai size={25} />
        {loading ? "Please wait..." : "Ask AI for Recommendation"}
      </button>

      <div className="abd-AiResponseContainer">
        {!loading && !aiRecommendation && (
          <div>
            Please Click the button above to get the best product
            recommendation.
          </div>
        )}
        {loading ? (
          <>
            <div className="spinner-border" role="status"></div>{" "}
            <span>loading...</span>
          </>
        ) : (
          aiRecommendation && (
            <>
              <div>name: {aiRecommendation.name}</div>
              <div>message: {aiRecommendation.message}</div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default AskAiRecommendation;
