export interface User {
    uid?: string;
    name?: string;
    email: string | null;
    age?: number;
    salary?: number;
    joinedDate?: string;
} 

// export type { User } from "@buddy-turborepo/shared";