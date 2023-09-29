// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    firebase: {
        projectId: 'serendib-scholarships',
        appId: '1:42750177043:web:b250173a14ec8f9c5ef4e6',
        storageBucket: 'serendib-scholarships.appspot.com',
        locationId: 'asia-southeast1',
        apiKey: 'AIzaSyAA7uXgLj9-X8BLzLxA9iyxImKxqTniHFM',
        authDomain: 'serendib-scholarships.firebaseapp.com',
        messagingSenderId: '42750177043',
        measurementId: 'G-10LRCMW65P',
    },
    production: false,
    config: {
        appName: "Serendib Scholarships",
        loginLogo: "assets/img/logo-2.png",
        toolbarLogo: "assets/img/logo.png",
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
