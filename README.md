# VOSW - Voice Operated Smart Workspace (Frontend Prototype)

This is the frontend prototype for VOSW, built with React, Vite, and Tailwind CSS.
Currently, it runs with a **Mock API** (`client/src/lib/mock-api.ts`) to simulate backend interactions.

## 🚀 How to Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.10 or higher) - *Only required when you are ready to build the real backend*

### 1. Frontend Setup (Mock Mode)
To run the UI as it currently exists (with mock data):

1.  **Download the code**:
    - Click the "Shell" in Replit.
    - Run `git clone <your-repl-git-url>` OR download the project as a ZIP.

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev:client
    ```
    Open `http://localhost:5000` in your browser.

---

## 🔌 Connecting to a Real Backend
When you are ready to implement the actual Python/Flask backend on your local machine:

1.  **Navigate to the reference implementation**:
    I have provided a starter Flask server in `reference/flask_server.py`.

2.  **Set up Python Environment**:
    ```bash
    cd reference
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```

3.  **Run the Python Server**:
    ```bash
    python flask_server.py
    ```

4.  **Connect Frontend to Backend**:
    - Edit `client/src/lib/mock-api.ts`
    - Replace the mock functions with actual `fetch()` calls to `http://localhost:5000/api/...`

## 📁 Project Structure

- `client/` - React Frontend Application
- `reference/` - Reference Python Backend Code (Start here for local dev)
- `shared/` - Shared Types/Schemas
