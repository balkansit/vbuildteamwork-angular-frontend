@echo off
setlocal

:: Set the directory where the project is located
set "PROJECT_DIR=%~dp0"

:: Change to the project directory
cd /d "%PROJECT_DIR%"

:: Check if the node_modules directory exists
if not exist "node_modules" (
    echo "node_modules directory not found. Running npm install..."
    npm install
)

:: Build the Angular project
echo "Building Angular project..."
npm run ng-build

:: Package the Electron application
echo "Packaging Electron application..."
npm run build

:: Print success message
echo "Build process completed successfully."
endlocal