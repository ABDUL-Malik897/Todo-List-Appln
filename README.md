#  Todo-List-Appln 

## Overview

This is a full-stack To-Do List application that allows users to create, update, delete, and manage tasks efficiently. The application consists of:

* **Frontend**: React.js
* **Backend**: Node.js + Express.js
* **Database**: MongoDB

---

##  Setup & Installation

###  Clone the Repository

```bash
git clone <your-repo-url>
cd assignment
```

---

### Backend Setup

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file inside the backend folder and add:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
```

#### Run Backend

```bash
npm run dev
```

---

###  Frontend Setup

```bash
cd frontend
npm install
```

#### Configuration

If using proxy (recommended), ensure in `package.json`:

```
"proxy": "http://localhost:4000"
```

####  Run Frontend

```bash
npm start
```

---

##  Features

* Add new tasks
* Edit existing tasks
* Delete tasks with confirmation popup
* Task status (Completed / Pending)
* Persistent storage using database
* Scrollable task list UI

---

##  API Endpoints (Backend)

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/todos     | Fetch all todos |
| POST   | /api/todos     | Create a todo   |
| PUT    | /api/todos/:id | Update a todo   |
| DELETE | /api/todos/:id | Delete a todo   |

---

##  Challenges Faced & Solutions

### 1. CORS Issues

**Problem:** Frontend couldn’t communicate with backend.

**Solution:** Used proxy in React (`package.json`) instead of configuring CORS manually.

---

### 2. State Not Persisting After Reload

**Problem:** Tasks were resetting or showing incorrect status.

**Solution:** Ensured proper backend fetch (`GET API`) on component load using `useEffect`.

---

### 3. Delete Without Confirmation

**Problem:** Tasks were deleted instantly.

**Solution:** Added confirmation popup:

```js
if (window.confirm(`Do you want to delete ${todo.Title}`)) {
   handleDelete(id);
}
```

---

### 4. Scroll Not Working Properly

**Problem:** Task list overflow issue.
**Solution:** Applied CSS:

```css
overflow-y: auto;
max-height: 300px;
```

---

### 5. Deployment Confusion

**Problem:** Changes not reflecting after updates.
**Solution:** Learned that backend must be **re-deployed after every change**, not just committed.


##  Run Summary

1. Start backend → `npm run dev`
2. Start frontend → `npm start`
3. Open browser → `https://todo-list-appln.vercel.app/`

---

##  Author

ABDUL MALIK


