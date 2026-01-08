🛒 React + TypeScript E-Commerce App with Firebase

A full e-commerce web application built with React, TypeScript, Redux Toolkit, and Firebase (Auth + Firestore).

🚀 Features
🔐 Authentication

User Signup (email + password)

Login

Logout

Store user profile data in Firestore

Profile page with:

Display user data

Edit profile (update Firestore)

Delete account (Auth + Firestore)

🛍 Product Management

Products loaded from FakeStore API

Category dropdown filter

Add products to cart

Remove item from cart

Clear cart

🛒 Cart & Orders (Firestore)

Cart persists inside UI state (Redux)

Checkout saves order to Firestore

Includes userId

Products in cart

Total price

Timestamp

Order History page (filtered by logged-in user)

Order Details page (click order to view items)

📦 User Order History

View all previous orders

Display total, date, item count

Click to view order details

🧱 Tech Stack
Technology	Purpose
React + TypeScript	Front-end UI
React Router	Navigation
Redux Toolkit	Global cart state
React Query	Data fetching and caching
FakeStore API	Product data feed
Firebase Auth	User authentication
Firebase Firestore	Users + Orders storage
