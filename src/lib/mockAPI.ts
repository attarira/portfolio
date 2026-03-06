/**
 * Configuration options for mock API calls
 */
export interface MockAPIConfig<T> {
  id: string;
  shouldError?: boolean;
  delayMs?: number;
  mockResponse: T;
}

/**
 * Simulates an asynchronous data fetch with a standard delay and optional error handling.
 * This replaces real API calls in the mock demos.
 * 
 * @param config The configuration for the mock payload, delay, and error status
 * @returns A promise resolving to the mock data or rejecting if an error is requested
 */
export async function getMockData<T>({
  shouldError = false,
  delayMs = 1500,
  mockResponse,
}: MockAPIConfig<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldError) {
        reject(new Error("Simulated network request failed. Please check the logs."));
      } else {
        resolve(mockResponse);
      }
    }, delayMs);
  });
}
