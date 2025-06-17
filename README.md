✅ SQL Query Generator (Natural Language → SQL → Results)
<p align="center"> <img src="https://img.icons8.com/fluency/96/sql.png" width="80"/> </p>
🚀 Instantly convert natural language questions into executable SQL queries, run them on your database, and get downloadable results.
No login required. Just connect, ask, and get your data.


📌 Features
🔍 Ask questions like:
"Show names of students who scored more than 80."

🧠 Powered by Gemini (Google AI) to understand and convert natural language into SQL

📊 Instant execution of generated SQL on your custom MySQL database

📥 Download results as CSV or Excel

🔐 No login required – simple and fast workflow

🛠 Handles complex multi-table queries with joins, filters, sorting, and constraints

📚 How It Works
🔄 Application Flow
mermaid
Copy
Edit
graph TD
    A[Landing Page] --> B[Enter Database Details]
    B --> C[Ask Your Question]
    C --> D[LLM (Gemini) Generates SQL]
    D --> E[Query Runs on Your DB]
    E --> F[Results Shown in Table]
    F --> G[Download CSV/Excel]
🏗️ Project Structure
graphql
Copy
Edit
sql-query-generator/
├── backend/                 # Python FastAPI or Flask for DB & LLM logic
│   ├── app.py
│   ├── database.py
│   ├── gemini_query.py
│   └── exporter.py
├── frontend/                # React or plain HTML/JS frontend
│   └── src/
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── DBForm.jsx
│       │   └── QueryPage.jsx
│       └── App.js
├── assets/                  # Logo, banners, images
├── README.md
└── requirements.txt
🔧 Tech Stack
Component	Tech Used
Frontend	React
Backend API	Python + FastAPI or Flask
Database	MySQL (user-provided)
LLM Integration	Gemini 2.0 Flash
File Export	Pandas / CSV / OpenPyXL
Deployment	Render / Vercel / Replit / Docker

🚀 Getting Started (Locally)
1. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/sql-query-generator.git
cd sql-query-generator
2. Set up Python Backend
bash
Copy
Edit
cd backend
pip install -r requirements.txt
✅ Add your Gemini API key to gemini_query.py

3. Run Backend Server
bash
Copy
Edit
python app.py
4. Run Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
🌐 Live Deployment (Optional)
Deploy backend to Render or Replit

Deploy frontend to Vercel or Netlify

Add CORS support to backend if deploying separately

📥 Download Feature
You can download results as:

✅ .csv (for Excel, Sheets)

✅ .xlsx (styled export optional)

Handled using Python's:

csv module

pandas + openpyxl (for XLSX)

🧠 Gemini Prompt Strategy
Your prompt includes smart instructions like:

text
Copy
Edit
- Infer foreign key relationships from column names
- Use joins where required
- Handle filters, sorting, aggregations
- Output only SQL
This makes the model highly accurate across multi-table queries.

🎯 Future Features
 UI Query History (optional local cache)

 Auto-detect schema constraints via SQL

 Export entire query session

 Support for PostgreSQL, SQLite

👨‍💻 Author
Ezhilarasu G
B.Tech | Artificial Intelligence and Machine Learning
Open-source enthusiast & problem solver 💡

📄 License
MIT License. Use freely with attribution.

