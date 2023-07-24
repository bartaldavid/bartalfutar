export async function safeFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not OK: ${response.statusText}`);
    }

    const data = await response.json();

    // You can add additional custom validation logic here if needed
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching data: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred: ${error}`);
    }
  }
}
