export type Paginated<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
};

export type ApiError = {
    statusCode: number;
    message: string;
    errors?: Record<string, string[]>;
};

export type ApiResponse<T> = {
    data: T;
};