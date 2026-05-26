@echo off
SETLOCAL
 
REM === Step 1: Build Angular App ===
REM Get project name from input parameter
IF "%~1"=="" (
    echo Usage: %~nx0 [project-name]
    EXIT /B 1
)
SET "PROJECT_NAME=%~1"

echo Building Angular App. PROJECT_NAME: %PROJECT_NAME%
call ng build --configuration=production --project=%PROJECT_NAME% --output-path=dist\%PROJECT_NAME%
IF %ERRORLEVEL% NEQ 0 (
    echo ❌ Angular build failed.
    EXIT /B %ERRORLEVEL%
)