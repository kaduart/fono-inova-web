// components/Layout/index.jsx - Versão Simplificada
import Footer from '../Footer';
import Header from '../Header';
import AutoReveal from '../premium/AutoReveal';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-inter">
            <Header />
            <main>{children}</main>
            <AutoReveal />
            <Footer />
        </div>
    );
};

export default Layout;