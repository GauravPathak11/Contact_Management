Description
The Contact Management Application is a web app built using React for the frontend, Express.js for the backend, and MySQL for database storage. It allows users to add, view, and delete contacts. The frontend is designed with Material UI components, providing a responsive and user-friendly interface. The backend exposes RESTful APIs to manage contact data in the MySQL database

Setup Instructions
Prerequisites:
Node.js and npm
MySQL Server

Set Up the Backend (Express.js + MySQL)
1) Create Project Folder
2) Initialize Node.js Project:
	Initialize the project with npm to create package.json.
3)Install Dependencies:
	Install the necessary dependencies for the backend like express mysql2 body-parser cors dotenv
4)Set Up .env File for important credential
5)create server.js
6)Create the MySQL Database and Table

Set Up the Frontend (React vite)
1)Create React App:
	In the root project folder, create the React app
2)Install Dependencies:
	Inside the client folder, install Axios and Material UI for API calls and UI components

********How the App Works********
Frontend: The frontend is a React app that uses Material UI components to build the form and table UI. The useState and useEffect hooks are used to manage the state of form inputs and the list of contacts. Axios is used to make HTTP requests to the backend for adding, retrieving, and deleting contacts.

Backend: The backend is an Express.js server that communicates with a MySQL database. It exposes routes for performing CRUD operations on the contacts table:

POST /contacts: Adds a new contact to the database.
GET /contacts: Fetches all contacts from the database.
DELETE /contacts/:id: Deletes a contact by its ID.


Challenges and Solutions
During development, issues with database connection, CORS errors, Axios 400 errors, pagination, SQL queries, and UI alignment were resolved by proper configuration, validation, and use of libraries like cors and Material UI.






