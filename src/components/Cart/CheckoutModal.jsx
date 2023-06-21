import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const CheckoutModal = ({ open, handleClose }) => {
  const [cartNumber, setCartNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState("");
  const [cartName, setCartName] = useState("");
  const [cvv, setCvv] = useState("");
  const [{}, dispatch] = useStateValue();
  const handleOnOrder = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch({
        type: actionType.RESET_CART,
      });
      setLoading(false);
      handleClose();
      toast("Order successfully!");
    }, 5000);
  };
  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {loading ? (
          <>
            <DialogTitle id="alert-dialog-title">Payment method</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress sx={{ margin: "0px auto" }} />
              </Box>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">Payment method</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Credit Card
              </DialogContentText>
              <div className="d-flex justify-between align-center mt-2">
                <TextField
                  id="filled-basic"
                  label="Credit Card Number"
                  variant="standard"
                  value={cartNumber}
                  onChange={(e) => setCartNumber(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Expiration"
                  variant="standard"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                />
              </div>
              <div className="d-flex justify-between align-center mt-3">
                <TextField
                  id="standard-basic"
                  label="Name on Card"
                  variant="standard"
                  value={cartName}
                  onChange={(e) => setCartName(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="CVV"
                  variant="standard"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                onClick={handleOnOrder}
                autoFocus
                disabled={
                  cartNumber == "" ||
                  cartName == "" ||
                  cvv == "" ||
                  expiration == ""
                }
              >
                Order
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default CheckoutModal;
