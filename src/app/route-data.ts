export class CustomerRoutes {
    public static readonly Root = "customers";
    public static readonly All = {url: 'all', title: "Customers"};
    public static readonly Ep = {url: 'ep', title: "EP Customers"};
    public static readonly Old = {url: 'old', title: "Old Customers"};
    public static readonly Advanced = {url: 'advanced', title: "Advanced Customers"};
    public static readonly View = {url: 'view', title: "View Customers"};
    public static readonly Ledger = {url: 'ledger', title: "View Ledger"};
    public static readonly Resale = {url: 'resale', title: "Resale Customers"};
}

export class ProjectRoutes {
    public static readonly Root = 'projects';
    public static readonly All = {url: 'all', title: 'Projects'};
}

export class SponsorRoutes {
    public static readonly Root = 'sponsors';
    public static readonly All = {url: 'all', title: 'Sponsors'};
}


export class AuthRoutes {
    public static readonly Root = 'auth'
    public static readonly Login = 'login'
    public static readonly SignUp = 'signup'
    public static readonly Profile = 'me'
    public static readonly ManageUsers = {url: 'users', title: 'Manage Users'}
}
