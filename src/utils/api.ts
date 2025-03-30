import { Greeting, GreetingTheme } from "@/types/greeting"; // Import types

const JSONBLOB_BASE_URL = "https://jsonblob.com/api/jsonBlob";
const BLOB_ID = "1355935448937193472"; // Provided blob ID

export const fetchAllGreetings = async (): Promise<Record<string, object>> => {
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
  const greeting = allGreetings[greetingId] as Greeting | null; // Explicitly type as Greeting or null

  if (greeting && greeting.customTheme) {
    // Add the custom theme to the available themes if it exists
    const customTheme = greeting.customTheme as GreetingTheme;
    greeting.availableThemes = [...(greeting.availableThemes || []), customTheme];
  }

  return greeting;
};

export const createOrUpdateGreetingBlob = async (greetingId: string, greeting: object): Promise<void> => {
  const allGreetings = await fetchAllGreetings();
  allGreetings[greetingId] = greeting;

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
