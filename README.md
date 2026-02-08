# 🌿 GreenNest - Indoor Plant Care & Store

GreenNest is a modern, responsive single-page web application for indoor plant enthusiasts. Browse our curated collection of indoor plants, get expert care tips, and book consultations with plant specialists. Features secure Firebase authentication with Google Sign-In support.

**🔗 Live Site:** [GreenNest on Netlify](#)
---

## ✨ Key Features

### 1. Authentication
- Email/Password registration and login
- Google Sign-In integration
- Password reset functionality
- Protected routes for authenticated users
- Profile management with photo upload

### 2. Plant Store
- Browse curated indoor plant collection
- Search and filter plants by category
- View detailed plant information
- See care level, ratings, and stock availability
- Book free consultations with experts

### 3. Home Page
- Hero section with animated image slider
- Top-rated plants showcase
- Plant care tips section
- Plant of the Week feature
- Meet our green experts
- Eco decor ideas gallery

### 4. User Experience
- Fully responsive design (mobile, tablet, desktop)
- Modern UI with DaisyUI components
- Smooth animations and transitions
- Toast notifications for user feedback
- Custom error page (404)

---

## 📦 Technologies Used

- **React:** Component-based UI library.
- **Vite:** Next Generation Frontend Tooling.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **daisyUI:** Tailwind CSS component library for prebuilt UI components and themes.
- **React Router:** For seamless client-side navigation.
- **Firebase:** For secure authentication (Email/Password & Google Sign-In).
- **Swiper:** For interactive hero image carousel.
- **React Toastify:** For notification toasts.
- **React Icons:** For beautiful vector icons.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/coderx86/B12-A09.git
   cd B12-A09
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** *(Optional - already configured)*
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google providers)
   - Update `src/firebase/firebase.config.js` with your credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```