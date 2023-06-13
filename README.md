# Live Site: https://melodic-symphony.web.app/

# A MERN Stack Web Application for a Musical Instruments Learning platform. This Web application build with the latest technologies.

## Features of MelodicSymphony

- Public Features

  - See the best Instructor and details of instructor
  - See the best Classes and all classes (with search by class name and pagination)
  - Register Account as a student

- Students Features

  - Student Login, Google Login and view/update his profile
  - Student can Enroll the class (Only for logged in student)
  - Student can Payment with stripe to purchase a class
  - Student can see his purchase class on dashboard (with pagination)

- Instructors Features

  - Update his profile
  - Create new Class and update/delete his classes
  - View his all classes (with pagination)

- Admin Features
  - Manage All Users (with pagination)
  - Manage All Classes (with pagination)
  - Update Class of an instructor status PENDING to APPROVED or DENY, if status DENY can give a feedback
  - View All Payment or purchase history
  - Create New Instructor
  - Can make STUDENT to INSTRUCTOR
  - Can make STUDENT to ADMIN
  - Can make INSTRUCTOR to ADMIN

# Technologies used

- ## Backend: MongoDB, express.js, node.js, JWT, mongoose, stripe, bcrypt, cors
- ## Frontend: React, react-router-dom, Tailwindcss, DaisyUI, react-hook-form, firebase, @tanstack/react-query, @stripe/react-stripe-js, axios, react-helmet-async, sweetalert2, swiper, react-helmet-async, react-icons
