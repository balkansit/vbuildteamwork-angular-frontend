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
 
REM === Step 2: Define directories ===
SET "SRC_DIR=dist\%PROJECT_NAME%\browser"
SET "DEST_DIR=deploy-%PROJECT_NAME%"

echo Source directory: %SRC_DIR%
echo Destination directory: %DEST_DIR%

REM === Step 3: Ensure deploy dir exists ===
if not exist "%DEST_DIR%" (
    mkdir "%DEST_DIR%"
)
 
REM === Step 4: Clean deploy folder (keep .git, .gitignore, .htaccess) ===
echo Cleaning deploy folder (except .git, .gitignore, .htaccess)...
 
REM Delete files
for %%f in ("%DEST_DIR%\*") do (
    if /I not "%%~nxf"==".htaccess" if /I not "%%~nxf"==".gitignore" (
        del /F /Q "%%~f"
    )
)
 
REM Delete directories (exclude .git folder)
for /F "delims=" %%d in ('dir /B /AD "%DEST_DIR%"') do (
    if /I not "%%d"==".git" (
        rmdir /S /Q "%DEST_DIR%\%%d"
    )
)
 
REM === Step 5: Copy build files to deploy ===
echo Copying files to deploy folder...
xcopy "%SRC_DIR%\*" "%DEST_DIR%\" /E /H /C /Y
 
REM === Step 6: Git commit and push ===
echo Cd to deploy directory...
cd /d "%DEST_DIR%"

REM Check if this is a Git repo
REM === Check if deploy dir is a Git repo ===
if exist ".git" (
    echo.
    echo ================================
    echo ✅ %DEST_DIR% is a Git repository.
    echo ================================
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ ERROR: %DEST_DIR% is NOT a Git repository!
    echo Deployment ABORTED.
    echo Please initialize a Git repository and try again.
    echo Steps to initialize:
    echo 1. Clone your repo or create a new one.
    echo 2. Copy .git folder into %DEST_DIR%
    echo 3. Rerun this script.
    echo ========================================
    echo.
    pause
    exit /b 1
)

echo Committing to deploy repo...
git add .
git commit -m "Deploy: %DATE% %TIME%"
git push -f
 
echo ✅ Deployment complete.
ENDLOCAL