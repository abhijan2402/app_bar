import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  useEffect(() => {
    const url = "https://api.tvmaze.com/search/shows?q=all";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json1 = await response.json();
        console.log(json1);
        setShowName(json1)
        console.log(showName)

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [showName, setShowName] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='App'>
      <h1 style={{ textAlign: "center" }}>Movies</h1>
      <h2 style={{ textAlign: "center" }}>Click on any image </h2>
      {
        showName.map((showName) =>
          <div style={{ textAlign: "center", display: "inline-block", width: "30%", margin: "10px " }}>
            <div style={{ display: "block" }}>
              <img onClick={handleClickOpen} src={showName.show.image.original} alt='nothing' style={{ width: "400px", height: "280px", borderRadius: "20px" }}></img>
              <h2>{showName.show.name}</h2>
            </div>
          </div>
        )
      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service to book ticket near you?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to book a ticket for this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
