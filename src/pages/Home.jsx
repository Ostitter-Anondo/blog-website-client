import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <>
      <header className="sticky top-0">
        <Navbar />
      </header>
      <main className="my-12 min-h-screen">
        idhar ghar
      </main>
      <Footer />
    </>
  );
};

export default Home;
