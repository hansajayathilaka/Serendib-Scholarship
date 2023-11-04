export enum LoginStatus {
    LOGGED_IN,
    LOGGED_OUT,
}

export enum SnackBarStatus {
    SUCCESS = "success-snack-bar",
    FAILED = "error-snack-bar",
    INFO = "info-snack-bar"
}

export enum Roles {
    ADMIN,
    USER,
}

export enum PaymentFrequency {
    MONTHLY = "Monthly",
    QUARTERLY = "Quarterly",
    SIX_MONTHLY = "Six Monthly",
    ANNUALLY = "Annually",
}

export class Common {
    public static readonly COPYRIGHT_TEXT = '© 2023. All Rights Reserved.';
    public static readonly COMPANY_NAME = 'Serendib Scholarships';
    public static readonly SAVE_BUTTON_TEXT = 'Save';
    public static readonly CANCEL_BUTTON_TEXT = 'Cancel';
    public static readonly ACTION_COLUMN_TEXT = 'Action';
    public static readonly SEARCH_LABEL = 'Search';
    public static readonly NO_SEARCH_RESULT_TEXT = 'No search result found';
    public static readonly SAVING = 'Saving... Please wait';
    public static readonly PAGE_NOT_FOUND = 'Page Not Found';
    public static readonly EDIT = 'Edit';
    public static readonly VIEW = 'View';
    public static readonly STUDENTS = 'View Students';
    public static readonly ATTACHMENTS = 'Attachments';
    public static readonly DELETE_BUTTON_TEXT = 'Delete';
    public static readonly WARNING_TITLE = 'Warning';
    public static readonly UPLOAD_TITLE = 'Upload Files';
    public static readonly YES_BUTTON_TEXT = 'Yes';
    public static readonly NO_BUTTON_TEXT = 'No';
    public static readonly OK_BUTTON_TEXT = 'OK';

}

export class AuthMessages {
    public static readonly LOGIN_TOKEN = 'brLoginToken';
    public static readonly LOGIN_BUTTON_TEXT = 'Login';
    public static readonly LOGIN_TITLE = 'Login';
    public static readonly PASSWORD_LABEL = 'Password';
    public static readonly EMAIL_LABEl = 'Email';
    public static readonly WRONG_CREDENTIALS_MESSAGE_TEXT = 'Incorrect email or password.';
    public static readonly WRONG_PASSWORD_MESSAGE_TEXT = 'Incorrect old password.';
    public static readonly SIGN_UP_TITLE = 'Setup Your Account';
    public static readonly CURRENT_PASSWORD_LABEL = 'Current Password';
    public static readonly FIRST_NAME_LABEL = 'First Name';
    public static readonly LAST_NAME_LABEL = 'Last Name';
    public static readonly NEW_PASSWORD_LABEL = 'New Password';
    public static readonly CONFIRM_PASSWORD_LABEL = 'Confirm Password';
    public static readonly SIGN_UP_BUTTON_TEXT = 'Sign Up';
    public static readonly STRONG_PASSWORD_REGEX = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'
    public static readonly CHANGE_PASSWORD_TITLE = 'Change Password';
    public static readonly SIGNUP_FIRST_STEP_TITLE = 'Name & Contact';
    public static readonly SIGNUP_SECOND_STEP_TITLE = 'Set Password';
}

export class UserMessages {
    public static readonly BASIC_DETAILS_TAB_TEXT = 'Basic Details';
    public static readonly CHANGE_PASSWORD_TAB_TEXT = 'Change Password';
    public static readonly PHONE_NUMBER_REGEX = '^[0-9]{10}$';
    public static readonly FIRST_NAME_LABEL = 'First Name';
    public static readonly LAST_NAME_LABEL = 'Last Name';
    public static readonly PHONE_NUMBER_LABEL = 'Phone Number';
    public static readonly EDIT_USER_PROFILE_TITLE = "Edit User Profile"
}

export const Particulars: { [key: string]: { value: string, display: boolean } } = {
    MONTHLY_RENTAL: {value: 'Monthly Rental', display: false},
    ADVANCE_PAYMENT: {value: 'Advance Payment', display: true},
    PAID_BY_CASH: {value: 'Paid By Cash', display: true},
    PAID_BY_CHEQUE: {value: 'Paid By Cheque', display: true},
    RESALE: {value: 'Resale', display: false}
};


export class NavigationMenu {
    public static readonly CUSTOMERS = 'Customers';
    public static readonly PROJECTS = 'Projects';
    public static readonly SPONSORS = 'Sponsors';
    public static readonly STUDENTS = 'Students';
}

export class UserManagementMessages {
    public static readonly FIRSTNAME_LABEL = 'First Name';
    public static readonly LASTNAME_LABEL = 'Last Name';
    public static readonly EMAIL_LABEL = 'Email';
    public static readonly CONTACT_NUMBER_LABEL = 'Contact Number';
    public static readonly IS_DISABLE_LABEL = 'Disable';
    public static readonly ADD_NEW_USER = 'Add New User';
    public static readonly PASSWORD_LABEL = 'Password';
    public static readonly DELETE_USER_TITLE = 'Delete User';
    public static readonly DELETE_USER_MESSAGE = 'Are you sure you want to delete this user?';
    public static readonly USER_ADDED_SUCCESSFULLY_MESSAGE_TEXT = 'User added successfully';
}

