// Template für environment.prod.ts
// Kopiere diese Datei zu environment.prod.ts und füge deine Firebase-Konfiguration ein

export const environment = {
  production: true,
  firebase: {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};