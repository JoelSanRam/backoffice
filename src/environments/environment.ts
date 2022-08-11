// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl : 'https://sandbox.travelmapsoft.com/api/private/v6/',
//   apiUrl : 'https://sandbox.travelmapsoft.com/api/public/v6/',
  aereos: 'https://aereo.servertms.com/ae/public/',
  happi: 'https://mpuapi.payoff.mx/',


  apiUrl: 'https://api.softrek.mx/public/v6/',
  apiRest: 'https://sandbox.travelmapsoft.com/rest/api/',
  firebase: {
		apiKey: "AIzaSyD1DsGeZFHdUWBEw-IzS3oW-zyjpwreGKU",
		authDomain: "tms-sandboxdev.firebaseapp.com",
		databaseURL: "https://tms-sandboxdev-default-rtdb.firebaseio.com",
		projectId: "tms-sandboxdev",
		storageBucket: "tms-sandboxdev.appspot.com",
		messagingSenderId: "568881189451",
		appId: "1:568881189451:web:09112acaec26e0f8fa33ce"
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
