import { Link, useRouteError } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center px-6">
        <h1 className="text-9xl font-bold text-green-500">404</h1>
        <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
        <p className="text-base-content/70 mt-2 mb-6">
          {error?.statusText || error?.message || "The page you're looking for doesn't exist."}
        </p>
        <Link to="/" className="btn btn-primary bg-green-500 border-green-500 hover:bg-green-600">
          Back to Home
        </Link>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ErrorPage;
