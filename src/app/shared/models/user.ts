export interface User {
    uid: string;
    email: string;
    password?: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    type: string;
    registeredAt: Date
}
