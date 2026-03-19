
<div align="center">

# 🖊️ BLOGIFY
### *Where Words Come Alive*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Now-FFD700?style=for-the-badge)](https://blog-frontend-seven-orcin.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-⚡_Fast-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<br/>

> **A sleek, full-featured blogging platform built with the MERN stack.**
> Create, share, and explore stories that matter.

<br/>

![Blogify Preview](https://via.placeholder.com/900x400/1a1a2e/FFD700?text=BLOGIFY+✦+Modern+Blog+Platform)

</div>

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 **Authentication** | Secure JWT-based login & signup |
| 📝 **Create Posts** | Rich blog post creation with title, content & images |
| 🖼️ **Image Upload** | Upload cover images for your posts |
| 👤 **User Profiles** | Personal profiles with bio and post history |
| 📖 **Read Posts** | Clean, distraction-free reading experience |
| ✏️ **Edit & Delete** | Full control over your own content |
| 💬 **Comments** | Engage with readers through comments |
| 🔍 **Browse Posts** | Explore all posts from the community |
| 📱 **Responsive** | Works beautifully on all screen sizes |

---

## 🛠️ Tech Stack

```
Frontend          →   React 18 + Vite
Styling           →   Tailwind CSS
HTTP Requests     →   Axios
Routing           →   React Router DOM
State Management  →   React Context API / useState
Auth              →   JWT (stored in localStorage)
Deployment        →   Vercel
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)

### Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/chiragdhiman99/Blog-frontend.git

# 2️⃣ Navigate to project folder
cd Blog-frontend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Create .env file
touch .env
```

### Environment Variables

Create a `.env` file in the root and add:

```env
VITE_API_URL=https://blog-backend-2nfz.onrender.com
```

> 💡 For local development, replace with `http://localhost:5000`

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

---

## 📁 Project Structure

```
Blog-frontend/
├── 📂 public/
├── 📂 src/
│   ├── 📂 components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── PostCard.jsx
│   │   └── ...
│   ├── 📂 pages/            # Page-level components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CreatePost.jsx
│   │   ├── PostDetail.jsx
│   │   └── Profile.jsx
│   ├── 📂 context/          # React Context (Auth state)
│   ├── App.jsx              # Routes & App entry
│   └── main.jsx
├── .env
├── vite.config.js
├── vercel.json              # Vercel SPA routing fix
└── package.json
```

---

## 🌐 Deployment

This project is deployed on **Vercel**.

### Deploy Your Own

1. Fork this repo
2. Go to [vercel.com](https://vercel.com) and import your fork
3. Add environment variable:
   ```
   VITE_API_URL = your_backend_url
   ```
4. Hit **Deploy** 🚀

> ⚠️ The `vercel.json` file handles React Router redirects — don't delete it!

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 🔗 Backend Repository

This is the frontend only. The backend (Node.js + Express + MongoDB) lives here:

👉 **[Blog-backend Repository](https://github.com/chiragdhiman99/Blog-backend)**

| Service | URL |
|---------|-----|
| 🌐 Frontend | [blog-frontend-seven-orcin.vercel.app](https://blog-frontend-seven-orcin.vercel.app) |
| ⚙️ Backend API | [blog-backend-2nfz.onrender.com](https://blog-backend-2nfz.onrender.com) |

---

## 🙌 Author

**Chirag Dhiman**

[![GitHub](https://img.shields.io/badge/GitHub-chiragdhiman99-181717?style=flat&logo=github)](https://github.com/chiragdhiman99)

---

<div align="center">

Made with ❤️ and lots of ☕

⭐ **Star this repo if you found it helpful!** ⭐

</div>
