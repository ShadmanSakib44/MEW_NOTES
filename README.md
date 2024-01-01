# MewNotes - A Server Programming Project



MewNotes is a web application developed as part of a server programming course. It serves as an example project to showcase various server-side concepts, including authentication, CRUD operations, session management, and data storage.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Authentication Flow](#authentication-flow)
- [Session Management](#session-management)
- [Password Reset](#password-reset)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

MewNotes leverages a variety of technologies to create a secure and efficient web application:

- **Front-end:** HTML, CSS, JavaScript, and EJS (Embedded JavaScript templates) for dynamic content rendering.
- **Back-end:** Node.js and Express.js for a robust server.
- **Database:** MongoDB, a NoSQL database for flexible data storage.
- **Authentication:** Passport.js with both Google and Local strategies for user verification.
- **Session Management:** express-session to handle user sessions securely.
- **Version Control:** GitHub for collaborative development and version control.

## Features

MewNotes offers the following key features:

1. **User Authentication:**
   - Users can securely authenticate using Google or Local authentication strategies.
   - Passport.js manages user verification, ensuring security.

2. **Session Management:**
   - Express Session skillfully manages user sessions, enhancing security.
   - Cookies are utilized to sustain user sessions across interactions with the application.

3. **Password Reset:**
   - A secure password reset mechanism allows users to recover their accounts via email.
   - Users receive a reset link, making the process hassle-free.

4. **Data Management:**
   - Users can Create, Read, Update, and Delete their notes with ease.
   - MongoDB stores user data and notes efficiently.

## Authentication Flow

The authentication flow in MewNotes is as follows:

1. Users initiate the authentication process by attempting to log in using either the Google or Local authentication strategy.
2. Passport.js, which manages authentication strategies, receives the authentication request.
3. Depending on the chosen authentication method, Passport invokes the respective authentication strategy (GoogleStrategy or LocalStrategy) to authenticate the user's credentials.
4. If authentication is successful, Passport establishes a user session within ExpressApp, containing information about the authenticated user.
5. ExpressApp interacts with the Database to store and retrieve user-related data as needed during the authentication process.
6. The authentication process is completed, and the user gains access to the application's protected resources.

## Session Management

MewNotes employs express-session to effectively manage user sessions:

- Express Session ensures that user sessions are securely managed, enhancing overall security.
- Session data is exchanged between the application and Passport.js to maintain a seamless user experience.
- Cookies are used to sustain user sessions across interactions with the application.

## Password Reset

MewNotes offers a secure password reset mechanism:

- Users who forget their passwords can initiate the password reset process.
- Users receive a reset link via email, ensuring a secure and hassle-free recovery process.
- The reset link allows users to securely reset their passwords and regain access to their accounts.

## Getting Started

To get started with MewNotes, follow these installation and usage instructions:

### Installation

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/yourusername/mewnotes.git

2. Navigate to the project directory 
   ```bash
   cd mewnotes
3. Install project dependencies:
   ```bash
   npm install

4. Start the application 
   ```bash
   npm start
5. Access MewNotes in your web browser at [http://localhost:3000](http://localhost:3000).
