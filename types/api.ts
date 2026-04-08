export interface ApiEnvelope<T> {
  data: T;
  error?: string | null;
}
