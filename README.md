# Airline Voucher Seat Assignment Application

Full-stack application for airline voucher seat assignment.

## Tech Stack

### Backend
- Laravel 13.21.1
- PHP 8.4.23
- SQLite
- REST API

### Frontend
- React
- Vite
- Axios

## Project Structure
Astronacci/
├── backend/ # Laravel REST API
└── frontend/ # React Application

## Prerequisites

Make sure you have installed:

- PHP >= 8.4
- Composer
- Node.js
- npm
- SQLite

---

# Installation & Running

## Backend Setup

Navigate to backend folder:

```bash
cd backend
Install dependencies:

composer install

Create environment file:

cp .env.example .env

Generate application key:

php artisan key:generate

Run database migration:

php artisan migrate

Start Laravel server:

php artisan serve

Backend will run on:

http://127.0.0.1:8000
Frontend Setup

Open another terminal and navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Create .env file:

VITE_API_URL=http://127.0.0.1:8000/api

Start React development server:

npm run dev

Frontend will run on:

http://localhost:5173
API Communication

The frontend communicates with Laravel API using Axios.

Backend API URL:

http://127.0.0.1:8000/api

CORS has been configured to allow communication between React frontend and Laravel backend.

Notes
Backend uses Laravel built-in SQLite database.
No additional database server is required.
Make sure backend server is running before accessing the frontend application.