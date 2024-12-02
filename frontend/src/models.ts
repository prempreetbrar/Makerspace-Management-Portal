export interface Booking {
    id: number;
    userEmail: string;
    title: string;
    description: string;
    equipmentID: number;
    bookingDate: string; // ISO Date format (YYYY-MM-DD)
    timeSlot1: string; // Time format (HH:mm:ss)
    timeSlot2?: string | null; // Optional or nullable time
    status: 'approved' | 'denied' | 'pending'; // Status constants
    adminComments?: string | null; // Optional or nullable text

    // Associations
    user?: User; // The user associated with the booking
    equipment?: Equipment; // The equipment associated with the booking
}

export interface Equipment {
    id: number;
    name: string;
    description: string;
    icon: string; // Base64 encoded string
    isUnderMaintenance: boolean;
    isBookable: boolean;
    isPremium: boolean;

    // Associations
    bookings?: Booking[]; // List of bookings for this equipment
    requests?: Request[]; // List of requests for this equipment
    issues?: Issue[]; // List of issues for this equipment
}

export interface Issue {
    id: number;
    equipmentID: number;
    description: string;
    isResolved: boolean;
    createdAt: string; // ISO Date string

    // Associations
    equipment?: Equipment; // The equipment associated with the issue
}

export interface Request {
    id: number;
    userEmail: string; // Email address of the user
    title: string; // Title of the request
    description: string; // Optional description of the request
    status: 'approved' | 'denied' | 'pending'; // Status of the request
    equipmentID: number; // Foreign key referencing Equipment

    // Associations
    user?: User; // The user who made the request
    equipment?: Equipment; // The equipment associated with the request
    attachments?: Attachment[]; // List of attachments related to the request
}

export interface User {
    email: string; // Primary key and user email
    firstName: string; // User's first name
    lastName: string; // User's last name
    userRole: 'admin' | 'premium' | 'basic'; // Enum representing the user's role
    password: string; // Hashed password
    confirmPassword?: string; // Optional: Used only during user creation or password change

    // Associations
    requests?: Request[]; // List of requests made by the user
    bookings?: Booking[]; // List of bookings made by the user
}

export interface Attachment {
    id: number; // Primary key
    requestID: number; // Foreign key referencing Request
    file: Blob; // Represents the file as a binary large object (BLOB)

    // Associations
    request?: Request; // The associated Request object
}
