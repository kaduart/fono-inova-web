// components/Layout/index.jsx - Versão Simplificada
import Footer from '../Footer';
import Header from '../Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-inter">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;