"""
==========================================================================
ATM System Design - Local REST API & Web Server
Zero-Dependency Python Server (Runs on Python 3.x Standard Library)
Serves the Frontend and Synchronizes with `logs/transactions.log` and `data/account.txt`
==========================================================================
"""

import http.server
import socketserver
import json
import os
import sys
import webbrowser
from datetime import datetime

# Configure stdout and stderr for UTF-8 on Windows
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PORT = 5000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
LOGS_FILE = os.path.join(BASE_DIR, "logs", "transactions.log")
DATA_FILE = os.path.join(BASE_DIR, "data", "account.txt")

# Ensure required folders exist
os.makedirs(os.path.join(BASE_DIR, "logs"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "data"), exist_ok=True)

# In-memory account state
class AccountState:
    def __init__(self):
        self.balance = 150.00
        self.pin = "1234"
        self.failed_attempts = 0
        self.is_locked = False
        self.load_from_files()

    def load_from_files(self):
        if os.path.exists(DATA_FILE):
            try:
                with open(DATA_FILE, "r") as f:
                    lines = [line.strip() for line in f.readlines() if line.strip()]
                    if len(lines) >= 1:
                        self.failed_attempts = int(lines[0])
                    if len(lines) >= 2:
                        self.is_locked = bool(int(lines[1]))
            except Exception as e:
                print(f"[Warning] Error reading {DATA_FILE}: {e}")

    def save_state(self):
        try:
            with open(DATA_FILE, "w") as f:
                f.write(f"{self.failed_attempts}\n{1 if self.is_locked else 0}\n")
        except Exception as e:
            print(f"[Warning] Error writing {DATA_FILE}: {e}")

    def get_logs(self):
        if os.path.exists(LOGS_FILE):
            try:
                with open(LOGS_FILE, "r") as f:
                    return [line.strip() for line in f.readlines() if line.strip()]
            except Exception as e:
                print(f"[Warning] Error reading {LOGS_FILE}: {e}")
        return []

    def append_log(self, type_str, amount):
        logs = self.get_logs()
        counter = len(logs) + 1
        ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        entry = f"[TXN{counter:04d}] [{ts}] {type_str}: Rs. {amount:.2f}"
        try:
            with open(LOGS_FILE, "a") as f:
                f.write(entry + "\n")
        except Exception as e:
            print(f"[Warning] Error writing {LOGS_FILE}: {e}")
        return entry

state = AccountState()

class ATMRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=FRONTEND_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/account":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            payload = {
                "balance": state.balance,
                "failedAttempts": state.failed_attempts,
                "isLocked": state.is_locked,
                "logs": state.get_logs()
            }
            self.wfile.write(json.dumps(payload).encode("utf-8"))
            return

        # Fallback to serving frontend files
        super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length) if length > 0 else b"{}"
        try:
            data = json.loads(body.decode("utf-8"))
        except:
            data = {}

        if self.path == "/api/transaction":
            txn_type = data.get("type", "Transaction")
            amount = float(data.get("amount", 0))
            new_bal = data.get("balance", None)
            if new_bal is not None:
                state.balance = float(new_bal)
            entry = state.append_log(txn_type, amount)
            state.save_state()

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "entry": entry, "balance": state.balance}).encode("utf-8"))
            return

        elif self.path == "/api/reset":
            state.balance = 150.00
            state.failed_attempts = 0
            state.is_locked = False
            state.save_state()

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "balance": state.balance}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ATMRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n=======================================================")
        print(f"  [+] APARNA STATE BANK - ATM SYSTEM DESIGN FRONTEND")
        print(f"=======================================================")
        print(f"  Local Server:  {url}")
        print(f"  Frontend Dir:  {FRONTEND_DIR}")
        print(f"  Audit Logs:    {LOGS_FILE}")
        print(f"  Card State:    {DATA_FILE}")
        print(f"=======================================================")
        print(f"  Press Ctrl+C in terminal to stop the server.\n")

        # Open in default browser automatically
        try:
            webbrowser.open(url)
        except:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down ATM server...")
            httpd.server_close()

if __name__ == "__main__":
    run_server()
