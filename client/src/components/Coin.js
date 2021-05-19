import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import React, { useState } from 'react';
import {
  Link,
  Grid,
  Card,
  Typography,
  CardContent,
} from '@material-ui/core/'
import Available from './Available';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    marginLeft: 200

  },
  coin: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const Coin = (props) => {
  let newTotal = 0;
  const classes = useStyles();
  let [coins] = useState([1, 2, 5, 6, 8, 10, 15, 18]);
  let [total, setTotal] = useState(0);

  if (props.returnedMoney != total) {
    setTotal(props.returnedMoney);
    props.sendCoin(props.returnedMoney);
  }

  const setMoney = (e, value) => {
    e.preventDefault();
    newTotal = total + value;
    setTotal(newTotal);
    props.sendCoin(newTotal);
  }

  const onReset = (money = 0) => {
    setTotal(money);
    props.sendCoin(props.sendCoin(money));
  }

  return (
    <div className={classes.root}>
      <Grid item xs={3}>
        <Available money={total} reset={onReset} />
      </Grid>
      <Card className={classes.coin}>
        {coins.map((coin, index) => {
          return <Link href="#" onClick={(e) => setMoney(e, coin)} key={index} >
            <Avatar key={coin} className={classes.orange}>{coin}</Avatar>
          </Link>
        })}
      </Card>
      <Card>
        <CardContent>
          <Typography color='primary'>
            Current Coin Amount
        </Typography>
          <Typography gutterBottom color='primary' variant='h5'>
            {props.currentCoinAmount}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Coin;
