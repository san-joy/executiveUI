import { executiveGroupData } from "./executive-group-data.model";

export interface executiveData {
    id: number;
    officeId?: number;
    version: number;
    lastName: string;
    firstName: string;
    initials?: string;
    systemInitials: string;
    title: string;
    postTitle?: string;
    salutation?: string;
    jobTitle?: string;
    executiveGroup: executiveGroupData;
}