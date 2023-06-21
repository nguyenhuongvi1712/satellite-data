import { TileLayer } from "react-leaflet";
import { useStateValue } from "../../context/StateProvider";

const USGSTileLayer = () => {
  const [{ usgsData }] = useStateValue();
  

  return <>
    {
        usgsData && usgsData.map(data => (
            <TileLayer url={data.tileUrl}/>
        ))
    }
  </>
};

export default USGSTileLayer;
