export interface ApiResponseType<T = unknown> {
  success?: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}
