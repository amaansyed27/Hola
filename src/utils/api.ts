export const fetchGreetingById = async (id: string) => {
  const response = await fetch(`/api/greetings/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch greeting");
  }
  return response.json();
};
