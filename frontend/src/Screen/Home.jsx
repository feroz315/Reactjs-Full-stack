import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../Components/Card";
import HeaderBar from "../Components/HeaderBar";
import Drawer from "../Components/Drawer";
import { Box, Grid } from '@mui/material';
// import { Box, Grid } from '@mui/material';
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
import Clients from "../Components/Clients";
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
      {/* {/* <div style={{ display: "flex" ,flexDirection: 'row', gap: '20px', padding: '20px', flexWrap:'wrap'  }}>
        {dataItem.map(product => (
          <div key={product.id}>
              <Cardproduct
                image={product.images}
                title={product.title}
                description={product.description}
                category={product.category}
                price={product.price}
                buttonText="Add to Cart"
                onButtonClick={() => navigate(`/details/${product.id}`)}
              />
        </div>
        ))}
        </div>
        </div>
         )
        }
         */}
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








              {/* Add more cards as needed */}
  
            {/* <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="150"
        image={product.images} // Replace with your image URL
        alt="Sample Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
   
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
       
       <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
       
        <Typography variant="body2" color="text.secondary">
          {product.currency_code}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardActions>
          </Card>
  */}
