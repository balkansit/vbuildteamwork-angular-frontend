@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul


echo What do you want to do?
echo 1. Run Angular app locally [Angular பயன்பாட்டை இயக்கவும்]
echo 2. Build Angular app (dev) [dev உருவாக்கம்]
echo 3. Build Angular app (prod) [உற்பத்தி உருவாக்கம்]
echo 4. Build Angular PWA [PWA உருவாக்கம்]
echo 5. Run Electron app [Electron பயன்பாட்டை இயக்கவும்]
echo 6. Build Angular and run Electron [Angular + Electron இயக்கம்]
echo 7. Build PWA and run Electron [PWA + Electron இயக்கம்]
echo 8. Build Prod and run Electron [Prod + Electron இயக்கம்]

set /p choice=Enter your choice (1-8): 

echo You selected: [%choice%]

if "%choice%"=="1" (
    echo Running: npm run start
    npm run start
) else if "%choice%"=="2" (
    echo Running: npm run ng-dev
    npm run ng-dev
) else if "%choice%"=="3" (
    echo Running: npm run ng-build
    npm run ng-build
) else if "%choice%"=="4" (
    echo Running: npm run ng-build-pwa
    npm run ng-build-pwa
) else if "%choice%"=="5" (
    echo Running: npm run electron
    npm run electron
) else if "%choice%"=="6" (
    echo Running: npm run start:electron
    npm run start:electron
) else if "%choice%"=="7" (
    echo Running: npm run build:pwa
    npm run build:pwa
) else if "%choice%"=="8" (
    echo Running: npm run build:regular
    npm run build:regular
) else (
    echo ❌ Invalid choice or no input!
)

pause
