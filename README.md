
## Building a Task Management Dashboard

# Task Manager App

This project is a task management dashboard built using the Next.js framework with a MongoDB backend and Prisma ORM. The website allows users to create, manage, and delete tasks. It features a Kanban board for visual task organization and a list view for easy task management. The app includes user authentication, drag-and-drop functionality for task prioritization, and responsive UI built using Shadcn components. [Check out the Website](your-deployed-site-url)

## Features

- **User Authentication**: Secure sign-up and login for users.
- **Task Creation and Management**: Add, edit, and delete tasks.
- **Kanban Board**: Drag-and-drop tasks between 'To Do', 'In Progress', and 'Done' columns.
- **List View**: Manage tasks in a simple list format.
- **Filter & Search**: Easily find tasks based on criteria like status or title.
- **Optional Due Dates**: Set due dates for tasks or leave them open-ended.
- **Responsive Design**: Optimized for mobile and desktop users.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Prisma

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/sahaniindrajit/Task-Manager.git
    cd Task-Manager
    ```

2. Install dependencies for both the frontend and backend:
    ```bash
    npm install
    ```

3. Set up Prisma and your MongoDB connection. Create a `.env` file in the root directory and add the following environment variables:
    ```
    DIRECT_DATABASE_URL=your_mongodb_connection_string
    NEXT_PUBLIC_JWT_PASSWORD=next@taskmanager
    DATABASE_URL=your_Prisma_accelerate_connection_string
    ```

4. Apply Prisma migrations to your MongoDB database:
    ```bash
    npx prisma migrate deploy
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

6. Open your browser and navigate to `http://localhost:3000` to see the app running.

## Folder Structure

- `components`: Contains reusable UI components such as task cards, list views, and modals.
- `app`: Next.js pages that handle routing and page rendering.
- `prisma`: Prisma models and configuration for database schema and migrations.
- `public`: Static assets like images and icons.
- `actions`: Helper functions like token verification and API handling.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.