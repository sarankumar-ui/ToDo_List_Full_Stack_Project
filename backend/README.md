# Setup the project
.Create two seperate folders for frontend and backend
. Frontend for client  && Backend for server



# To-Do List Application - Backend
A Restful backend API for a full-stack To-Do List application built with Node.js, Express.js, MongoDB, and mongoose.

The backend provides APIs for user registration, user login, task creation, task updating, task deletion, searching.

# Features
.User registration
.User login
.Password hashing with bcrypt
.MongoDB database
.Mongoose models
.Task CRUD operations
.Search tasks
.Filter tasks by status
.CORS support
.REST API

# Technologies Used
.Node.js
.Express.js
.MongoDB
.bcrypt
.dotenv
.CORS



# Backend setup

a.Backend Initialization
mkdir server
cd Server

b.Install dependices
.npm init -y
.npm express -> for frame work
.npm mongoose -> for server connection.
.npm nodemone -> Run the code automatically when we save the file.
.npm dotenv -> To hide Sensitive information.
.npm cors -> to connect frontend with backend APIs.
.npm bcrypt -> password hashing.

c.Create basic server file

d. Setup dotenv

# API Routes
User Routes
Signup
POST:- /api/users/signup

Login
POST:- /api/users/login


Task Routes

Create Task
POST:- /api/task/createnewtask


Get All Tasks
GET:- /api/task/alltasks


Update Task
PUT:- /api/task/updatetask/:id

Delete Task
DELETE:- /api/task/deletetask/:id

Search Task
GET:- /api/task/search

Get Task By Id
GET:- /api/task/:id

UpdateTaskStatus
PATCH:- /api/task/updatetaskstatus/:id
