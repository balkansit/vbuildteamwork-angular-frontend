@echo off
setlocal enabledelayedexpansion

:: Get current working directory (where script is run from)
set "targetDir=%cd%"
pushd "%targetDir%"

:: Find the first .component.html and .component.css
for %%f in (*.component.html) do (
    set "htmlFile=%%f"
    set "htmlPath=%cd%\%%f"
    goto :foundHtml
)
:foundHtml

for %%f in (*.component.css) do (
    set "cssFile=%%f"
    set "cssPath=%cd%\%%f"
    set "baseName=%%~nf"
    goto :foundCss
)
:foundCss

if not defined htmlFile (
    echo ❌ No .component.html found in %targetDir%
    pause
    exit /b
)

if not defined cssFile (
    echo ❌ No .component.css found in %targetDir%
    pause
    exit /b
)

:: Target cleaned file
set "cleanedFile=%cd%\!baseName!.cleaned.css"

echo 🧹 Cleaning unused CSS...
echo 🔍 HTML Path: !htmlPath!
echo 🎨 CSS Path : !cssPath!
echo 📄 Output   : !cleanedFile!
echo.

:: Use absolute paths in purgecss
purgecss --css "!cssPath!" --content "!htmlPath!" --output . > nul

if exist styles.css (
    rename "styles.css" "!cleanedFile!" > nul
    echo ✅ Done! Cleaned CSS saved as !cleanedFile!
) else (
    echo ❌ PurgeCSS failed — check if content path is correct.
)

popd
pause
