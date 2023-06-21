import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import { useStateValue } from "../context/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionType } from "../context/reducer";
import CartItems from "../components/Cart/CartItem";
import { useMemo } from "react";
import { OtherHouses } from "@mui/icons-material";
import CheckoutModal from "../components/Cart/CheckoutModal";
import { useState } from "react";

const CartPage = () => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const handleOnCLick = (id) => {
    dispatch({
      type: actionType.REMOVE_CART_ITEM,
      id,
    });
  };
  const subTotal = useMemo(() => {
    return (
      cartItems.reduce((sum, item) => {
        return sum + item.area;
      }, 0) * 0.01
    );
  }, [cartItems]);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          paddingTop: 9,
          margin: "auto 400px",
        }}
      >
        <h1
          className="text-center text-bold mb-1"
          style={{ fontSize: "1.5rem" }}
        >
          Your Cart {cartItems.length > 0 && `(${cartItems.length} items)`}
        </h1>
        {cartItems &&
          cartItems.map((item, index) => (
            <Card variant="outlined" className="mb-1" key={index}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                {/* <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.data.linkSatellite}
                  alt="Live from space album cover"
                /> */}
                <Box
                  sx={{ marginLeft: 1 }}
                  className="d-flex justify-between w-100 align-center"
                >
                  <div>
                    <div>
                      <strong>Latitude/Longitude: </strong>
                      <span>
                        {item.data.centerLocation.latitude},
                        {item.data.centerLocation.longitude}
                      </span>
                    </div>
                    <div>
                      <strong>Area: </strong>
                      <span>{item.area} km2</span>
                    </div>
                    <div>
                      <strong>Resolution: </strong>
                      <span>{item.channel.resolutions}</span>
                    </div>
                    <div>
                      <strong>Channel : </strong>
                      <span>{item.channel.nameChannel}</span>
                    </div>
                    <div>
                      <strong>Satellite : </strong>
                      <span>{item.channel.googleEearthSatellitedata.name}</span>
                    </div>
                  </div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleOnCLick(index)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        {cartItems.length > 0 ? (
          <div style={{ textAlign: "right" }}>
            <p className="mb-3">
              <b>Total:</b>{" "}
              <span style={{ fontSize: "1.5em", fontWeight: 800 }}>
                ${subTotal?.toFixed(2)}
              </span>
            </p>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Checkout now
            </Button>
          </div>
        ) : (
          <>
            <p className="text-center" style={{fontSize: '1.5em'}}>Your cart is empty</p>
          </>
        )}

        <CheckoutModal open={open} handleClose={() => setOpen(false)} />
      </Box>
    </>
  );
};
export default CartPage;
