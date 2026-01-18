import React,{ useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
// import { db,auth } from '../Config/Firebase';
// import { doc, setDoc } from "firebase/firestore"; 
// import {  toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
  
  const defaultTheme = createTheme();
  


const Signup = ({ setUser}) => {
 
  const navigate = useNavigate();
  // const fireauth = auth;
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [Name, setFirstname] = useState('');
  // const [lastname, setLastname] = useState('');
    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const userSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/register', form) 
      setUser(res.data.user);
      console.log("User data", res.data.user)
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError("Registration failed");
    }
  };
  
return (

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={userSignup} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={form.name}
                  autoFocus
                  onChange={(e) => setForm({ ...form, name: e.target.value })}/>
                  </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}/>               
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={form.password}
                  autoComplete="new-password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}/>               
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={userSignup}
              sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );

}



export default Signup;





//   const userSignup = async (e) => {
// try {
//     e.preventDefault();
//     if(!name || !lastname || !useremail || !password){
//     toast.error('🦄 Wow so easy!', {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//       });
//         return;
//     }
//      createUserWithEmailAndPassword(fireauth,useremail,password)
//     .then(async(userSignup) => {
//          console.log("userCredential", userSignup);
//          console.log("userCredential", userSignup.user.uid);

//         // user data store on firestore
//       const obj = {
//         firstname,
//         lastname,
//         useremail,
//         isActive : true,
//       }

//       const userid = userSignup.user.uid;
//       await setDoc(doc(db, "userId",userid), obj)
//       navigate('/login')
//     })
//     .catch((error) => {
//       toast.error(error,{
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//         });
      
//     })

// }catch (error) {
//   toast.error(error, {
//     position: "top-center",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     });    
// }
  
//   }
