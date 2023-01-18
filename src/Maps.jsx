import React, { useState } from 'react';
import { MapContainer,FeatureGroup, TileLayer, Polygon, Circle } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { EditControl } from "react-leaflet-draw"
import { map } from 'leaflet';
import classifyPoint from "robust-point-in-polygon"
const location = [21.0000, 78.0000];
const zoom = 5;

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

function Maps() {
  const [maplayer,setMaplayer]=useState([])
  var result
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
      const data=layer._latlngs[0]
      // setMaplayer([...maplayer,{id,data}])
      var ab=data
      const d = [{"lat":30.813424171560843,"lng":72.73811672047044},
      {"lat":25.524629679905697,"lng":71.66025922141586},
      {"lat":24.845624986530257,"lng":80.70489128840295}];

     
     if(data.length>0)
     {
      console.log(data)
      result = data.map(item => [item.lat,item.lng]);
      console.log(result)
      alert(classifyPoint(result,[27.080066368702738,77.6587721527467]))
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
      alert(classifyPoint(result,marks))
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
