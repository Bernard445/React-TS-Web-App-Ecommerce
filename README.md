🛒 FakeStore Shopping App

A modern React + TypeScript shopping application built using React Query, Redux Toolkit, and React Router.
This project demonstrates server-state management, global client-state handling, routing, and session persistence.

🚀 Features
🏠 Product Catalog

Fetches products from the FakeStore API

Displays:

Title

Price

Category

Description

Rating image

Gracefully handles broken image URLs

Products can be added directly to the cart

📂 Category Filtering

Category dropdown is dynamically loaded from the API

Selecting a category filters products in real time

No hardcoded categories

🛒 Shopping Cart (Redux Toolkit)

Add products to cart

Remove products from cart

Update quantities automatically

View total item count

View total price

Checkout clears the cart

💾 Session Persistence

Cart state is saved to sessionStorage

Cart persists across page refreshes

Checkout clears both Redux state and session storage

🌐 Routing

/ → Home (Product Listing)

/cart → Shopping Cart

Navigation handled with React Router
