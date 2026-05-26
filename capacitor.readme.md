# Bits Angular Workspace - Android App

This repository contains the **Android app** for the Bits Angular Workspace project, built using **Angular**, **Capacitor**, and **Gradle**.

---

## Prerequisites

Make sure you have installed:

- Node.js & npm (v18+ recommended)
- Angular CLI
- Capacitor CLI
- Java 21 (Temurin)
- Android SDK (with API 33+ installed)
- Gradle 8.11+ (uses gradle wrapper by default)

---

## Project Structure

```
bits-angular-workspace/
├── android/                  # Android native project
├── deploy-boutique-frontend/ # Angular build output (web assets)
├── src/                      # Angular source code
├── capacitor.config.json     # Capacitor configuration
└── README.md
```

---

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build Angular frontend:**

   ```bash
   npm run build -- --prod
   ```

3. **Sync Capacitor with Android:**

   ```bash
   npx cap sync android
   ```

4. **Run on device/emulator (debug):**

   ```bash
   npx cap run android
   ```

   This will:

   - Build the Angular project.
   - Copy web assets to `android/app/src/main/assets/public`.
   - Launch the app on the connected device or emulator.

5. **Build APK manually:**

   Go to the Android project:

   ```bash
   cd android
   ```

   - For Debug APK:

     ```bash
     ./gradlew assembleDebug
     ```

   - For Release APK:

     ```bash
     ./gradlew assembleRelease
     ```

   **APK location:**

   - Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Release: `android/app/build/outputs/apk/release/app-release.apk`

---

## Network Security

The app allows secure communication with the API:

`https://bits.itsourboutique.in/api`

This is enabled via a network security configuration in:

`android/app/src/main/res/xml/network_security_config.xml`

And referenced in `AndroidManifest.xml`:

```xml
<application
     android:networkSecurityConfig="@xml/network_security_config"
     ...
```

---

## Notes

- **Java 21** is required due to `compileOptions { sourceCompatibility JavaVersion.VERSION_21 }`.
- Gradle wrapper (`gradlew`) is configured for the project, so there's no need to install Gradle globally.
- Optional: Sign your release APK before publishing.

---

## References

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Gradle Plugin](https://developer.android.com/studio/releases/gradle-plugin)
- [Network Security Configuration](https://developer.android.com/training/articles/security-config)

---

If you want, I can also add a **“Quick Start” section** with one-liner commands to **build and run the app** without all the explanations, which is very handy for new developers. Let me know!
