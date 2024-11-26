Here's the fully corrected README file:

---

# NOTES

A web application to create, view, and delete personal notes. This project uses **Vite**, **React**, **MongoDB**, **Express**, and **OTP-based Authentication** for a fast and scalable solution to manage your notes securely.

## Features

- **Create Notes**: Add new notes with a title and content.
- **Delete Notes**: Remove unwanted notes.
- **View Notes**: View all saved notes.
- **MongoDB Database**: Your notes are stored persistently in MongoDB.
- **Express Backend**: Provides API routes for handling notes with CRUD operations.
- **User Registration and Authentication**: Securely register and authenticate users using email and OTP authentication.
- **Email Notifications**: Send email notifications using **Nodemailer** for OTP verification.
- **Responsive UI**: Built with React and styled using **TailwindCSS**.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: OTP (One-Time Password)
- **Email Service**: Nodemailer (for OTP)
- **Database**: MongoDB (MongoDB Atlas recommended)
- **Environment Management**: dotenv

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or MongoDB Atlas)
- [Git](https://git-scm.com/)
- [Gmail Account (for sending OTP)](https://www.google.com/gmail/)

### Steps to Run the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/notes.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd notes
   ```

3. **Set up the backend environment variables**:

   - Create a `.env` file in the `server` directory and add the following details:

     ```
     JWT_SECRET="NotesSecret"
     MONGO_URL="mongodb+srv://<your-mongodb-url>"
     MAIL_HOST="smtp.gmail.com"
     MAIL_USER="your-email@gmail.com"
     MAIL_PASS="your-email-password"
     OTP_EXPIRATION_TIME=10 # in minutes
     PORT=5000
     ```

     **Note**: Replace the `MONGO_URL`, `MAIL_USER`, and `MAIL_PASS` with your actual MongoDB credentials and Gmail credentials.

4. **Install dependencies for the frontend (React app)**:

   ```bash
   cd client
   npm install
   ```

5. **Install dependencies for the backend (Express API)**:

   ```bash
   cd server
   npm install
   ```

6. **Run the backend server**:

   ```bash
   npm run dev
   ```

7. **Run the frontend development server**:

   ```bash
   cd client
   npm run dev
   ```

   The application will be available at `http://localhost:3000` in your browser.

## API Endpoints

### Authentication Endpoints

- **POST /api/auth/send-otp**: Send an OTP to the provided email address for login or registration.

  - Request body:
    ```json
    {
      "email": "user-email@example.com"
    }
    ```

- **POST /api/auth/verify-otp**: Verify the OTP sent to the email and log the user in.
  - Request body:
    ```json
    {
      "email": "user-email@example.com",
      "otp": "123456"
    }
    ```

### Notes API Endpoints (Express)

- **GET /api/notes**: Fetch all notes.
- **POST /api/notes**: Create a new note.
- **DELETE /api/notes/:id**: Delete a note by ID.

## Project Structure

```
notes/
│
|             # React frontend
└──── src/             # React components, hooks, etc.
│   ├── public/          # Public assets (e.g., index.html)
│   └── tailwind.config.js # Tailwind CSS configuration
│
└── server/              # Express backend
    ├── src/             # API routes, controllers, etc.
    ├── .env             # Environment variables
    └── index.ts         # Entry point for the Express server
```

## Environment Variables

The following environment variables are required for proper functioning:

- **JWT_SECRET**: Secret key for signing JWT tokens.
- **MONGO_URL**: MongoDB connection string (use your MongoDB Atlas or local MongoDB URL).
- **MAIL_HOST**: SMTP host for email service (e.g., Gmail's `smtp.gmail.com`).
- **MAIL_USER**: Email address used for sending OTP emails.
- **MAIL_PASS**: Email password or app-specific password for sending OTP emails.
- **OTP_EXPIRATION_TIME**: OTP expiration time in minutes.
- **PORT**: The port number to run the backend server.

## OTP Authentication Flow

1. **Send OTP**: When a user enters their email, an OTP is generated and sent to the email.
2. **Verify OTP**: The user enters the OTP to verify their identity.
3. **JWT Authentication**: On successful OTP verification, a JWT token is generated, allowing the user to perform CRUD operations on notes.

## Future Enhancements

- **Note Search**: Add search functionality to quickly find notes.
- **Category Management**: Allow categorization of notes.
- **File Attachments**: Allow users to attach files to notes.
- **Dark Mode**: Implement a dark mode theme for better UX.

## License

This project is licensed under the MIT License.

---

Let me know if there are any other changes you'd like! 😊
