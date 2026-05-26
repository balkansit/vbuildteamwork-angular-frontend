@echo off
REM Check if a folder path is provided
IF "%~1"=="" (
    SET srcPath=src
) ELSE (
    SET srcPath=%~1
)

echo Scanning folder: %srcPath% for API calls...
echo ------------------------------------------ > api_endpoints.txt

REM Search for HTTP methods and output to file
findstr /s /i /n "http.get http.post http.put http.delete http.patch" %srcPath%\*.ts >> api_endpoints.txt

echo.
echo Done! Output saved to api_endpoints.txt
pause
