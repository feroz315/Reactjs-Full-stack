import React,{ useState ,useMemo} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import { AddItem,DelItem,DelCard,selectcartItems,selectTotal } from '../Redux/CartSlice';


const CartScreen = () => {

const [groupedItems, setGroupedItems] = useState([]);

const basketTotal = useSelector(selectTotal);
const basketItems = useSelector(selectcartItems)


const dispatch = useDispatch();  
const navigation  = useNavigate()

useMemo(() => {
        
  const gItems = basketItems.reduce((group, item)=>{
          if(group[item.id]){
            group[item.id].push(item);
          }else{
            group[item.id] = [item];
          }
          return group;
        },{})
      setGroupedItems(gItems);
      // console.log('items: ',gItems);
     
  }, [basketItems])



return (
  <>
  <div className='d-flex flex-row justify-content-between bg-success align-items-center'>
  <h2 className='text-center'>Cart Item</h2>

   </div> 
   
   {
    Object.entries(groupedItems).map(([key, item]) => {
        
    return(
    <>
      <div key={key}>
      <img src={item[0]?.image} style={{width:'300px',height:'350px' }}/>
      <h3>{item[0]?.title}</h3>
      <p>{item[0]?.description}</p>
      <p>$.{item[0]?.price}</p>    
 
      </div>
  

   <div className='d-flex flex-row gap-3'>  
   <button onClick={() => {dispatch(DelItem({id: item[0]?.id}))}}>Delete</button>
   <h4>{basketItems.length}</h4>
   <button onClick={() => {dispatch(AddItem(item[0]))}}>ADD</button>

   {/* Total */}
   <div className='d-flex flex-row gap-2'>
    
    <p>$.{basketTotal}</p>
   
   <button onClick={() => {dispatch(DelCard(item[0].id))}}>Delete Cart</button>
    <button>Check out</button>
    
      </div>
   
   </div>
   </>
   )
  })
 }
</>
    
  )
}
   




export default CartScreen;


















// import React, { useState } from 'react';
// import { 
//   Drawer, 
//   Box, 
//   Typography, 
//   IconButton, 
//   List, 
//   ListItem, 
//   ListItemText, 
//   Badge,
//   Button,
//   Divider
// } from '@mui/material';
// import { ShoppingCart, Close, Add, Remove } from '@mui/icons-material';

// const CartDrawer = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([
//     { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
//     { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
//     { id: 3, name: 'Product 3', price: 19.99, quantity: 3 }
//   ]);

//   const toggleDrawer = (open) => () => {
//     setIsDrawerOpen(open);
//   };

//   const updateQuantity = (id, change) => {
//     setCartItems(prevItems => 
//       prevItems.map(item => 
//         item.id === id 
//           ? { ...item, quantity: Math.max(0, item.quantity + change) }
//           : item
//       ).filter(item => item.quantity > 0)
//     );
//   };

//   const removeItem = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   const getTotalItems = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <div>
//       {/* Cart Button */}
//       <IconButton 
//         onClick={toggleDrawer(true)}
//         color="primary"
//         sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}
//       >
//         <Badge badgeContent={getTotalItems()} color="error">
//           <ShoppingCart />
//         </Badge>
//       </IconButton>

//       {/* Drawer */}
//       <Drawer
//         anchor="right"
//         open={isDrawerOpen}
//         onClose={toggleDrawer(false)}
//         sx={{
//           '& .MuiDrawer-paper': {
//             width: 400,
//             padding: 2
//           }
//         }}
//       >
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5" component="h2">
//             Shopping Cart
//           </Typography>
//           <IconButton onClick={toggleDrawer(false)}>
//             <Close />
//           </IconButton>
//         </Box>

//         <Divider />

//         {/* Cart Items */}
//         {cartItems.length === 0 ? (
//           <Typography sx={{ textAlign: 'center', mt: 4 }}>
//             Your cart is empty
//           </Typography>
//         ) : (
//           <>
//             <List sx={{ flexGrow: 1 }}>
//               {cartItems.map((item) => (
//                 <ListItem key={item.id} sx={{ borderBottom: '1px solid #eee' }}>
//                   <Box sx={{ flexGrow: 1 }}>
//                     <ListItemText 
//                       primary={item.name} 
//                       secondary={`$${item.price}`} 
//                     />
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => updateQuantity(item.id, -1)}
//                       >
//                         <Remove fontSize="small" />
//                       </IconButton>
//                       <Typography>{item.quantity}</Typography>
//                       <IconButton 
//                         size="small" 
//                         onClick={() => updateQuantity(item.id, 1)}
//                       >
//                         <Add fontSize="small" />
//                       </IconButton>
//                       <Button 
//                         size="small" 
//                         color="error" 
//                         onClick={() => removeItem(item.id)}
//                         sx={{ ml: 2 }}
//                       >
//                         Remove
//                       </Button>
//                     </Box>
//                   </Box>
//                   <Typography variant="body1" fontWeight="bold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </Typography>
//                 </ListItem>
//               ))}
//             </List>

//             {/* Footer */}
//             <Box sx={{ mt: 'auto', pt: 2 }}>
//               <Divider />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
//                 <Typography variant="h6">Total:</Typography>
//                 <Typography variant="h6" fontWeight="bold">
//                   ${getTotalPrice().toFixed(2)}
//                 </Typography>
//               </Box>
//               <Button 
//                 variant="contained" 
//                 fullWidth 
//                 size="large"
//                 sx={{ mt: 2 }}
//               >
//                 Checkout
//               </Button>
//             </Box>
//           </>
//         )}
//       </Drawer>
//     </div>
//   );
// };

// export default CartDrawer;
