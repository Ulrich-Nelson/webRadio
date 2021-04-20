// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  registerUrl : "https://api-radio-world.herokuapp.com/customer/register",

  loginUrl :  "https://api-radio-world.herokuapp.com/customer/login",

  editProfilUrl : "https://api-radio-world.herokuapp.com/customer/edit_profil",

  logoutUrl : "https://api-radio-world.herokuapp.com/customer/logout",

  forgot : "https://api-radio-world.herokuapp.com/customer/forgot",

  resetUrl : "https://api-radio-world.herokuapp.com/customer/reset",

  googleLoginUrl : "https://api-radio-world.herokuapp.com/customer/google_login",

  facebookLoginUrl : "https://api-radio-world.herokuapp.com/customer/facebook_login",

  subscriptionUrl : "https://api-radio-world.herokuapp.com/customer/subscription",

  billsUrl : "https://api-radio-world.herokuapp.com/customer/bills",


  contentTypes : {
    json : 'application/json; charset=utf-8',
    XwwwFormUrlencoded : 'application/x-www-form-urlencoded; charset=utf-8'
  }


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
