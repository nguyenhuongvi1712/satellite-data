const style = {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: "#ffffff"
}
import Link from "@mui/material/Link";
const Logo = () => {
    return (
      <>
        <Link href="/" style={style} color="inherit" underline="none">
          Satellite Data
        </Link>
      </>
    );
}
export default Logo