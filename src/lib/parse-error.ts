/**
 * Extracts error message from unknown error types
 */
export const parseError = (
  err: unknown,
  defaultMsg: string = "An unknown error occurred.",
): string | null => {
  if (err instanceof Error) {
    return err.message || defaultMsg;
  }
  if (typeof err === "string") {
    return err || defaultMsg;
  }
  return defaultMsg;
};
