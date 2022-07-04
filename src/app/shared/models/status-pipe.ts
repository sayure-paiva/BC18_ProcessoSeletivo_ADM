export interface ObsWithStatusResult<T> {
    loading?: boolean;
    value?: T;
    error?: string;
}