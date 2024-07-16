import {PaymentFrequency, Roles, SnackBarStatus} from "./constants";
import firebase from "firebase/compat";
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { DocumentReference } from "@firebase/firestore";
import Timestamp = firebase.firestore.Timestamp;

export interface User {
    UID?: string;
    Email?: string;
    EmailVerified?: boolean;
    FirstName?: string;
    LastName?: string;
    PhotoURL?: string;
    IsActive?: boolean;
    Disabled?: boolean;
    IsFirstLogin?: boolean;
    PhoneNumber?: string;
    CreatedAt?: Date;
    LastSignInAt?: string;
    Role?: Roles;
}

export interface FnResponse<T = any> {
    status: boolean;
    message: string;
    data: T;
}

export interface Project {
    ID: string;
    PurchasingDate: Date | Timestamp;
    PurchasingPrice: number;
    Extend: string;
    Address: string;
    LandName: string;
    ProjectName: string;
    PlanNo: string;
    DeedNo: string;
    Remarks?: string;
    IsActive: boolean;
}

export interface SnackBarConfig {
    text: string;
    status: SnackBarStatus;
    duration?: number;
    positionX?: MatSnackBarHorizontalPosition;
    positionY?: MatSnackBarVerticalPosition;
    action?: string;
}

export interface DeleteConfig {
    title: string;
    body: string;
    entityName: string
}

export interface ActionMenuItem<ComponentType> {
    actionText: string;
    iconName: string;
    action: keyof ComponentType;
}


export interface NavigationMenuItem {
    menuText: string;
    iconName: string;
    navigationLink: string;
    subMenuItems: NavigationMenuItem[];
}

export interface Tag {
    Name: string;
    ID?: string;
    IsActive: boolean;
}

export interface Name {
    First: string;
    Middle: string;
    Last: string;
}

export interface Address {
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    ZipCode: string;
    Country: string;
}

export interface Sponsor {
    _ID?: DocumentReference;
    ID?: string;
    Name: Name;
    IsAttachmentsAvailable: boolean;
    Address: Address;
    Email: string;
    Phone: string;
    AddressText: string;

    MonthlyPayment: number;
    PaymentFrequency: PaymentFrequency;
    LastPaymentDate: Date | Timestamp;
    LastPaymentAmount: number;
    Notes: string;
    PaymentRecords: string;

    IsActive: boolean;
    _Deleted: boolean;

    Students?: Student[];
}

export interface Student {
    _ID?: DocumentReference;
    ID?: string;
    Name: Name;
    Address: Address;
    AddressText: string;
    Email: string;
    Phone: string;
    Notes: string;
    Institute: string;
    Course: string;
    CourseDuration: string;
    IsAttachmentsAvailable: boolean;
    StartDate?: Date | Timestamp | null;
    StandingOrderNumber: string;
    ScholarshipStartDate?: Date | Timestamp | null;
    ExpectedCompletionDate?: Date | Timestamp | null;
    StudentsStudyYear: string;
    PaymentRecords: string;
    Completed: boolean;

    _Sponsor?: DocumentReference<Sponsor>;
    Sponsor?: Sponsor

    IsActive: boolean;
    _Deleted: boolean;
}
