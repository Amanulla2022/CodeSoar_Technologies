# Student Management API
 - An Express.js RESTful API for managing student records using Prisma ORM with a MongoDB database.

 ## Features
 - Create a new student
 - Get all students (with pagination)
 - Get a student by registration number
 - Update student information
 - Delete a student
 - CORS enabled and .env support

## Tech Stack
Backend: Node.js, Express.js
ORM: Prisma
Database: MongoDB
Others: dotenv, body-parser, CORS

## API Endpoints
 - Base URL : http://localhost:5000/students
 - Create Student : POST /students
 - Get All Students (with pagination) : GET /students?page=1&limit=10
 - Get Student by Registration Number : GET /students/REG123
 - Update Student : PUT /students/REG123
 - Delete Student : DELETE /students/REG123



