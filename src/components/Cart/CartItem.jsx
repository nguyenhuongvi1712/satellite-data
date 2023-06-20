import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { useStateValue } from "../../context/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionType } from "../../context/reducer";

const CartItems = () => {
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
          maxWidth: "400px",
          maxHeight: "50vh",
        }}
      >
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
                  sx={{ marginLeft: 1 }}
                  className="d-flex justify-between w-100 align-center"
                >
                  <div>
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
        <div className="d-flex justify-between p-3">
          <Button variant="contained" style={{ width: "45%" }}>
            Checkout now
          </Button>
          <Link
            href="/cart"
            color="inherit"
            underline="none"
            style={{ width: "45%" }}
          >
            {" "}
            <Button variant="outlined" style={{width: '100%'}}>View Cart</Button>
          </Link>
        </div>
      </Box>
    </>
  );
};
export default CartItems;
