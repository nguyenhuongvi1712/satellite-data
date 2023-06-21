import { TileLayer } from "react-leaflet"
import { useStateValue } from "../../context/StateProvider"

const GoogleEarthEngine = () => {
  const [{ boundPosition }] = useStateValue();
  return (
    boundPosition.linkSatellite && (
      <>
        <TileLayer url={boundPosition.linkSatellite} />
      </>
    )
  );
};
export default GoogleEarthEngine;
