@echo off
title Aparna State Bank - ATM Interactive Frontend
echo ========================================================
echo   🎀 APARNA STATE BANK - ATM SYSTEM DESIGN FRONTEND 🎀
echo ========================================================
echo Starting local ATM server and launching your web browser...
echo.

python server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Python server could not start. Opening frontend/index.html directly...
    start "" "frontend\index.html"
)
pause

