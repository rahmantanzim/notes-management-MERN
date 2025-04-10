# 🗂️ NoteDesk - Employee Note Management System

A secure and role-based note management system built with the **MERN Stack** (MongoDB, Express.js, React, Node.js).  
NoteDesk replaces traditional sticky notes with a centralized ticket system for employees, managers, and admins.

---

## 📌 Features

- 🧾 Public-facing contact page
- 🔐 Employee login system with JWT authentication
- 👋 Welcome page after login
- 🧭 Easy navigation UI
- 👤 Display current user's name and role
- 🚪 Logout functionality
- ⏳ Weekly login requirement for all users
- 🚫 Instant access removal (user disabling)
- 🗒️ Notes assigned to specific employees
- 🧾 Notes contain ticket number, title, body, created/updated dates
- 📂 Notes can be marked as `OPEN` or `COMPLETED`
- 🔒 Role-based access:
  - Employees: View/edit their own notes
  - Managers/Admins: View/edit/delete all notes
  - Only Managers/Admins can manage users and create new users
- 🧑‍💻 Desktop-first responsive design (mobile-friendly)

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS / CSS Modules
- **State Management:** React Context or Redux (if needed)

---

## 📂 Project Structure

```bash
notedesk-mern/
├── client/         # React frontend
├── server/         # Express backend API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── middleware/
└── README.md