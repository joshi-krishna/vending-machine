
import { makeStyles } from '@material-ui/core/styles'
import Coin from './Coin'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader
} from '@material-ui/core/'
import { useState, useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  media: {
    height: 10,
    paddingTop: '56.25%', // 16:9
  },
}))

function Machine() {
  const classes = useStyles()
  let [products, setProducts] = useState([]);
  useEffect(async () => {
    let response = await fetch('/api/products');
    let data = await response.json();
    setProducts(data.products);
  }, [])

  console.log('products', products)
  return <div className={classes.root}>
    <Grid
      container
      spacing={2}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {products.map(product => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card>
            <CardHeader color="primary"
              subheader={`Stock : ${product.stock}`}
            />
            <CardMedia
              className={classes.media}
              image={product.imgUrl}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant='h5' gutterBottom color="primary">
                {product.name}
              </Typography>
              <Typography gutterBottom color="sucess">
                Price: Rs {product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Coin/>
  </div>
}





export default Machine;
