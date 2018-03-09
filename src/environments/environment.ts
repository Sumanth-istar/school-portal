// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBXKuR4tyssitH0iaC6dh4fw1a45bxRhFE",
    authDomain: "infra-earth-195518.firebaseapp.com",
    databaseURL: "https://infra-earth-195518.firebaseio.com",
    projectId: "infra-earth-195518",
    storageBucket: "infra-earth-195518.appspot.com",
    messagingSenderId: "80763142714"
  }
};