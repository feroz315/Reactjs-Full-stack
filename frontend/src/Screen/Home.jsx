import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Components/Card";
import HeaderBar from "../Components/HeaderBar";
import Drawer from "../Components/Drawer";
import { Box, Grid } from '@mui/material';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import Cardproduct from "../Components/Carditems";

import { Row } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import { IconBase } from "react-icons";
import { useNavigate, Link } from "react-router-dom";


const Home = () => {
const [dataItem, setDataItem] = useState([]);
const navigate = useNavigate();

  const getdata = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/allproducts`, dataItem);
      console.log(res.data);
      setDataItem(res.data);
        
    } catch (error) {
      console.log("error", error);
    }
  };

 
  useEffect(() => {
    getdata();
  }, []);

// const navigatedata = () => {
// navigate("/details/:id")
// }


  return (
    <div>
      <Navbar />

      <h1>Product Store</h1>
               <Box mt={"20px"} width={"100%"}>
                      <Grid container spacing={2}> 
                        {dataItem.map((item, i) =>
                          <Grid item xs={2}>               
                            <Cards key={i}
                              id={item.id}
                              title={item.title}
                              images={item.images}
                              price={item.price}
                              description={item.description}
                              category={item.category}

                            />
                                              </Grid>
                        
                        )}
                      </Grid>
                    </Box>
               </div>
      )
               }
      
               
               
export default Home;







