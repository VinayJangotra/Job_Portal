
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZee Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Join JobZee now: Enter your name, email, and password. Verify
                your email to access a world of career opportunities. Explore
                listings, connect with employers, and take charge of your
                future!
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Search for your dream job or ideal candidate. Use filters to
                refine your search. Post job listings to attract top talent.
                Discover new opportunities and connect with potential employers
                or employees.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Easily apply for jobs or recruit top talent on JobZee.
                Seamlessly connect with candidates or employers. Get started
                now!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
