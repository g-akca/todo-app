# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Challenges](#challenges)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./frontend/public/images/screenshot_login.png)

![](./frontend/public/images/screenshot.png)

### Links

- Solution URL: [GitHub](https://github.com/g-akca/todo-app)
- Live Site URL: [Todo App](https://todo-app-8u3p.onrender.com/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Responsive design
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Router](https://reactrouter.com/) - routing
- [Node.js](https://nodejs.org/) - runtime environment
- [Express](https://expressjs.com/) - backend framework
- [Passport](https://www.passportjs.org/) - authentication
- [PostgreSQL](https://www.postgresql.org/) - database

### What I learned

This was my first full-stack React application and my first time deploying a public full-stack project. I learned how the frontend, Express API, authentication sessions, and PostgreSQL database fit together in a deployed environment, including the importance of sending credentials with requests and configuring sessions correctly across separate frontend and backend origins.

### Challenges

The most involved part was coordinating authentication with task loading. The frontend has to send credentials with API requests, and the backend must restore the Passport session before allowing access to the user's task routes. Keeping optimistic UI updates understandable while handling API failures was another useful exercise in separating local state changes from persistence.

### Continued development

The next step is to persist drag-and-drop order in PostgreSQL and add an API endpoint for saving the new positions, so a user's custom ordering remains after a refresh or login on another device.

## Author

- GitHub - [@g-akca](https://github.com/g-akca)
- Frontend Mentor - [@g-akca](https://www.frontendmentor.io/profile/g-akca)