export class Projects {
    public static readonly ADD_NEW_PROJECT = "Add New Project";
    public static readonly EDIT_PROJECT = "Edit Project";
    public static readonly PURCHASING_DATE = "Purchasing Date";
    public static readonly PURCHASING_PRICE = "Purchasing Price";
    public static readonly EXTEND = "Extend";
    public static readonly ID = "ID";
    public static readonly PLAN_NO = "Plan Number";
    public static readonly DEED_NO = "Deed Number";
    public static readonly ADDRESS = "Address";
    public static readonly LAND_NAME = "Land Name";
    public static readonly PROJECT_NAME = "Project Name";
    public static readonly REMARKS = "Remarks";
    public static readonly TAGS = "Tag";
    public static readonly DELETE_CONFIRM = "Are you want to delete this project?";
    public static readonly DELETE_TITLE = "Delete Project";
    public static readonly PROJECT_ADDED_SUCCESS = "Project Created Successfully";
    public static readonly PROJECT_UPDATED_SUCCESS = "Project Updated Successfully";
    public static readonly PROJECT_DELETED_SUCCESS = "Project Deleted Successfully";
}

export class Names {
    public static readonly FIRST = "First Name";
    public static readonly MIDDLE = "Middle Name";
    public static readonly LAST = "Last Name";
}

export class Address {
    public static readonly ADDRESS1 = "Address Line 1";
    public static readonly ADDRESS2 = "Address Line 2";
    public static readonly CITY = "City";
    public static readonly STATE = "State";
    public static readonly ZIP_CODE = "Zip Code";
    public static readonly COUNTRY = "Country";
}

export class Sponsors {
    public static readonly ID = "ID";
    public static readonly ADD_NEW = "Add New Sponsor";
    public static readonly VIEW = "View Sponsor";
    public static readonly EDIT = "Edit Sponsor";
    public static readonly NAME = "Sponsor Name";
    public static readonly CONTACT_NUMBER = "Contact Number";
    public static readonly ADDRESS = "Address";
    public static readonly EMAIL = "Email";
    public static readonly MONTHLY_PAYMENT = "Monthly Payment";
    public static readonly PAYMENT_FREQUENCY = "Payment Frequency";
    public static readonly LAST_PAYMENT_DATE = "Last Payment Date";
    public static readonly LAST_PAYMENT_AMOUNT = "Last Payment Amount";
    public static readonly NOTES = "Notes";
    public static readonly DELETE_CONFIRM = "Are you want to delete this sponsor?";
    public static readonly DELETE_TITLE = "Delete Sponsor";
    public static readonly ADDED_SUCCESS = "Sponsor Created Successfully";
    public static readonly UPDATED_SUCCESS = "Sponsor Updated Successfully";
    public static readonly DELETED_SUCCESS = "Sponsor Deleted Successfully";
    public static readonly STUDENT_LIST = "Student List";
}

export class Students {
    public static readonly ID = "ID";
    public static readonly ADD_NEW = "Add New Student";
    public static readonly VIEW = "View Student";
    public static readonly EDIT = "Edit Student";
    public static readonly NAME = "Student Name";
    public static readonly CONTACT_NUMBER = "Contact Number";
    public static readonly ADDRESS = "Address";
    public static readonly EMAIL = "Email";
    public static readonly NOTES = "Notes";
    public static readonly INSTITUTE = "Institution";
    public static readonly COURSE = "Course";
    public static readonly COURSE_DURATION = "Course Duration";
    public static readonly START_DATE = "Start Date";
    public static readonly END_DATE = "Expected Completion Date";
    public static readonly STUDENTS_STUDY_YEAR = "Students Study Year";
    public static readonly SPONSOR = "Sponsor";
    public static readonly DELETE_CONFIRM = "Are you want to delete this student?";
    public static readonly DELETE_TITLE = "Delete Student";
    public static readonly ADDED_SUCCESS = "Student Created Successfully";
    public static readonly UPDATED_SUCCESS = "Student Updated Successfully";
    public static readonly DELETED_SUCCESS = "Student Deleted Successfully";
}

export class ErrorMessages {
    public static readonly EMAIL = `Invalid email address`;
    public static readonly TELEPHONE = `Invalid contact number`;
    public static readonly PASSWORDS_NOT_MATCHING = `Passwords are not matching`;
    public static readonly INCORRECT_OLD_PASSWORD = `Incorrect old password`;
    public static readonly NUMBERS_ONLY = `Numbers only allowed`;
    public static readonly STRONG_PASSWORD_MESSAGE_TEXT = 'Password must be at least 8 characters and contain lowercase and uppercase letters, number and special character.';

    public static required(filedName: string) {
        return `${filedName} is required`;
    }

    public static min(value: number, filedName = "Value") {
        return `${filedName} should be greater than ${value}`;
    }

    public static max(value: number, filedName = "Value") {
        return `${filedName} should be less than ${value}`;
    }
}

