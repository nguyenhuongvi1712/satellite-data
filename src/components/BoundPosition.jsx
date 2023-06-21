import { Rectangle, Circle, Marker, useMap, Popup } from "react-leaflet";
import { useStateValue } from "../context/StateProvider";
import { useEffect, useMemo, useState } from "react";
import { computeArea } from "spherical-geometry-js";
import { actionType } from "../context/reducer";

const BoundPosition = () => {
  const [{ boundPosition }, dispatch] = useStateValue();
  const [area, setArea] = useState(0);
  const map = useMap();
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

  useEffect(() => {
    if (boundPosition.position) {
      map.setView([boundPosition.position?.lat, boundPosition.position?.lng]);
    }
    if (!boundPosition.mapView) return;
    const { south, north, west, east } = boundPosition.mapView;
    const area =
      computeArea([
        { lat: north, lng: west },
        { lat: north, lng: east },
        { lat: south, lng: east },
        { lat: south, lng: west },
      ]) / 1000000;
    setArea(area);
    map.fitBounds([
      { lat: north, lng: west },
      { lat: north, lng: east },
      { lat: south, lng: east },
      { lat: south, lng: west },
    ]);
  }, [boundPosition]);
  return boundPosition.position ? (
    <>
      {boundPosition.mapView ? (
        <>
          <Rectangle bounds={renderMapView} pathOptions={{ color: "red" }} />
          <Popup
            position={[boundPosition.position.lat, boundPosition.position.lng]}
          >
            <div className="flex flex-col w-72">
              <h6 className="text-lg font-bold">{}</h6>
              <p className="m-0 text-sm">
                <b>Latitude: </b> {boundPosition.position.lat.toFixed(3)},{" "}
                <b>Longitude: </b> {boundPosition.position.lng.toFixed(3)}
              </p>
              <p className="m-0 text-sm">
                <b>Area: </b> {area.toFixed(3)} km2
              </p>
            </div>
          </Popup>
        </>
      ) : (
        <Marker position={renderCenter} />
      )}
    </>
  ) : null;
};

export default BoundPosition;
