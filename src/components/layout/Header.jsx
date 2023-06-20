import Logo from "./Logo";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Link,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../context/StateProvider";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CartItems from "../Cart/CartItem";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Header = () => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [shake, setShake] = useState(false);

  const animate = () => {
    setShake(true);
    setTimeout(() => setShake(false), 1000);
  };
  useEffect(() => {
    animate();
  }, [cartItems.length]);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const handleOpenCartMenu = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };
  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <div className="d-flex justify-between w-100 align-center">
            <Logo />
            <div className="d-flex justify-between align-center">
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <StyledBadge
                    badgeContent={cartItems.length}
                    htmlColor="#ffffff"
                  >
                    <IconButton
                      onClick={handleOpenCartMenu}
                      aria-label="cart"
                      className={shake ? `shake` : null}
                    >
                      <ShoppingCartIcon
                        fontSize="inherit"
                        htmlColor="#ffffff"
                      />
                    </IconButton>
                  </StyledBadge>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElCart}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElCart)}
                  onClose={handleCloseCartMenu}
                >
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                  <CartItems/>
                </Menu>
              </Box>

              <Avatar
                className="ml-1"
                alt="Remy Sharp"
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
