export type ActionResponseSuccess<T = void> = {
  success: true;
  data?: T;
  message: string;
};

export type ActionResponseError = {
  success: false;
  error: string;
};

export type ActionResponse<T = void> =
  | ActionResponseError
  | ActionResponseSuccess<T>;
