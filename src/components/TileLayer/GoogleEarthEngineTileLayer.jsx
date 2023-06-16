import { TileLayer } from "react-leaflet";
import { useStateValue } from "../../context/StateProvider";
const GoogleEarthEngine = () => {
    const [{ dataGoogleEarthEngine }] = useStateValue();

    return (
      <>{dataGoogleEarthEngine && <TileLayer url={dataGoogleEarthEngine} />}</>
    );
};
export default GoogleEarthEngine