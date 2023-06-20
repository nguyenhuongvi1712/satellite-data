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

const CartPage = () => {
  const [{ cartItems }, dispatch] = useStateValue();
  const handleOnCLick = (id) => {
    dispatch({
      type: actionType.REMOVE_CART_ITEM,
      id,
    });
  };
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
          cartItems.map((item) => (
            <Card variant="outlined" className="mb-1" key={item.id}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.imageUrl}
                  alt="Live from space album cover"
                />
                <Box
                  sx={{ marginLeft: 5 }}
                  className="d-flex justify-between w-100 align-center"
                >
                  <div>
                    <div>
                      <strong>Id: </strong>
                      <span>{item.idUsgs}</span>
                    </div>
                    <div>
                      <strong>Latitude/Longitude: </strong>
                      <span>
                        {item.lat},{item.long}
                      </span>
                    </div>
                    <div>
                      <strong>Vertical: </strong>
                      <span>{item.vertical}</span>
                    </div>
                    <div>
                      <strong>Horizontal: </strong>
                      <span>{item.horizontal}</span>
                    </div>
                  </div>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleOnCLick(item.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        <div style={{ textAlign: "right" }}>
          <p className="mb-3">
            <b>Total:</b> <span style={{fontSize: '1.5em', fontWeight: 800}}>$46.60</span>
          </p>
          <Button variant="contained">Checkout now</Button>
        </div>
      </Box>
    </>
  );
};
export default CartPage;
