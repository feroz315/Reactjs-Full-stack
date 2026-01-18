import axios from 'axios';
import { useEffect ,useState} from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector, useDispatch } from 'react-redux';
// import { setDoc,doc } from 'firebase/firestore';
// import { db } from '../Config/Firebase';
import { selectcartItems,AddItem } from '../Redux/CartSlice';
// import Navbar from '../Components/Navbar';
// import { Box, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
// import Cardproduct from '../Components/Carditems';


const Details = () => {

const { id } = useParams();
  
const dispatch = useDispatch();
// const products = useSelector(state => state.product)
const CartItems = useSelector(selectcartItems);


const navigate = useNavigate();
  
const [product, setProduct ] = useState([])
// const { images,title,description,price } = product;


const AddItems = () => {
  dispatch(AddItem({...product}),
   localStorage.setItem("product", JSON.stringify(product)),
    // setDoc(doc(db, "userId", ))
  
    )
    console.log("add to cart", product)
}


const getId = async () => {
try {
  const res = await axios.get(`http://localhost:3000/api/product/${id}`)
  console.log("products", res.data)
  setProduct(res.data)
} catch (error) {
  console.log("error",error);
 }
}


useEffect(() => {
  getId()
},[])


return (
    <>
    <div className='d-flex flex-row justify-content-between bg-success align-items-center'>
    <h2 className='text-center'>Product Details</h2>

    <div className='d-flex flex-row gap-3 align-items-center'>
     <div className='d-flex flex-column'>
     <PermIdentityIcon fontSize='large' />
     <p>Login</p>
    </div>
    
    <div className='d-flex flex-column align-items-center'>
     <ShoppingCartOutlinedIcon fontSize='large' onClick={() => navigate('/cart')}/>   
     <p>{CartItems.length}</p>
      </div>    
     </div>  
    </div>  
   
   <div style={{ marginTop:20, marginLeft:550}}>
          
   
    <Card sx={{ maxWidth: 350 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          images={product.images}
         
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {product.description}
           </Typography>

           <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            ${product.price}
           </Typography>
       
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => AddItems()}>
          Add to Card
        </Button>
      </CardActions>
    </Card>
   

  {/* <Grid item>
  <img src={image} style={{width:'300px',height:'350px' }}/>
  <h3>{title}</h3>
  <p>{description}</p>
  <p>Rs.{price}</p>
  
  <button onClick={() => AddItems()}>Add to Card</button>
  </Grid>
     */}

   </div> 
   
    </>   
    
    )
}



export default Details;

