# ☕ SH Cafe - QR Code Ordering System

A simple, modern, and full-stack web application for a cafe that allows customers to view a digital menu and place orders by scanning a QR code at their table. The system also includes an admin panel for staff to manage the menu and view incoming orders in real-time.



## ✨ Features

* **Customer-Facing Digital Menu:**
    * Accessed via a unique URL per table (e.g., `/?tableId=5`).
    * Menu items are grouped by category (e.g., Hot Beverages, Snacks).
    * Interactive cart with `+` and `-` quantity controls directly on item cards.
    * Order confirmation modal that shows an itemized summary before placing the order.

* **Admin Panel:**
    * **Live Order Dashboard:** Displays all customer orders in real-time, with the newest orders appearing at the top.
    * **Menu Management:** A full CRUD (Create, Read, Update, Delete) interface for menu items.
    * **Toggle Availability:** Instantly make items available or unavailable to customers with a simple switch.
    * **Print Bills:** A professional, library-free feature to print a formatted receipt for any order.

## 🛠️ Technology Stack

* **Backend:** Java, Spring Boot, Spring Data JPA
* **Frontend:** React (Create React App), CSS Modules
* **Database:** MySQL

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

* Java JDK (Version 17 or later)
* Maven
* Node.js and npm
* MySQL Server

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Open the Backend Project:**
    Navigate to the backend folder and open it in your favorite IDE (like IntelliJ IDEA or VS Code).

3.  **Create the Database:**
    In your MySQL client, create a new database.
    ```sql
    CREATE DATABASE qr_cafe_db;
    ```
4.  **Configure Database Connection:**
    Open the `src/main/resources/application.properties` file and update the following lines with your MySQL username and password.
    ```properties
    spring.datasource.username=your_mysql_username
    spring.datasource.password=your_mysql_password
    ```
5.  **Run the Backend:**
    Start the Spring Boot application from your IDE. The backend will be running on `http://localhost:8080`.

### Frontend Setup

1.  **Navigate to the Frontend Folder:**
    Open a new terminal and navigate to the project's frontend directory.
    ```bash
    cd <path-to-your-frontend-folder>
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Frontend:**
    ```bash
    npm start
    ```
    The frontend development server will start, and the application will open in your browser at `http://localhost:3000`.

##  kullanım

### Customer View

To use the application as a customer, navigate to the base URL and add a `tableId` query parameter.
* **Example:** `http://localhost:3000/?tableId=7`

### Admin View

To access the admin panel, use the following URLs:
* **Dashboard:** `http://localhost:3000/admin/dashboard`
* **Menu Management:** `http://localhost:3000/admin/menu-management`
