export interface Project {
    id?: number;
    name: string;
    location: string;
    description: string;
    published?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    image?: string | ArrayBuffer | null;  // Updated this line
}
