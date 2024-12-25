import { Link } from "react-router";
import pencilscroll from "../../assets/pencilscroll.png";
import pencilweb from "../../assets/pencilweb.png";
import pencputer from "../../assets/pencputer.png";
import { motion } from "motion/react";
import { FaBook } from "react-icons/fa";
import { easeInOut } from "motion";

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-200 w-11/12 md:w-7/12 p-6 lg:p-3 rounded-lg mb-12 mx-auto">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12 lg:gap-0 justify-between">
          <div className="lg:w-1/2 flex flex-col justify-center items-center">
            <motion.div
              animate={{ y: 120, x: -60 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: easeInOut,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <img src={pencilweb} alt="pencilweb" className="size-32" />
            </motion.div>
            <div className="flex">
              <motion.div animate={{ x: 120 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: easeInOut,
                repeat: Infinity,
                repeatType: "reverse",
              }}>
                <img
                  src={pencilscroll}
                  alt="pencilscroll"
                  className="size-32"
                />
              </motion.div>
              <motion.div animate={{ y: -120, x: -60 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: easeInOut,
                repeat: Infinity,
                repeatType: "reverse",
              }}>
                <img src={pencputer} alt="pencputer" className="size-32" />
              </motion.div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold">Latest and greates blogs!</h1>
            <p className="py-6">
              We have blogs from all different categories. Whatever may interest
              you, we have in store! just go on ahead and check out what we have
              for you!
            </p>
            <div className="flex justify-center">
              <motion.div className="w-fit" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Link to="/blogs" className="btn btn-primary">
                  Start Reading
                  <FaBook />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
