import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/ai`,
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
