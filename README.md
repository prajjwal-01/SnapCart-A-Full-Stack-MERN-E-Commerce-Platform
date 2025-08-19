SnapCart: A Full-Stack MERN E-Commerce Platform
Live Demo: https://your-site-name.netlify.app
SnapCart is a complete, full-stack e-commerce web application built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js). It showcases a feature-rich, responsive, and secure platform that mimics a real-world online shopping experience from start to finish.

The application provides a seamless user journey where customers can browse a dynamic product catalog fetched live from the database. Key features include a full-featured shopping cart, secure user authentication with registration and login functionality using JSON Web Tokens (JWT), and a complete multi-step checkout process. Users can enter shipping details, select a payment method, and review a final summary before placing an order. All placed orders are saved to the database, and users can view their complete order history on a dedicated profile page.

Key Features
Dynamic Product Catalog: Browse and view products fetched from the database.

Full-featured Shopping Cart: Add, remove, and update item quantities.

User Authentication: Secure user registration and login with JWT and password hashing.

Complete Checkout Process: Multi-step flow for shipping, payment, and order summary.

Order Placement & History: Save orders to the database and allow users to view their past orders.

Responsive Design: A clean, modern UI that works on all devices, built with React-Bootstrap.

Technology Stack
Frontend:

React

React Router

React-Bootstrap

Axios

Context API (for state management)

Backend:

Node.js

Express.js

MongoDB (with Mongoose)

Authentication:

JSON Web Tokens (JWT)

bcryptjs for password hashing

Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have the following software installed on your computer:

Node.js

Git

A code editor like VS Code

Installation & Setup
Clone the repository:

git clone https://github.com/your-username/SnapCart-A-Full-Stack-MERN-E-Commerce-Platform.git
cd SnapCart-A-Full-Stack-MERN-E-Commerce-Platform

Install backend dependencies:

npm install --prefix backend

Install frontend dependencies:

npm install --prefix frontend

Set up Environment Variables:

In the backend folder, create a new file named .env.

Add the following variables to the .env file, replacing the placeholder values with your own:

MONGO_URI=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_JWT_Secret_Key>

Seed the Database:

To populate the database with sample products and users, run the seeder script from the root project folder:

node backend/seeder.js

To destroy all data, run:

node backend/seeder.js -d

Running the Application
You will need to run the backend and frontend servers simultaneously in two separate terminals.

Run the Backend Server:

From the root project folder, run:

node backend/server.js

The server will start on http://localhost:5000.

Run the Frontend Application:

In a new terminal, navigate to the frontend folder:

cd frontend

Start the React development server:

npm start

The application will open in your browser at http://localhost:3000.
