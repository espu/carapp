import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {
  const [open, setOpen] = React.useState(false);
  const [car, setCar] = React.useState({brand: '', model: '', color: '', fuel: '', year: '', price: ''});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      props.addCar(car);
      setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            fullWidth
            variant="standard"
            value={car.brand}
            onChange={event => setCar({...car, brand: event.target.value})}
          />
          <TextField
            margin="dense"
            label="Model"
            fullWidth
            variant="standard"
            value={car.model}
            onChange={event => setCar({...car, model: event.target.value})}
          />
          <TextField
            margin="dense"
            label="Color"
            fullWidth
            variant="standard"
            value={car.color}
            onChange={event => setCar({...car, color: event.target.value})}
          />
          <TextField
            margin="dense"
            label="Fuel"
            fullWidth
            variant="standard"
            value={car.fuel}
            onChange={event => setCar({...car, fuel: event.target.value})}
          />
          <TextField
            margin="dense"
            label="Year"
            fullWidth
            variant="standard"
            value={car.year}
            onChange={event => setCar({...car, year: event.target.value})}
          />
          <TextField
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
            value={car.price}
            onChange={event => setCar({...car, price: event.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}