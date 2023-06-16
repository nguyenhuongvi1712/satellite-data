import { Rectangle, Circle, Marker } from "react-leaflet";
import { useStateValue } from "../context/StateProvider";
import { useMemo } from "react";
const BoundPosition = () => {
  const [{ boundPosition }, dispatch] = useStateValue();
  const renderMapView = useMemo(() => {
    return boundPosition.mapView
      ? [
          [boundPosition.mapView.south, boundPosition.mapView.west],
          [boundPosition.mapView.north, boundPosition.mapView.east],
        ]
      : [];
  }, [boundPosition]);
  const renderCenter = useMemo(() => {
    return boundPosition.position
      ? [boundPosition.position?.lat, boundPosition.position?.lng]
      : [];
  }, [boundPosition]);
  return boundPosition.position ? (
    <>
      {boundPosition.mapView ? (
        <Rectangle bounds={renderMapView} pathOptions={{ color: "red" }} />
      ) : (
        // <Circle
        //   center={renderCenter}
        //   radius={500}
        //   pathOptions={{ color: "red" }}
        // />
        <Marker position={renderCenter}/>
      )}
    </>
  ) : null;
};

export default BoundPosition;
