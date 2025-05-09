# Task Manager (Frontend)

This is the frontend of a Task Manager app built with **Next.js**, **TypeScript**, and **Chakra UI**. It interacts with the backend of the Task Manager app, which is available at [TaskManager Backend](https://github.com/nurmohammadapu/TaskManager).

## Live Demo

You can see the live demo of the app here: [Task Manager Demo](https://task-manager-chakra-ui.vercel.app/).

## Features

* **User Authentication**: Login and registration functionality for managing tasks.
* **Task Management**: Create, read, update, and delete tasks.
* **Task Filtering**: Filter tasks by different categories.
* **Responsive UI**: A clean, modern UI built with **Chakra UI**.
* **State Management**: Uses **Redux Toolkit** to manage application state for tasks and user authentication.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

* **Node.js**: Version 14 or later.
* **npm** or **yarn**: For managing dependencies.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nurmohammadapu/Task-Manager-Chakra-UI.git
   cd Task-Manager-Chakra-UI
   ```

2. **Install dependencies**:
   Using npm:

   ```bash
   npm install
   ```

   Or, using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following variable:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://taskmanager-yoir.onrender.com
   ```

   This will point your frontend to the hosted backend.

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Or, using yarn:

   ```bash
   yarn dev
   ```

   This will start the app at `http://localhost:3000`.

## Frontend Structure

* **pages/**: Contains the main pages of the app, including the task manager interface.
* **components/**: Contains reusable UI components like `TaskForm`, `TaskItem`, `TaskList`, and `FilterBar`.
* **store/**: The Redux store, including slices for tasks and authentication.
* **styles/**: Global styles, including Chakra UI customizations.

## Backend

The frontend communicates with a backend built with **Node.js**, **Express**, and **MongoDB**. You can find the backend repository [here](https://github.com/nurmohammadapu/TaskManager).

## Environment Variables

* `NEXT_PUBLIC_API_BASE_URL`: URL of the backend API for making requests (default: `https://taskmanager-yoir.onrender.com`).

## Contributing

1. Fork the repository.
2. Clone your forked repository.
3. Create a new branch for your changes.
4. Make your changes and commit them.
5. Push to your forked repository and open a pull request.
