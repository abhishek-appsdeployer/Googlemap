import React, { useState } from 'react';
import { MapContainer,FeatureGroup, TileLayer, Polygon, Circle } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { EditControl } from "react-leaflet-draw"
import { map } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import classifyPoint from "robust-point-in-polygon"
const location = [21.0000, 78.0000];
const zoom = 5;
var id

// const hollywoodStudiosPolygon = [
//   [
//     [ 40.35390453844, 90.56443119049 ],
//     [ 40.35390453844, 90.55619144439 ],
//     [ 40.35983376526, 90.55619144439 ],
//     [ 40.35983376526, 90.56443119049 ],
//     [ 40.35390453844, 90.56443119049 ],
//   ]
// ];

// const epcotCenter = [ 40.373711394092478, 90.54936790466309 ];

export default function Mycomponent() {
const coords =[];
  const [maplayers,setMaplayer]=useState([])
   
  const _onCreate=e=>{
    console.log(e)
    const {layer,layerType}=e
    if(layerType === "polygon"){
      const {_leaflet_id} = layer
      setMaplayer ((layers)=>[
        ...layers,{id:_leaflet_id,latlangs:layer.getLatLngs()[0]}
      ])
    }
     
    console.log(coords)

  }
  
  const _onEditPath=e=>{
    
    // console.log(e);
    const {layers:{_layers}}=e;
    console.log(id)
    
    
    Object.values(_layers).map(({_leaflet_id,editing})=>{
      setMaplayer((layers )=>
      layers.map((l) =>( l.id === _leaflet_id ) ? { ...l,latlngs : {...editing.latlngs[0]}}:l
      ));
    });
  };
  
  const _onDeleted=e=>{
    console.log(e)
  }
  return (
    <div className="App">
      <MapContainer center={location} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        {/* <Polygon color="blue" positions={hollywoodStudiosPolygon} />
        <Circle color="magenta" center={epcotCenter} radius={1000} /> */}
    
      <FeatureGroup>
    <EditControl
      position='topright'
      onEdited={_onEditPath}
      onCreated={_onCreate}
      onDeleted={_onDeleted}
      draw={{
        rectangle: false,
        polyline:false,
        circle:false,
        circlemarker:false,
        marker:true
      }}
    />
 
  </FeatureGroup>
  </MapContainer>
  <pre className='text-left'>{JSON.stringify(maplayers,0,2)}</pre>
  {/* { coords.map((edit)=>{
    return(
      <div>
   
   </div>
    )
  })
  } */}
  </div>
  
  );
}

