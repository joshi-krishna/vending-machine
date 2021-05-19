
import { makeStyles } from '@material-ui/core/styles';
import Coin from './Coin'
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/'
import React, { useState, useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { useAlert } from 'react-alert';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  media: {
    height: 10,
    paddingTop: '56.25%',
  },
  btn: {
    '& > *': {
      margin: theme.spacing(2),
    }
  },
}))

const Machine = () => {
  const alert = useAlert();
  const classes = useStyles()
  let [currentCoinAmount, setCoinAmount] = useState(0);
  let [products, setProducts] = useState([]);
  let [returnedMoney, setReturnedMoney] = useState(0);
  let [inputCoin, setInputCoin] = useState(0);

  useEffect(async () => {
    let response = await fetch('/api/products');
    let data = await response.json();
    setProducts(data.products);
    setCoinAmount(data.coinAmount);
  }, [])

  const setCoins = (inputCoin) => {
    setReturnedMoney(0);
    setInputCoin(inputCoin);
  }

  const purchaseItem = async (productId) => {
    try {
      let response = await fetch(`/api/products/${productId}?coin=${inputCoin}`);
      if (response.status == 200) {
        let data = await response.json();
        if (data.product)
          renderProduct(data, inputCoin);
        else
          alert.error(data.message);
      }
    }
    catch (error) {
      alert.error(error.message);
    }
  }


  const refundItem = async (product) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      };
      let response = await fetch(`/api/products/${product.id}`, requestOptions);
      if (response.status == 200) {
        let data = await response.json();
        if (data.stock) {
          data.product = product;
          renderProduct(data);
        }
        else
          alert.error(data.message);
      }
    }
    catch (error) {
      alert.error(error.message);
    }
  }

  const renderProduct = (data, coin = null) => {
    alert.success(data.message);
    data.product.stock = coin ? data.product.stock : data.stock
    setReturnedMoney(data.returnedMoney);
    let index = products.findIndex(p => p.id === data.product.id);
    products.splice(index, 1, data.product);
    setProducts(products);
    let currentCoin = coin ? currentCoinAmount + (coin - data.returnedMoney) : currentCoinAmount - data.returnedMoney;
    setCoinAmount(currentCoin);
  }

  return <div className={classes.root}>
    <Grid
      container
      spacing={2}
      direction='row'
      justify='flex-start'
      alignItems='flex-start'
    >
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardHeader
              subheader={`Stock : ${product.stock}`}
            />
            <CardMedia
              className={classes.media}
              image={product.imgUrl}
            />
            <CardContent>
              <Typography variant='h5' gutterBottom color='primary'>
                {product.name}
              </Typography>
              <Typography gutterBottom>
                Price: Rs {product.price}
              </Typography>
              <div className={classes.btn}>
                <Button onClick={() => purchaseItem(product.id)} variant='contained' color='primary'>
                  Purchage
            </Button>
                <Button onClick={() => refundItem(product, index)} variant='contained' color='secondary'>
                  Refund
            </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Coin sendCoin={setCoins} returnedMoney={returnedMoney} currentCoinAmount={currentCoinAmount} />
  </div>
}

export default Machine;
