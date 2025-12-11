import { parseError } from "@/lib/parse-error";
import type { ActionResponse, ActionResponseSuccess } from "./types";

/**
 * Wraps server actions to throw on error for React Query integration
 * @template Ret - Return data type
 * @template Args - Function argument types tuple
 */
export const serverAction = <Ret = void, Args extends any[] = []>(
  fn: (...args: Args) => Promise<ActionResponse<Ret>>,
): ((...args: Args) => Promise<ActionResponseSuccess<Ret>>) => {
  return async (...args: Args): Promise<ActionResponseSuccess<Ret>> => {
    const response = await fn(...args);
    if (!response.success) {
      throw new Error(response.error);
    }
    return response;
  };
};

/**
 * Wraps function with try-catch, returning ActionResponse on error
 * @template Ret - Return data type
 * @template Args - Function argument types tuple
 */
export const tryCatchAction = <Ret = void, Args extends any[] = []>(
  fn: (...args: Args) => Promise<ActionResponse<Ret>>,
  errorMessage: string = "An error occurred",
): ((...args: Args) => Promise<ActionResponse<Ret>>) => {
  return async (...args: Args): Promise<ActionResponse<Ret>> => {
    try {
      return await fn(...args);
    } catch (err) {
      // Log error for debugging (in production, use a proper logging service)
      if (process.env.NODE_ENV === "development") {
        console.error("[Server Action Error]:", err);
      }
      return {
        success: false,
        error: errorMessage ?? parseError(err),
      };
    }
  };
};
