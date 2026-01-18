// import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



function Cards({title,description,image,id,price,brand}) {
  const navigate = useNavigate();

  
  return (
   <Card sx={{ maxWidth: 220, marginTop:10,marginLeft:4, borderRadius:10,boxShadow:10, }}>
    <CardMedia
      sx={{ height: 120,width:"100%", }}
      image={image}
    />
    <CardContent>
    <Typography gutterBottom variant="h7" component="div">
    {brand}
    </Typography>
      <Typography gutterBottom variant="h7" component="div">
       {title.substring(0, 10)}
    </Typography>
  
      <Typography variant="body2" color="text.secondary">
        {description.substring(0, 50)}
      </Typography>    
 
      <Typography gutterBottom variant="h7" component="div" align='center'>
       ${price}
      </Typography>
       </CardContent>

    <Button type="button" variant="contained" wid style={{marginBottom:6}} 
      onClick={() => navigate(`/details/${id}`)}
      >ADD to Cart</Button>
    
  </Card>

  );
}

export default Cards;

