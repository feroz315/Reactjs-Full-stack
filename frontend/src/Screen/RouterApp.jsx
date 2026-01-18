// import { Route,Routes } from 'react-router-dom';
import Home from './Home';
import Details from './Details';
import Signup from './Signup';
import SignIn from './Login';
import Signout from './Signout';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../Components/Navbar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import Authroute from './Authroute';
import Protected from './Protected';
import CartScreen from './CartScreen';

axios.defaults.withCredentials = true;

function RouterApp() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

<>

     {/* <Navbar user={user} setUser={setUser} /> */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path='/cart' element={<CartScreen />}/> 
        <Route path="/details/:id" element={<Details />}/>
        <Route path='/logout' element={<Signout />}/> 


        </Routes>
   
</>
    
    
  )
}

export default RouterApp





    // <Routes>

    // <Route path="/details/:id" element={<Details />}/>
    // <Route path='/cart' element={<CartScreen />}/>
    

    // <Route element={<Protected />}>
    // </Route>
    // <Route path='/home' element={<Home />}/>  
    
    // <Route element={<Authroute />}>
    // <Route index element={<SignIn />}/>
    // <Route path='/signup' element={<Signup />} />
    
    // </Route>

    // </Routes>

      //  <ToastContainer
  //   position="top-center"
  //   autoClose={5000}
  //   hideProgressBar={false}
  //   newestOnTop={false}
  //   closeOnClick
  //   rtl={false}
  //   pauseOnFocusLoss
  //   draggable
  //   pauseOnHover
  //   theme="light"
  //   />
