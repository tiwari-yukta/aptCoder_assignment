# 📝 Vue To-Do Application

A simple and interactive To-Do List application built using Vue 3.  
This app allows users to manage tasks efficiently with persistent storage using a mock backend.

---

## 🚀 Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed
- Separate view for **Open** and **Completed** tasks
- Displays **task creation date**
- Data persists using JSON Server (survives page refresh & tab close)

---

## 🛠️ Tech Stack

- Vue 3 (Composition API)
- Vite
- Axios
- JSON Server (Mock Backend)

---

## 📂 Project Structure

```
todo-vue/
├── src/
│   ├── components/     # Reusable UI components
│   ├── composables/    # Business logic (custom hooks)
│   ├── App.vue         # Root component
│   └── main.js
├── db.json             # Mock database (JSON Server)
├── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/tiwari-yukta/aptCoder_assignment.git
cd todo-vue
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run frontend
```bash
npm run dev
```

### 4. Run backend (JSON Server)
```bash
npx json-server db.json --port 3001
```

---

## 🌐 API Endpoints

| Method | Endpoint     | Description        |
|--------|-------------|------------------|
| GET    | /todos      | Fetch all tasks  |
| POST   | /todos      | Create new task  |
| PATCH  | /todos/:id  | Update task      |
| DELETE | /todos/:id  | Delete task      |

---


## 👩‍💻 Author

Yukta Tiwari
