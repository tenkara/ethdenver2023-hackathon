export interface MessageI {
    id: number;
    content: string;
    role: "user" | "system";
}