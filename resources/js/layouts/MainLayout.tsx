import { Outlet } from 'react-router-dom';
import Navbar from "../common/components/ui/Navbar";
import Footer from "../common/components/ui/Footer";
import CartDrawer from "../modules/cart/components/CartDrawer";

export default function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-brand-white min-h-screen selection:bg-brand-mel/30 selection:text-brand-wine">
      <Navbar />
      <main>{children || <Outlet />}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
