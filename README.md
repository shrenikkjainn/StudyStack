# StudyStack 📚

StudyStack is a full-stack web application designed for students and instructors. Instructors can create and manage courses, while students can view them. The project features a beautifully styled, modern frontend and a robust, secure backend API.

---

## ✨ Features

### 🎨 Frontend (Modern UI)
- **Glassmorphism Design:** Beautiful, semi-transparent frosted glass UI components.
- **Dark Mode Aesthetics:** Easy on the eyes with vibrant neon accents (purples and indigos).
- **Responsive Layout:** Grid-based course display that adapts to different screen sizes.
- **Role-Based UI:** Forms and buttons (like "Create Course" and "Delete") dynamically show/hide based on whether the logged-in user is a student or an instructor.
- **Client-Side Routing & Auth:** Secure JWT token storage in `localStorage` for seamless authenticated sessions without page reloads.
- **Custom Notifications:** Elegant, non-blocking toast notifications for success and error states.

### ⚙️ Backend (RESTful API)
- **Authentication:** Secure user registration and login using JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Course Management:** Full CRUD (Create, Read, Update, Delete) operations for courses.
- **User Management:** Secure endpoints to manage user profiles and roles.
- **Security:** Helmet-ready architecture with strict CORS policies and environment-variable-driven configurations.
- **Error Handling:** Centralized error-handling middleware preventing server crashes from unhandled promise rejections or exceptions.
- **Health Checks:** A dedicated `/health` endpoint for uptime monitoring (essential for Render deployments).

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- Vanilla CSS3 (Custom variables, animations, backdrop-filters)
- Vanilla JavaScript (ES6+ async/await, Fetch API)

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT (jsonwebtoken)
- Bcrypt.js
- dotenv & cors

---

## 🚀 Live Demo

- **Backend API:** [https://studystack-backend-lsqw.onrender.com](https://studystack-backend-lsqw.onrender.com)
- **Frontend App:** *(Add your live frontend URL here, e.g., Vercel or Render Static Site)*

---

## 📁 Project Structure

```text
StudyStack/
│
├── Backend/                 # Express.js REST API
│   ├── config/              # Database connection logic
│   ├── controllers/         # Request handling logic (auth, courses)
│   ├── middlewares/         # JWT verification, error handling
│   ├── models/              # Mongoose schemas (User, Course)
│   ├── routes/              # Express route definitions
│   ├── .env                 # Environment variables (Ignored by Git)
│   ├── app.js               # Express app configuration
│   └── server.js            # Entry point for the backend
│
└── Frontend/                # Vanilla JS Web App
    ├── css/
    │   └── style.css        # Global styles and glassmorphism UI
    ├── js/
    │   ├── api.js           # API fetch wrappers and global state
    │   ├── auth.js          # Login/Register logic
    │   └── dashboard.js     # Course fetching, rendering, and creation logic
    ├── index.html           # Landing & Authentication Page
    └── dashboard.html       # Main application dashboard
```

---

## 💻 Local Setup & Installation

To run this project locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster or local MongoDB instance.

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```env
   PORT=5000
   DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/studystack
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server should now be running on `http://localhost:5000`.*

### 2. Frontend Setup
1. The frontend uses Vanilla JS, so no `npm install` is required!
2. Simply navigate to the `Frontend` folder.
3. Open `js/api.js` and ensure `API_BASE_URL` is pointing to your local backend for testing:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000';
   ```
4. Open `index.html` directly in your web browser, or use the **Live Server** extension in VS Code for a better development experience.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Check API server status | No |
| `POST` | `/register` | Register a new user | No |
| `POST` | `/login` | Authenticate user & receive JWT | No |
| `GET` | `/api/courses` | Fetch all available courses | Yes |
| `POST` | `/api/courses` | Create a new course | Yes (Instructor) |
| `DELETE` | `/api/courses/:id` | Delete a specific course | Yes (Instructor) |

---
*Developed with ❤️ by Shrenik.*
