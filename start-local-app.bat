@echo off
title ExecutiveVoice - Local LLaMA 3.2 Second Brain Launcher
color 0A

echo =====================================================================
echo   ExecutiveVoice: 28 Days, 9 Minutes a Day
echo   Local LLaMA 3.2 Second Brain Integration
echo =====================================================================
echo.

:: 1. Check if Ollama is running
echo [1/3] Checking local Ollama service...
curl.exe -s http://127.0.0.1:11434/api/tags > nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Ollama is not active on port 11434. Starting Ollama...
    start "" ollama run llama3.2
    timeout /t 3 > nul
) else (
    echo [*] Ollama is active on http://127.0.0.1:11434
)

:: 2. Start local production web server on port 3000
echo [2/3] Starting ExecutiveVoice local web server on port 3000...
set PORT=3000
start "ExecutiveVoice Web Server" cmd /c "node server.cjs"

:: 3. Open browser
timeout /t 2 > nul
echo [3/3] Opening ExecutiveVoice in browser (http://localhost:3000)...
start http://localhost:3000

echo.
echo =====================================================================
echo   ExecutiveVoice is now running locally!
echo   Local LLaMA 3.2 is directly connected with ZERO CORS or Mixed-Content blocks.
echo   Zero data leaves your machine.
echo =====================================================================
pause
