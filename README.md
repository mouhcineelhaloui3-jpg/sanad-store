# SANAD Store

GitHub-ready monorepo for **سَنَد / SANAD**, a Moroccan COD branded DTC store for daily body support products.

## Stack

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Backend: Python FastAPI, SQLAlchemy, Alembic
- Database: PostgreSQL database named `namabeauty`
- Deployment: Frontend on Vercel, backend on EasyPanel

## Structure

```txt
sanad-store/
├── docs/       # product, positioning, CRO, architecture docs
├── frontend/   # Next.js storefront
└── backend/    # FastAPI order API
```

## Local Frontend

```bash
cd frontend
npm install
npm run dev
```

## Local Backend

Python is required.

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment

Copy examples:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

## GitHub Note

This machine currently does not expose `git` or `gh` in PATH. Install Git/GitHub CLI or use GitHub Desktop to create the remote repository and push this folder.
