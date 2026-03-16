// components/Layout/index.jsx - Versão Simplificada
import Footer from '../Footer';
import Header from '../Header';
import FixedWhatsAppBar from '../FixedWhatsAppBar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-inter">
            <Header />
            <main>{children}</main>
            <Footer />
            <FixedWhatsAppBar />
        </div>
    );
};

export default Layout;