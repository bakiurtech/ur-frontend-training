export type UserRole = 'admin' | 'staff' | 'client';

export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

export type AuthTokens = {
    token: string;
};