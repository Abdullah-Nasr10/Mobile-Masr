import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/ai",
});

export const askAI = async (feature, question, extra = {}) => {
  try {
    const { data } = await api.post("/", {
      feature,
      question,
      ...extra,
    });
    return data;
  } catch (error) {
    console.error("Error connecting to AI:", error);
    throw error;
  }
};
