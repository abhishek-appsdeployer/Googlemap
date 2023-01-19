import logo from './logo.svg';
import './App.css';
import L from 'leaflet';
// import 'leaflet-geometry-utils';
import pp from 'robust-point-in-polygon'
import Maps from './Maps';
import classifyPoint from "robust-point-in-polygon"
import Mycomponent from './Mycomponent';

function App() {
  var polygon = [[27.080076368702738,77.6587721527467],
  [23.51945857524832,73.76910953837597]
  ,[21.744869488962916,80.32998322461562],
  [25.693785504321813,82.485699563497]
]
 
console.log(
  classifyPoint(polygon,[27.080066368702738,77.6587721527467]))
//   let points = [
//     [ 42.34624, 71.06024 ],
   
// ];
// let testPoint = [
//     [44.33288, 55.05804]

// ];

// let isInside = pp(testPoint, points);
// console.log(isInside)
// console.log((isInside=== true));

  return (
    <>
      <Maps/>
      {/* <Mycomponent/> */}

    </>
      );
}

export default App;
