import { MapContainer, TileLayer, Marker, Popup,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.scss";
import { useEffect, useState } from "react";
import L from "leaflet"; // Để sử dụng leaflet-routing-machine
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"; // Import CSS cho routing machine
import "leaflet-routing-machine";
import { getAllPosts } from "../../../services/post.service";

function Map() {

  return (
    <MapContainer
      
    >
      
      
    </MapContainer>
  );
}

export default Map;
