export class SponsorRoutes {
    public static readonly Root = 'sponsors';
    public static readonly All = {url: 'all', title: 'Sponsors'};
}

export class StudentRoutes {
    public static readonly Root = 'students';
    public static readonly All = {url: 'all', title: 'Students'};
    public static readonly New = {url: 'new', title: 'Add New Student'};
    public static readonly Edit = {url: 'edit', title: 'Edit Student Data'};
    public static readonly View = {url: 'view', title: 'View Student Data'};
}

export class AuthRoutes {
    public static readonly Root = 'auth'
    public static readonly Login = 'login'
    public static readonly ForgetPassword = 'forget-password'
    public static readonly SignUp = 'signup'
    public static readonly Profile = 'me'
    public static readonly ResetEmailSendStatus = 'reset-password-email-status'
    public static readonly ManageUsers = {url: 'users', title: 'Manage Users'}
}
