# SkillSphere - Real-Time Microlearning & Mentorship Platform

Welcome to **SkillSphere**, a full-stack platform connecting learners and mentors for focused microlearning sessions — built with React and Django REST Framework!

---

## 🚀 Tech Stack

- **Frontend:** React (React Router, Axios, Context API)  
- **Backend:** Django + Django REST Framework  
- **Authentication:** JWT Token-based Auth with SimpleJWT  
- **Database:** PostgreSQL (SQLite for local dev)  
- **API Docs:** Swagger UI at `http://localhost:8000/api/docs/`  
- **Styling:** CSS Modules / Tailwind (adjust as needed)  

---

## 📋 Project Setup

### Backend Setup

1. **Clone the repo and go to backend folder:**

   ```bash
   git clone https://github.com/fatiima-noor/Skillsphere.git
   cd Skillsphere/backend

2. **Create & activate a virtual environment:**

   ```bash
   python -m venv env
   env\Scripts\activate.bat 

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt

4. **Run migrations:**

   ```bash
   python manage.py migrate

5. **Start the server:**

   ```bash
   python manage.py runserver

6. **Access API docs:**
  Open http://localhost:8000/api/docs/ in your browser.


### Frontend Setup

1. **Navigate to frontend folder:**

   ```bash
   cd ../frontend

2. **Install dependencies:**

   ```bash
   npm install

3. **Run the frontend dev server:**

   ```bash
   npm run dev

4. **Open app in browser:**
  Access at http://localhost:5173


## 🔑 Authentication Flow

- Signup/login via email & password
- JWT tokens stored client-side
- Role-based access to dashboards and routes

## 📂 Resources & Docs
Google Drive link for any doc and demo video.
[https://drive.google.com/drive/folders/1A2B3C4D5E6F7G8H9I0J?usp=sharing](https://drive.google.com/drive/folders/1irO4w3fHnw4xVckkG_E-ahRP-rEdJ8uX?usp=sharing)


## 🙌 Team Byte Buffers

Developed by Izen Fatima and Fatima Noor 
