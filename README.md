# MovieBox 🎬 - A Modern Movie Discovery App

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

**MovieBox** is a sleek and modern web application for discovering movies and TV shows, built with the latest front-end technologies. Inspired by the user interfaces of popular streaming platforms, this project delivers a rich, interactive, and fully responsive user experience.

**[ ✨ View Live Demo ✨ ](PASTE_YOUR_LIVE_DEMO_LINK_HERE)**

---

## 🎥 Preview & Screenshots

**Immersive Home Page with a Dynamic Hero Section**
![MovieBox Home Page](https://i.imgur.com/FJiLgpK.jpeg)
_Users are greeted with a cinematic hero section and categorized carousels._

<br>

**Detailed View with Comprehensive Information**
![MovieBox Detail Page](https://i.imgur.com/CID6NrI.png)
_Detail pages provide complete information, including cast, ratings, and trailers._

<br>

**Full-Screen, Real-Time Search**
![MovieBox Search Overlay](https://i.imgur.com/XZntQ2q.png)
_A beautiful interface for searching movies and TV shows with instant results._

---

## 🌟 Key Features

This project implements a collection of modern features:

- **Cinematic UI:** A dynamic hero section and horizontal carousels for various categories (Now Playing, Top Rated, etc.).
- **Engaging Visual Effects:**
  - **3D Tilt Effect** on cards when hovered.
  - Smooth and fluid animations using the **Framer Motion** library.
  - **Glassmorphism** effect on the navigation bar.
- **Advanced Routing:** A multi-page structure using `React Router DOM`, including:
  - Home, Movies, and TV Shows pages.
  - Dynamic detail pages for each movie and TV show (`/movie/:id` & `/tv/:id`).
- **Powerful Search:**
  - A full-screen search overlay.
  - Instant results using a custom `useDebounce` hook to optimize API requests.
- **Performance Optimization:**
  - **Lazy Loading** for cast images to increase initial page load speed.
  - **Skeleton Loaders** to improve the user experience while data is being fetched.
- **Fully Responsive Design:** A flawless viewing experience on all devices, from mobile phones to desktops.

---

## 🛠️ Tech Stack

A list of the main technologies and libraries used in this project:

- **React.js:** The core library for building the user interface.
- **Vite:** A modern build tool for fast development.
- **Tailwind CSS:** A utility-first CSS framework for rapid and professional styling.
- **React Router DOM:** For managing client-side routing in the application.
- **Framer Motion:** For implementing complex and smooth animations.
- **React Toastify:** For displaying beautiful and user-friendly notifications.

---

## 📂 Project Structure

The file and folder structure is designed to be readable, manageable, and scalable.

```
movie-box/
├── public/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── MovieDetailPage.jsx
│   │   │   ├── MoviesPage.jsx
│   │   │   ├── TvShowDetailPage.jsx
│   │   │   └── TvShowsPage.jsx
│   │   └── UI/
│   │       ├── Hero.jsx
│   │       ├── MovieCard.jsx
│   │       ├── MovieCarousel.jsx
│   │       ├── MovieDetailSkeleton.jsx
│   │       ├── Navbar.jsx
│   │       ├── SearchBar.jsx
│   │       ├── SearchOverlay.jsx
│   │       └── SkeletonCard.jsx
│   ├── hooks/
│   │   └── useDebounce.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/](https://github.com/)<YOUR_USERNAME>/movie-box.git
    cd movie-box
    ```

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

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 🙏 Acknowledgments

This project uses data and images provided by [The Movie Database (TMDB) API](https://www.themoviedb.org/).
