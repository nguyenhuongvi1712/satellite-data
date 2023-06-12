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
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../context/StateProvider";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

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
              <StyledBadge badgeContent={cartItems.length} htmlColor="#ffffff">
                <Link href="/cart" color="inherit" underline="none">
                  <IconButton
                    aria-label="cart"
                    className={shake ? `shake` : null}
                  >
                    <ShoppingCartIcon fontSize="inherit" htmlColor="#ffffff" />
                  </IconButton>
                </Link>
              </StyledBadge>
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
