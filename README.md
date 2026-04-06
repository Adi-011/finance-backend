# finance-backend

A robust Node.js backend system designed for financial record management. This project demonstrates advanced backend concepts including **Role-Based Access Control (RBAC)**, database aggregation, and modular API design.

---

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Sequelize
- **Database:** SQLite (File-based)
- **Utilities:** CORS, Body-Parser

---

## Setup & Installation
Install Dependencies:

```Bash
npm install
```
Run the Server:
```Bash
npm start
```
The server will start at http://localhost:3000.

Initial Seeding:

On the first startup, the system automatically creates three test users in the database:

 - Admin (ID: 1)

 - Analyst (ID: 2)

 - Viewer (ID: 3)

## API Documentation
### Authentication
   Every request must include the identification header to simulate a logged-in user: 
   `x-user-id: [User_ID]`

### Endpoints

#### 1. Records Management

- GET `/api/records`
   - Access: Viewer, Analyst, Admin
   - Optional Filters: `?category=Salary`, `?type=income`

- POST `/api/records`
  - Access: Admin
  - Body: `{ "amount": 1200, "type": "income", "category": "Freelance", "description": "Project Alpha" }`

#### 2. Dashboard Analytics
- GET `/api/dashboard`
  - Access: Analyst, Admin
  - Returns: Overall totals (total income vs total expense) and a breakdown by category.

#### 3. User Management
- POST `/api/users`
  - Access: Admin
  - Body: `{ "username": "new_user", "role": "Analyst" } `
