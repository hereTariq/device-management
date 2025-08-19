# Node.js Device Management API

## Overview
This is a Node.js + Express.js project with MongoDB integration.  
It provides APIs for device management, analytics, and user activity tracking.

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=device-management
JWT_SECRET=your_jwt_secret
```

### 4. Start the server
```bash
npm run dev
```
Server will run on `http://localhost:3000`.

---

## API Documentation

### Authentication
- **POST /auth/signup** → Register a new user  
- **POST /auth/login** → Login and get JWT token  

### Devices
- **POST /devices** → Register a new device  
- **GET /devices** → Get all devices  
- **GET /devices/:id** → Get device by ID  
- **PATCH /devices/:id** → Update device  
- **DELETE /devices/:id** → Soft delete a device  
- **POST /devices/:id/heartbeat** → Update last_active_at  

### Analytics
- **POST /devices/:id/logs** → Log Entry 
- **GET /devices/:id/logs?limit=10** → Get last 10 logs  
- **GET /devices/:id/usage?range=24h** → Get analytics summary for a given range (`1h`, `24h`, `7d`) 

### Rate Limiting
- Each user is limited to **100 requests per minute**.

### Background Job
- A cron job runs every hour to auto-deactivate devices that have been inactive for more than 24 hours.

## Assumptions

- If the logged-in user is an **Admin**, they can view and manage **all devices**, regardless of who created them.  
- If the logged-in user is a **regular User**, they can only **view, update, or delete** the devices they have created themselves.  
- Authentication is assumed to be implemented using **JWT tokens** for secure access.  
- Role-based access control (RBAC) is assumed to differentiate between **Admin** and **User** actions.  


## Folder Structure
```
project-root/
│── config/
│── controllers/   # Request handling logic
│── cron/          # Background jobs
│── middlewares/   # Authentication, rate limiting, error handling
│── models/        # Mongoose models
│── routes/        # API routes
│── services/      # Business logic
│── utils/         # Helper functions
│── index.js         # Main application entry
```

