# Notification System Backend

This is the backend code for a notification system built using Node.js, Express, and MongoDB. It handles user registration, login, and sending notifications via email and SMS.

## Technologies Used

* Node.js
* Express.js
* MongoDB
* bcryptjs
* EJS
* nodemailer
* Twilio

## Features

* User registration and login
* Password hashing with bcryptjs
* Notification management (saving to MongoDB)
* Email sending via nodemailer
* SMS sending via Twilio
* Uses EJS for templating

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    This will install the following packages:

    * `express`
    * `ejs`
    * `mongoose`
    * `body-parser`
    * `bcryptjs`
    * `nodemailer`
    * `twilio`

3.  **Set up MongoDB:**

    * Make sure you have MongoDB installed and running.
    * Create a `.env` file in the root directory of the project.
    * Add your MongoDB connection string to the `.env` file:

        ```
        MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database_name>
        ```

        Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database_name>` with your actual MongoDB credentials.

4.  **Set up Email and SMS services:**

    * **Nodemailer:**

        * You'll need an email service (e.g., Gmail, SendGrid, Mailgun).
        * Add your email service credentials to the `.env` file:

            ```
            EMAIL_USER=<your_email_address>
            EMAIL_PASS=<your_email_password_or_app_password>
            ```

            If you are using Gmail, you might need to enable "less secure app access" or use an App Password. For other services, follow their specific setup instructions.

    * **Twilio:**

        * Sign up for a Twilio account at [twilio.com](https://www.twilio.com/).
        * Obtain your Account SID, Auth Token, and Twilio phone number.
        * Add your Twilio credentials to the `.env` file:

            ```
            TWILIO_ACCOUNT_SID=<your_twilio_account_sid>
            TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
            TWILIO_PHONE_NUMBER=<your_twilio_phone_number>
            ```

5.  **Run the application:**

    ```bash
    npm start
    ```

    The server will start running on port 3000 (or the port specified in your environment).

## Project Structure

.├── models/│   ├── notification.js  # Defines the notification schema│   ├── user.js          # Defines the user schema├── public/             #  Static assets (CSS, JS, images)├── utils/│   ├── notificationChannel.js # Contains functions for sending email and SMS├── views/              # EJS templates│   ├── index.ejs│   ├── login.ejs│   ├── notification.ejs├── .env                # Environment variables (sensitive data)├── app.js              # Main application file├── package.json└── README.md
## Endpoints

* `GET /`: Displays the registration page (`index.ejs`).
* `POST /create`: Handles user registration.
* `GET /login`: Displays the login page (`login.ejs`).
* `POST /login`: Handles user login.
* `GET /notification`: Displays the notification form (`notification.ejs`).
* `POST /notification`: Handles sending and saving notifications.

## Models

* **User Model:**

    * `email`: String (required, unique)
    * `password`: String (required, hashed)
    * `notifications`: Array (stores notification preferences)

* **Notification Model:**

    * `email`: String (recipient email)
    * `category`: String
    * `type`: String
    * `title`: String
    * `message`: String
    * `delivery`: Array (e.g., `['email', 'sms']`)

## Potential Errors

* **MongoDB Connection Errors:** Ensure your MongoDB server is running and the connection string is correct.
* **Nodemailer Errors:**
    * Authentication failures: Double-check your email credentials.
    * Email sending limits: Be aware of any sending limits imposed by your email provider.
    * Gmail "less secure app access": If using Gmail, ensure that "less secure app access" is enabled, or use an App Password.
* **Twilio Errors:**
    * Invalid credentials: Verify your Account SID and Auth Token.
    * Insufficient funds: Ensure your Twilio account has enough credit.
    * Invalid phone number: Check the recipient's phone number format.
    * Twilio rate limits: Be aware of Twilio's rate limits for sending messages.
* **bcrypt Errors:**
    * Errors during salt generation or hashing.
* **EJS Errors:**
    * Errors in your ejs templates.
