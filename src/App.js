import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
// import 'leaflet-geometry-utils';

import Maps from './Maps';

function App() {
  const point = L.latLng(51.5, -0.09);
const polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
  
]);
// const isInside = L.GeometryUtil.isPointInPolygon(point, polygon);
// console.log(isInside);
  return (
    <>
      <Maps/>

    </>
      );
}

export default App;
