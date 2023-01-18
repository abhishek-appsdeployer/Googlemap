import React, { useState } from 'react';
import { MapContainer,FeatureGroup, TileLayer, Polygon, Circle } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { EditControl } from "react-leaflet-draw"
import { isPointInPolygon } from "leaflet-geometryutil";

const location = [21.0000, 78.0000];
const zoom = 5;





function Maps() {
  const [maplayer,setMaplayer]=useState([])
  const point=[20,30]
  const _onCreate=e=>{
    console.log(e)
    const {layer,layerType}=e
    
    if(layerType==="polygon")
    {
     
      
      const id=layer._leaflet_id
      console.log("polygon")
      console.log(id)
      // setMaplayer(id)
     
      const {_leaflet_id}=layer
      console.log(JSON.stringify(layer._latlngs[0]))
      const data=JSON.stringify(layer._latlngs[0])
      if(isPointInPolygon(point,data)){
        console.log("Point inside polygon");
    }else{
        console.log("Point outside polygon");
    }
      
      console.log(JSON.stringify(maplayer,0,2))
      const datas={id:id,latlang:data}
      setMaplayer((old)=>[...old,datas])
      
    }
   

  }
  const _onEditPath=e=>{
    
    console.log(e)
    const {layers:{_layers}}=e
    console.log(_layers)
    // Object.values(_layers).map(({_leaflet_id,_editing})=>{
    //   setMaplayer((layers)=>
    //   layers.map((l)=>l.id===_leaflet_id ?{...l,latlang:{..._editing.latlangs}}:l
    //   ))
    // }
    // )
  }
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
        marker:false
      }}
    />
 
  </FeatureGroup>
  </MapContainer>
  {/* <div>Data:{maplayer}</div> */}
  {
    console.log("Map",maplayer)
  }
    </div>
  );
}

export default Maps;
