export interface VendorInterface{
    _id?:string;
    companyName:string;
    companyEmail:string;
    companyLocation:string;
    password:string;
    createdAt:Date;
    category:string;
    isAccepted:AcceptanceStatus;
    photos:string[];
    videos:string[];
    description:string;
    phoneNumber:string;
    startingPrice:string | number;
    unAvailableDates:string[];
    services?:string[];
    locations:Location[];
    isBlocked:boolean;
}
export enum AcceptanceStatus {
    Requested = 'requested',
    Accepted = 'accepted',
    Rejected = 'rejected'
}

export enum Role {
    User = 'user',
    Admin = 'admin',
    Vendor = 'vendor'
}
