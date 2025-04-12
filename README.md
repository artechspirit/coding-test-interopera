# InterOpera Coding Test

This repository contains a full-stack solution for InterOpera's coding challenge. The project is a modern Sales Dashboard application, featuring data visualization and an optional AI assistant. It is built using **Next.js** for the frontend and **FastAPI** for the backend.

---

## 🧰 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/)
- **State Management & Data Fetching**: [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview)
- **AI Assistant**: Integrates with Hugging Face LLM API
- **Shell Script**: `start-server.sh` to run both frontend and backend

---

## 🚀 Features

### ✅ Core Functionality

- Display a list of sales representatives, including:
  - Deals (won, lost, in progress)
  - Clients
  - Regions
- Backend API built with FastAPI serving data from `dummyData.json`
- Uses Redux Toolkit Query to fetch data from FastAPI into the Next.js frontend
- Proper loading states and error handling for smoother user experience
- Modular, reusable components
- TypeScript support

### 🧠 AI Assistant

- An endpoint `/api/ai` for processing user input and returning a mock AI response
- UI form for submitting questions to the AI assistant
- Prepared for integration with Hugging Face or other LLM APIs

---

## ⚡ Quick Start (Using Script)

You can launch both the backend and frontend servers in one step using the provided shell script:

> 📌 Make sure you have Python and Node.js installed, and give execute permission to the script if needed:

```bash
chmod +x start-server.sh
```

```bash
./start-server.sh
```


---

## 🧪 Manual Setup

### 1. Clone the Repository

```bash
git clone https://github.com/artechspirit/coding-test-interopera.git
cd coding-test-interopera
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate  # On macOS/Linux
# env\Scripts\activate   # On Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

> FastAPI runs on `http://localhost:8000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Next.js runs on `http://localhost:3000`

---

## 🔗 API Endpoints

- `GET /api/data` – Returns list of sales representatives and deals
- `POST /api/ai` – Accepts prompt input and returns mock AI-generated output

---

## 💡 Future Improvements
- Filters: Enable region/status filters and search by name
- Tests: Unit and integration tests for both backend and frontend

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Thanks to **InterOpera** for the challenge.
- Built with the help of amazing tools like **FastAPI**, **Next.js**, **Tailwind CSS**, and **RTK Query**.

---

## 📬 Contact

Feel free to submit issues or contribute. For further inquiries, reach out via GitHub or [LinkedIn](https://www.linkedin.com/beta-priyoko13).
