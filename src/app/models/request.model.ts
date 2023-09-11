export interface SuccessfulRequest<T> {
  successful: boolean;
  result: T;
}