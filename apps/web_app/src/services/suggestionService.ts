export const getRandomSuggestion = async (): Promise<string> => {
  try {
    const response = await fetch(`/api/suggestions/random`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch suggestion");
    }

    const suggestion = await response.json();
    return suggestion
  } catch (error) {
    console.error("Fetch suggestion request failed:", error);
    throw error;
  }
}