<<<<<<< HEAD
# MovieBox 🎬 - A Full-Stack & Modern Movie Discovery App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

**MovieBox** is a sleek, full-stack web application for discovering movies and TV shows, built with the latest MERN stack technologies. Inspired by the user interfaces of popular streaming platforms, this project delivers a rich, interactive, and fully responsive user experience, complete with a custom backend and a robust user authentication system.
=======
# MovieBox 🎬 - A Modern & Type-Safe Movie Discovery App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

**MovieBox** is a sleek and modern web application for discovering movies and TV shows, built with the latest front-end technologies. Inspired by the user interfaces of popular streaming platforms, this project delivers a rich, interactive, and fully responsive user experience, now with the added robustness of **TypeScript**.
>>>>>>> fac2625c522e5f1b0ad6b8ef5a607b757beec15f

**[ ✨ View Live Demo ✨ ](https://movie-box-two-roan.vercel.app/)**

---

## 🎥 Preview & Screenshots

**Immersive Home Page with a Dynamic Hero Section**
![MovieBox Home Page](https://i.imgur.com/FJiLgpK.jpeg)
_Users are greeted with a cinematic hero section and categorized carousels for movies and TV shows._

<br>

<<<<<<< HEAD
**Seamless User Authentication**
![MovieBox Authentication Page](https://i.imgur.com/oXWm7Ai.png)
_A Custom-built, responsive forms for user registration and login, ensuring a secure and seamless entry point to the application's personalized features._

<br>

**Personalized User Dashboard & Profile**
![MovieBox User Dashboard & Profile Page](https://i.imgur.com/7KR7cdT.png)
_A personalized user dashboard featuring the user's name, a randomly assigned profile picture, and a calculation of their total watch time based on their favorites._

<br>

**Interactive & Persistent Favorites**
![MovieBox Interactive Favorites Feature](https://i.imgur.com/Sf82Qx6.png)
_A Users can add or remove content from their personal favorites list with a single click. The state is instantly updated and persists across sessions, powered by a reusable custom React hook and the backend API. A_

<br>

**Highly Scalable Detail Page with Favorite Functionality**
![MovieBox Detail Page](https://i.imgur.com/CID6NrI.png)
_A single, reusable detail page provides complete information for any media type, including cast, ratings, and the ability to add/remove items from a personal favorites list._
=======
**Highly Scalable Detail Page**
![MovieBox Detail Page](https://i.imgur.com/CID6NrI.png)
_A single, reusable detail page provides complete information for any media type, including cast, ratings, and more._
>>>>>>> fac2625c522e5f1b0ad6b8ef5a607b757beec15f

<br>

**Full-Screen, Real-Time Search**
![MovieBox Search Overlay](https://i.imgur.com/XZntQ2q.png)
_A beautiful interface for searching movies and TV shows with instant results._

---

## 🌟 Key Features

<<<<<<< HEAD
This project implements a collection of modern features and follows best practices for scalability and maintainability.

- **Full-Stack User System (MERN Stack):**

  - **Custom JWT Authentication:** A complete authentication system built from scratch with user **Registration** and **Login**.
  - **Secure Password Handling:** User passwords are securely hashed using **bcrypt.js** before being stored in the database.
  - **Token-Based Sessions:** Manages user sessions using **JSON Web Tokens (JWT)** for secure API communication.
  - **Personalized User Dashboard:** A protected profile page for each user, displaying their username, a randomly assigned profile picture, and their total watch time.
  - **Persistent Favorites List:** Users can add or remove movies/shows from a personal favorites list, which is saved permanently in the **MongoDB** database.
  - **Protected Routes:** Sensitive routes like the user profile are accessible only to authenticated users.

- **Type-Safe & Maintainable Codebase:**

  - Fully migrated to **TypeScript**, ensuring a robust, error-free, and highly maintainable codebase.
  - Centralized type definitions for API models, providing a single source of truth.

- **Clean & Scalable Architecture:**

  - **Backend Architecture:** The backend follows a clean, MVC-like pattern with a clear separation of **Routes**, **Controllers**, **Models**, and **Middleware**.
  - **Reusable Components & Custom Hooks:** The frontend leverages reusable UI components and custom hooks like `useFavoriteStatus` and `useDebounce` to maintain a DRY codebase.

- **Intelligent Backend Logic:**

  - The server acts as an intelligent proxy, fetching detailed movie information (like accurate runtime) from the external TMDB API before saving it to the local database, ensuring data integrity.

- **Engaging Visual Effects:**
  - **3D Tilt Effect** on movie cards created with `useRef` for optimal performance.
  - Smooth and fluid animations throughout the application using **Framer Motion**.
  - **Glassmorphism** effect on the navigation bar that appears on scroll.
=======
This project implements a collection of MODERN features and follows best practices for scalability and maintainability.

- **Type-Safe & Maintainable Codebase:**
  - Fully migrated to **TypeScript**, ensuring a robust, error-free, and highly maintainable codebase.
  - Centralized type definitions for API models, providing a single source of truth across the application.
- **Clean & Scalable Architecture:**
  - **Reusable Components:** Following the **DRY (Don't Repeat Yourself)** principle, the app uses generic components like `ContentGridPage` and `DetailPage` to render different types of content.
  - **Utility & Hooks Modules:** Helper functions and custom hooks are separated into dedicated directories for better organization.
- **Engaging Visual Effects:**
  - **3D Tilt Effect** on cards when hovered, created using `useRef` for optimal performance.
  - Smooth and fluid animations using the **Framer Motion** library.
  - **Glassmorphism** effect on the navigation bar that appears on scroll.
- **Advanced & Scalable Routing:**
  - A highly scalable routing structure using a single dynamic route (`/:mediaType/:id`) to handle detail pages for any content type.
- **Powerful Search:**
  - A full-screen search overlay.
  - Instant results using a custom `useDebounce` hook to optimize API requests.
- **Performance Optimization:**
  - **Lazy Loading** for cast images to increase initial page load speed.
  - **Skeleton Loaders** to improve the user experience while data is being fetched.
- **Enhanced UI Details:** Displays formatted vote counts (e.g., '1.2k', '1.5M') for better readability.
- **Fully Responsive Design:** A flawless viewing experience on all devices, from mobile phones to desktops.
>>>>>>> fac2625c522e5f1b0ad6b8ef5a607b757beec15f

---

## 🛠️ Tech Stack

<<<<<<< HEAD
- **Frontend:**
  - **React.js & TypeScript:** For a type-safe, component-based UI.
  - **Vite:** A modern build tool for a blazing-fast development experience.
  - **Tailwind CSS:** A utility-first CSS framework for rapid and professional styling.
  - **React Router DOM:** For client-side routing.
  - **Framer Motion:** For implementing complex and smooth animations.
  - **Axios:** For making HTTP requests to the backend API.
- **Backend:**
  - **Node.js:** JavaScript runtime for the server.
  - **Express.js:** Web framework for building the REST API.
  - **MongoDB:** NoSQL database for storing user and favorites data.
  - **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
  - **JSON Web Tokens (JWT):** For generating authentication tokens.
  - **Bcrypt.js:** For secure password hashing.
  - **CORS & Dotenv:** For managing cross-origin requests and environment variables.
=======
A list of the main technologies and libraries used in this project:

- **React.js:** The core library for building the user interface.
- **TypeScript:** For static type-checking, improved developer experience, and code quality.
- **Vite:** A modern build tool for fast development.
- **Tailwind CSS:** A utility-first CSS framework for rapid and professional styling.
- **React Router DOM:** For managing client-side routing in the application.
- **Framer Motion:** For implementing complex and smooth animations.
- **React Toastify:** For displaying beautiful and user-friendly notifications.
>>>>>>> fac2625c522e5f1b0ad6b8ef5a607b757beec15f

---

## 📂 Project Structure

The project is organized into a monorepo structure with separate directories for the client and server.

```
movie-box/
├── client/                 # Frontend React App
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── profile/
│   │   │   └── UI/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
├── server/                 # Backend Node.js App
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── package.json
└── package.json            # Root (for concurrent script)

```

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/](https://github.com/)<YOUR_USERNAME>/movie-box.git
    cd movie-box
    ```

<<<<<<< HEAD
2.  **Backend Setup:**

    - Navigate to the server directory: `cd server`
    - Install dependencies: `npm install`
    - Create a `.env` file in the `server` directory and add the following variables:
      ```
      PORT=5001
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_key
      TMDB_API_KEY=your_tmdb_api_key_v3
      ```

3.  **Frontend Setup:**

    - From the root directory, navigate to the client directory: `cd ../client`
    - Install dependencies: `npm install`
    - Create a `.env` file in the `client` directory and add the following variables:
      ```
      VITE_TMDB_API_KEY=your_tmdb_api_key_v3
      VITE_API_URL=http://localhost:5001/api/v1
      ```

4.  **Run the project:**
    - Return to the **root directory** of the project (`cd ..`).
    - Run the concurrent script to start both the server and client:
      ```bash
      npm run dev
      ```
    - You can now view the project at `http://localhost:5173` (or whatever port your client is running on).
=======
2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your API Key:**

    - Create an account on [The Movie Database (TMDB)](https://www.themoviedb.org/signup).
    - Get an API key (v3 auth) from your account settings.
    - In the project's root directory, create a file named `.env` and add your key to it:
      ```
      VITE_TMDB_API_KEY=your_api_key_here
      ```

4.  **Run the project:**
    ```bash
    npm run dev
    ```
    You can now view the project at `http://localhost:5173`.
>>>>>>> fac2625c522e5f1b0ad6b8ef5a607b757beec15f

---

## 📄 License

<<<<<<< HEAD
This project is licensed under the MIT License.
=======
This project is licensed under the MIT License. See the `LICENSE` file for more details.
>>>>>>> fac2625c522e5f1b0ad6b8ef5a607b757beec15f

## 🙏 Acknowledgments

This project uses data and images provided by [The Movie Database (TMDB) API](https://www.themoviedb.org/).
