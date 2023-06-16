import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MyPopup, OWMTileLayer, SearchBar } from "../components";
import GeneralInfo from "../components/GeneralInfo";
import USGSTileLayer from '../components/TileLayer/USGSTIleLayer';
import GoogleEarthEngine from "../components/TileLayer/GoogleEarthEngineTileLayer";
import { useStateValue } from '../context/StateProvider';


function SetViewOnClick({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());

  return null;
}
const LeafletMap = () => {
  const [{ center }] = useStateValue();

  return (
    <>
      <MapContainer
        center={center}
        zoom={5}
        zoomControl={false}
        className="h-full w-full relative"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        {/* <SearchBar /> */}
        {/* <MyPopup /> */}
        <OWMTileLayer />
        <USGSTileLayer />
        <GoogleEarthEngine />
        {/* <GeneralInfo /> */}
        <SetViewOnClick center={center} />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
