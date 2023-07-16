import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MyPopup, OWMTileLayer, SearchBar } from "../components";
import GeneralInfo from "../components/GeneralInfo";
import USGSTileLayer from '../components/TileLayer/USGSTIleLayer';
import GoogleEarthEngine from "../components/TileLayer/GoogleEarthEngineTileLayer";
import { useStateValue } from '../context/StateProvider';
import BoundPosition from "../components/BoundPosition";
import { EditControl } from "react-leaflet-draw";
import { actionType } from '../context/reducer';


import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { getImageGoogleEarthEngine } from '../apis';



function SetViewOnClick ( { center } )
{
    const map = useMap();
    map.setView( center, map.getZoom() );

    return null;
}
const LeafletMap = () =>
{
    const [ { center, zoom, queryParams }, dispatch ] = useStateValue();
    const [ mapLayers, setMapLayers ] = useState( [] );

    const _onCreate = ( e ) =>
    {
        if ( mapLayers.length > 1 )
            return

        const { layerType, layer } = e;
        if ( layerType === "polygon" )
        {
            const { _leaflet_id } = layer;

            setMapLayers( ( layers ) => [
                ...layers,
                { id: _leaflet_id, latlngs: layer.getLatLngs()[ 0 ] },
            ] );
        }
    };

    const _onEdited = ( e ) =>
    {
        const {
            layers: { _layers },
        } = e;

        Object.values( _layers ).map( ( { _leaflet_id, editing } ) =>
        {
            setMapLayers( ( layers ) =>
                layers.map( ( l ) =>
                    l.id === _leaflet_id
                        ? { ...l, latlngs: editing.latlngs[ 0 ][ 0 ] }
                        : l
                )
            );
        } );
    };

    const _onDeleted = ( e ) =>
    {
        const {
            layers: { _layers },
        } = e;

        Object.values( _layers ).map( ( { _leaflet_id } ) =>
        {
            setMapLayers( ( layers ) => layers.filter( ( l ) => l.id !== _leaflet_id ) );
        } );
    };
    useEffect( () =>
    {
        const fetch = async () =>
        {
            var polygon = []
            if ( mapLayers.length > 0 )
                polygon = mapLayers[ 0 ].latlngs.map( e =>
                {
                    return [
                        e.lng,
                        e.lat
                    ]
                } )
            dispatch( {
                type: actionType.SET_QUERY_PARAMS,
                value: {
                    ...queryParams,
                    polygon
                },
            } );
            const res = await getImageGoogleEarthEngine( {
                channelId: queryParams.channelId,
                enableHyperResolution: queryParams.enableHyperResolution,
                polygon: JSON.stringify( polygon )
            } );
            if ( res )
            {

                dispatch( {
                    type: actionType.SET_BOUND_POSITION,
                    value: {
                        mapView: res.mapView || {},
                        position: {
                            lat: res.centerLocation.latitude,
                            lng: res.centerLocation.longitude,
                        },
                        linkSatellite: res.linkSatellite,
                    },
                } );
            }
        }
        fetch()
    }, [ mapLayers ] )

    return (
        <>
            <MapContainer
                center={ center }
                zoom={ zoom }
                className="h-full w-full relative"
                style={ { zIndex: 0 } }
                zoomControl={ false }
            >
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={ _onCreate }
                        onEdited={ _onEdited }
                        onDeleted={ _onDeleted }
                        draw={ {
                            rectangle: false,
                            polyline: false,
                            circle: false,
                            circlemarker: false,
                            marker: false,
                            polygon: mapLayers.length > 0 ? false : true
                        } }
                    />
                </FeatureGroup>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
                {/* <SearchBar /> */ }
                {/* <MyPopup /> */ }
                <OWMTileLayer />
                <USGSTileLayer />
                <GoogleEarthEngine />
                <BoundPosition />
                {/* <GeneralInfo /> */ }
                <SetViewOnClick center={ center } />
            </MapContainer>
        </>
    );
};

export default LeafletMap;
