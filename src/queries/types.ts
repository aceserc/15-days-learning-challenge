export type ActionResponse<T = void> =
  | {
      success: false;
      error: string;
    }
  | {
      success: true;
      data?: T;
      message: string;
    };
