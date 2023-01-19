import React, { useState } from 'react';
import { MapContainer,FeatureGroup, TileLayer, Polygon, Circle } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw"
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { map } from 'leaflet';
import classifyPoint from "robust-point-in-polygon"
const location = [21.0000, 77.0000];
const zoom = 5;
var id



function Maps() {
  const [maplayer,setMaplayer]=useState([])
  const [tr,settr]=useState([])
 var totalresult
  var result
  const _onCreate=e=>{
    console.log(e)
    const {layer,layerType}=e
    
    if(layerType==="polygon")
    {
     
      id=layer._leaflet_id
      console.log("polygon")
      console.log(id)
      // setMaplayer(id)
     
      const {_leaflet_id}=layer
      console.log(JSON.stringify(layer._latlngs[0]))
      const data=layer._latlngs[0]
      
      
      

     
     if(data.length>0)
     {
      console.log(data)
      result = data.map(item => [item.lat,item.lng]);
      
      console.log(result)
      // settr([...tr,...result])
      console.log("Total result",totalresult)
      // alert(classifyPoint(result,[27.080066368702738,77.6587721527467]))
     }
      
     
     
      const datas={id:id,latlang:data}
      setMaplayer((old)=>[...old,datas])
      // setMaplayer([datas,...maplayer])
      // console.log("Data:",maplayer)
    }
    else{
      console.log(e)
      var marks=[]
      const relat=layer._latlng.lat
      const relng=layer._latlng.lng
      marks=[relat,relng]
      console.log(marks)
      console.log(result)
      let check = classifyPoint(result,marks)
      if (check===1)
      {
        alert("outside polygon")
      }
      else{
        alert("inside polygon")
      }
      
    }
   


  }
  const _onEditPath=e=>{
    
    // console.log(e)
    // console.log(e.layers._layers)
    console.log(e)
    const {layers:{_layers}}=e
    console.log(id)

    console.log(_layers[id]?_layers[id]._latlngs[0]:"")
    const d=_layers[id]?_layers[id]._latlngs[0]:""
    result = d.map(item => [item.lat,item.lng]);
    
    console.log(result)
    
    
    
    
    
    // Object.values(_layers).map(({_leaflet_id,_editing})=>{
    //   setMaplayer((_layers)=>
    //   _layers.map((l)=>l.id===_leaflet_id ?{...l,latlng:{..._editing.latlngs}}:l
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
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
    
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
  {/* <div>Data:{maplayer}</div> */}
  {
    console.log("Map",maplayer)
  }
    </div>
  );
}

export default Maps;
