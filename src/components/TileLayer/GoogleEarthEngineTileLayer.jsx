import { TileLayer, useMap, Rectangle, Popup } from "react-leaflet";
import { useStateValue } from "../../context/StateProvider";
import { useEffect, useState } from "react";
import { computeArea } from "spherical-geometry-js";

const GoogleEarthEngine = () => {
  const map = useMap();
  const [{ dataGoogleEarthEngine }] = useStateValue();
  const [area, setArea] = useState(0);
  const [center, setCenter] = useState([]);
  const [bound, setBound] = useState([
    ["", ""],
    ["", ""],
  ]);
  useEffect(() => {
    if (dataGoogleEarthEngine) {
      const { latitude, longitude } = dataGoogleEarthEngine.centerLocation;
      map.setView([latitude, longitude]);

      if (dataGoogleEarthEngine.mapView) {
        const { south, north, west, east } = dataGoogleEarthEngine.mapView;
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
        setBound([
          [south, west],
          [north, east],
        ]);
      }
    }
  }, [dataGoogleEarthEngine]);
  return (
    dataGoogleEarthEngine && (
      <>
        <TileLayer url={dataGoogleEarthEngine.linkSatellite} />
        {dataGoogleEarthEngine.mapView && (
          <>
            <Rectangle bounds={bound} pathOptions={{ color: "red" }} />
            <Popup
              position={[
                dataGoogleEarthEngine.centerLocation.latitude,
                dataGoogleEarthEngine.centerLocation.longitude,
              ]}
            >
              <div className="flex flex-col w-72">
                <h6 className="text-lg font-bold">{}</h6>
                <p className="m-0 text-sm">
                  <b>Latitude: </b>{" "}
                  {dataGoogleEarthEngine.centerLocation.latitude.toFixed(3)},{" "}
                  <b>Longitude: </b>{" "}
                  {dataGoogleEarthEngine.centerLocation.longitude.toFixed(3)}
                </p>
                <p className="m-0 text-sm">
                  <b>Area: </b> {area.toFixed(3)} km2
                </p>
              </div>
            </Popup>
          </>
        )}
      </>
    )
  );
};
export default GoogleEarthEngine;
