@echo off
setlocal

:: Set the directory where the Angular project is located
set "PROJECT_DIR=%~dp0"

:: Change to the project directory
cd /d "%PROJECT_DIR%"

:: Check if the node_modules directory exists
if not exist "node_modules" (
    echo "node_modules directory not found. Running npm install..."
    npm install
)

:: Start the Angular development server
echo "Starting Angular development server..."
ng serve

endlocal