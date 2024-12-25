import Lottie from "lottie-react";
import RoboHi from "./Lottie/RoboHi.json";
import HandHi from "./Lottie/HandHi.json";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import useMainContext from "../utils/useMainContext";
import { Link, useLoaderData } from "react-router";
import BlogCard from "./components/BlogCard";
import { HiOutlineMail } from "react-icons/hi";
import CustomerReviewCard from "./Home/CustomerReviewCard";
import Banner from "./Home/Banner";


const Home = () => {
  const { userData, toastSuc } = useMainContext();

  const blogsData = useLoaderData().data;

  const customerA = {
    fname: "Johnny",
    lname: "SilverHand",
    date: "12/09/2023",
    review: "A VERY POSITIVE REVIEW THAT IS FLATTERING THIS WEBSITE TO NO END.",
  };
  const customerB = {
    fname: "Vincent",
    lname: "VanHorn",
    date: "01/12/2080",
    review: "A modest review that seems completely fine.",
  };
  const customerC = {
    fname: "Arthur",
    lname: "Morgan",
    date: "23/03/1899",
    review: "a kinda terrible review that makes you wonder why it's here.",
  };

  const noUserWelcome = (
    <div className="flex flex-col md:flex-row items-center justify-between w-11/12 gap-6">
      <div className="flex flex-col gap-6">
        <h1 className="font-extrabold text-4xl text-primary">
          Hello there! Wanna join our site?
        </h1>
        <h3 className="font-semibold text-xl text-secondary">
          Why you should join:
        </h3>
        <ul className="list-disc list-inside font-light">
          <li>Get the latest news in science and tech!</li>
          <li>
            Maybe get in touch with your nature lover side with our nature
            related articles even!
          </li>
          <li>
            Or maybe you&apos;re into the show biz? we have stuff for that too!
          </li>
        </ul>
        <div className="w-full flex flex-col items-center gap-3">
          <h3 className="font-semibold text-xl text-accent">Join today!</h3>
          <ul className="menu menu-horizontal p-1 items-center border-2 border-base-300 w-fit rounded-xl">
            <li>
              <Link
                to="/login"
                className="border-r border-base-300 rounded-r-none rounded-l-lg"
              >
                Log in
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="border-l border-base-300 rounded-r-lg rounded-l-none"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-fit bg-neutral/30 rounded-md p-12">
        <Lottie animationData={RoboHi} className="h-96" loop={true} />
      </div>
    </div>
  );
  const userWelcome = (
    <div className="flex flex-col md:flex-row items-center justify-between w-11/12 gap-6">
      <div className="flex flex-col gap-6">
        <h1 className="font-extrabold text-4xl text-primary">
          Welcome back! How have you been,{" "}
          {userData?.name ? userData.name : "user"}?
        </h1>
        <h3 className="font-semibold text-xl text-secondary">
          We&apos;ve missed you, while you&apos;here:
        </h3>
        <ul className="list-disc list-inside font-light">
          <li>Get the latest news in science and tech!</li>
          <li>
            Maybe get in touch with your nature lover side with our nature
            related articles even!
          </li>
          <li>
            Or maybe you&apos;re into the show biz? we have stuff for that too!
          </li>
        </ul>
      </div>
      <div className="h-fit bg-neutral/30 rounded-md p-12">
        <Lottie animationData={HandHi} className="h-96" loop={true} />
      </div>
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="my-12 min-h-screen flex flex-col items-center">
        <Banner />
        <div className="w-11/12 mx-auto">
          <h1 className="font-extrabold text-4xl text-primary text-center">
            Check out our most recent articles!
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-12 lg:mx-20 gap-6">
          {blogsData.map((data) => (
            <BlogCard key={data._id} blogdata={data} />
          ))}
        </div>
        <div className="my-12 flex w-full justify-center">
          {userData ? userWelcome : noUserWelcome}
        </div>
        <div className="w-11/12 mx-auto my-12 flex justify-between gap-6 flex-col-reverse lg:flex-row">
          <div className="relative h-80 w-1/2">
            <div className="absolute top-0 left-8">
              <CustomerReviewCard data={customerC} />
            </div>
            <div className="absolute top-48 left-8">
              <CustomerReviewCard data={customerB} />
            </div>
            <div className="absolute top-24 left-6 md:left-32">
              <CustomerReviewCard data={customerA} />
            </div>
          </div>
          <div className="flex flex-col items-center text-center md:items-end md:text-right justify-center gap-6">
            <h1 className="font-extrabold text-4xl text-accent">
              See what our users are saying
            </h1>
            <h3 className="font-semibold text-xl text-secondary">
              They leave the darndest reviews
            </h3>
            <p>Some are good, others are not, we take what we can get!</p>
          </div>
        </div>
        <div className="bg-base-200/40 min-h-48 w-11/12 md:w-9/12 lg:w-7/12 rounded-xl backdrop-blur-sm -mb-32 z-20 flex flex-col items-center gap-6 p-12">
          <h3 className="font-semibold text-xl text-secondary">
            How about subscribing to our newsletter?
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toastSuc(`You have been successfuly added to our mailing list`);
            }}
            className="w-full join join-vertical sm:join-horizontal"
          >
            <label className="w-full input input-bordered flex items-center gap-2 pr-0 join-item">
              <HiOutlineMail />
              <input
                type="text"
                className="grow"
                placeholder="Email"
                name="email"
                required
              />
            </label>
            <button type="submit" className="btn btn-outline join-item">
              subscribe
            </button>
          </form>
        </div>
      </main>
      <footer className="flex flex-col justify-end h-72 md:h-48 bg-neutral">
        <Footer />
      </footer>
    </>
  );
};

export default Home;
