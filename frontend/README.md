# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.




#  To-Do List Application - Frontend
A react-based frontend for a full-stack To-Do List application. User can create an account, log in, and manage their tasks through a dasboard.

# Features
.User registration
.User login
.Task creation
.Task editing
.Task deletion
.Search Task
.Filter tasks by status
.Filter tasks by Priority
.Logout
# Technologies Used
.React
.React Router DOM
.Axios
.JavaScript
.CSS
# Frontend Setup
.npm create vite@latest
.npm install
.React-router-dom


# User Authentication
SignUp
Users Provide:
.Name
.Emial
.Password


Login
User Provide:
.Email
.Password


# API Endpoints Used
Signup
POST:- /api/users/signup

Login
POST:- /api/users/login

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


