export interface User {
    id: number;
    telephone: number;
    image: string; // base64 string or URL/path
    historiquePointages?: number[]; // Optional if you need to track pointages
}

// For create/update operations if needed later
export interface UserOperation {
    telephone: number;
    image: string;
}