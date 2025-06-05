# 🛍️ Shop.co — Modern E-commerce Web App

**Shop.co** is a modern, responsive e-commerce platform built with [Next.js](https://nextjs.org/), styled using [Tailwind CSS](https://tailwindcss.com/), and powered by [Firebase](https://firebase.google.com/) for authentication and database services. It offers user-friendly features like Google sign-in, product search, cart management, and more.

---

## ⚙️ Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend Services**: [Firebase](https://firebase.google.com/)
  - Firebase Authentication (Email/Password + Google)
  - Firestore Database (User & Product Data)
  - Firebase Storage (Product images and profile pictures)
- **State Management**: React Context API
- **Hosting**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/shop.co.git
cd shop.co

npm install
# or
yarn install

Create a project in Firebase Console, then enable:

Authentication: Email/Password and Google

Cloud Firestore: Create users and products collections

Firebase Storage: For image uploads

Then add your Firebase configuration to a .env.local file:
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

npm run dev
# or
yarn dev

📁 Project Structure
php
Copy code
.
├── app/                # App directory (Next.js pages and routes)
├── components/         # Reusable components (Navbar, Footer, ProductCard, etc.)
├── context/            # React Context (e.g., search, auth)
├── firebase/           # Firebase setup and utilities
├── public/             # Static assets (images, icons, etc.)
├── styles/             # Global styles and Tailwind base
├── tailwind.config.js  # Tailwind CSS configuration
├── .env.local          # Firebase environment variables
└── README.md           # Project documentation

Planned Improvements

 Stripe or PayPal integration

 Order management and checkout functionality

 Admin dashboard for managing users and products

 Ratings and reviews system

 Wishlist / Save for Later

 🙏 Acknowledgements
Built with ❤️ using:

Next.js

Tailwind CSS

Firebase


---

Let me know if you want to include demo URLs, screenshots, or if you're hosting on a custom domain.
