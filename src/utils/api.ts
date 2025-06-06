import { Greeting } from "@/types/greeting"; // Import types

const JSONBLOB_BASE_URL = "https://jsonblob.com/api/jsonBlob";
const BLOB_ID = "1380732088805941248"; // Provided blob ID

export const fetchAllGreetings = async (): Promise<Record<string, Greeting>> => {
  const response = await fetch(`${JSONBLOB_BASE_URL}/${BLOB_ID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch greetings");
  }

  return response.json();
};

export const fetchGreetingBlob = async (greetingId: string): Promise<Greeting | null> => {
  const allGreetings = await fetchAllGreetings();
  return allGreetings[greetingId] || null; // Fetch the greeting by its ID
};

export const createOrUpdateGreetingBlob = async (greetingId: string, greeting: Greeting): Promise<void> => {
  const allGreetings = await fetchAllGreetings();
  allGreetings[greetingId] = greeting; // Save the greeting under its ID

  const response = await fetch(`${JSONBLOB_BASE_URL}/${BLOB_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(allGreetings),
  });

  if (!response.ok) {
    throw new Error("Failed to update greeting blob");
  }
};
