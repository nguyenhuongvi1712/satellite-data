import { Box, Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { useStateValue } from "../context/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { actionType } from "../context/reducer";

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
        <h1 className="text-center text-bold mb-1" style={{fontSize: '1.5rem'}}>Your Cart </h1>
        {cartItems &&
          cartItems.map((item) => (
            <Card variant="outlined" className="mb-1">
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
      </Box>
    </>
  );
};
export default CartPage;
