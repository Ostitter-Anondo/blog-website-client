import Lottie from "lottie-react";
import dataNotFound from "./Lottie/DataNotFound.json";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router";

const DataNotHereYet = () => {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="w-11/12 mx-auto mb-12">
        <div className="size-96 mx-auto">
          <Lottie animationData={dataNotFound} loop={true} />
        </div>
        <div className="w-7/12 mx-auto flex flex-col gap-6">
          <h1 className="font-extrabold text-7xl text-center text-secondary">
            Uh oh...
          </h1>
          <h1 className="font-extrabold text-3xl text-center text-accent">
            The data you were looking for seems to be presently unavailable!
          </h1>
          <Link to={-1} className="btn btn-link btn-lg">
            Wanna head back?
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DataNotHereYet;
