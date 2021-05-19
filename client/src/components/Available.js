import {
  Button,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core/'

const Available = ({ money, reset }) => {
  return (
    <Card>
      <CardContent>
        <Typography color='primary'>
          Your Money
        </Typography>
        <Typography variant='h5' gutterBottom color='primary'>
          {money}
        </Typography>
        <Button color='default' onClick={() => reset(0)} variant='contained'> Reset Money</Button>
      </CardContent>
    </Card>
  )
}

export default Available;
