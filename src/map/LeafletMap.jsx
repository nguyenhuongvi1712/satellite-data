import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MyPopup, OWMTileLayer, SearchBar } from "../components";
import GeneralInfo from "../components/GeneralInfo";
import USGSTileLayer from '../components/USGSTIleLayer';
import { useStateValue } from '../context/StateProvider';
import { Map } from 'leaflet';

const LeafletMap = () => {
  const [{ center }] = useStateValue();
  const map = useRef()

  useEffect(() => {
    console.log('map', map.current)
  }, [center])

  return (
    <MapContainer
      center={center}
      ref={map}
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
      {/* <GeneralInfo /> */}
    </MapContainer>
  );
};

export default LeafletMap;
