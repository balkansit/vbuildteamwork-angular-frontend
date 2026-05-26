@echo off
setlocal

REM Usage: buildTauriApp.bat [build|dev]
if "%~1"=="" goto pick
if /I "%~1"=="build" goto build
if /I "%~1"=="dev" goto dev
echo Unknown action: %~1
goto usage

:pick
CHOICE /C BD /M "Select action: (B)uild or (D)ev"
if errorlevel 2 goto dev
if errorlevel 1 goto build

:usage
echo Usage: %~n0 [build|dev]
exit /b 1

:build
echo Running Tauri build...
npx tauri build
goto end

:dev
echo Running Tauri dev...
npx tauri dev
goto end

:end
endlocal