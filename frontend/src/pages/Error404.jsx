// src/pages/Error404.jsx
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

function Error404() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto p-4 flex-grow text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">The page you're looking for doesn't exist.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Error404;