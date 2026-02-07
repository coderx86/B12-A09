import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="grow pt-18">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
