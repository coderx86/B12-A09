import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './providers/AuthProvider';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import MyProfile from './pages/MyProfile';
import Plants from './pages/Plants';
import PlantDetails from './pages/PlantDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Signup />,
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'plants',
        element: (
          <PrivateRoute>
            <Plants />
          </PrivateRoute>
        ),
      },
      {
        path: 'plants/:id',
        element: (
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        ),
      }
    ],
  },
], {
  basename: "/",
});

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  );
}

export default App;
