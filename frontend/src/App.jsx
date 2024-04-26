import {useEffect,useCallback} from 'react'
import "./App.css";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import {Context} from './main.jsx'
import Login from "./components/Auth/Login.jsx"
import Register from "./components/Auth/Register.jsx";
import Navbar from "./components/Layout/Navbar.jsx"
import Footer from "./components/Layout/Footer.jsx";
import Home from "./components/Home/Home.jsx"
import Job from "./components/Job/Job.jsx"
import JobDetails from "./components/Job/JobDetails.jsx"
import MyJobs from "./components/Job/MyJobs.jsx"
import PostJobs from "./components/Job/PostJob.jsx"
import Application from "./components/Application/Application.jsx"
import MyApplications from "./components/Application/MyApplications.jsx"
import NotFound from "./components/NotFound/NotFound.jsx"
import axios from "axios"
import {Toaster} from "react-hot-toast"
const App = () => {
  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser = async () => {
      try{
        const res = await axios.get("",{withCredentials:true});
        setIsAuthorized(true);
        setUser(res.data);
      }
      catch(err){
        setIsAuthorized(false);
      }
    }
      fetchUser();
  },[isAuthorized])
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job" element={<Job />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/job/post" element={<PostJobs />} />
          <Route path="/applications/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
        <Toaster/>  
      </Router>
    </div>
  );
}

export default App
