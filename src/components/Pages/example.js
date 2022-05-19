import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Speedometer from "react-d3-speedometer";
import BatteryGauge from 'react-battery-gauge'

function example() {
    const [value, setValue] = useState(100);
  const interval = useRef(null);
  const generateRandom = () => setValue(Math.floor(Math.random() * 100));
  useEffect(() => {
      console.log("-----------");
    interval.current = setInterval(function() {
      generateRandom();
    }, 1000);
    return () => clearInterval(interval.current);
  }, []);

  return (
      <>
      <div style={{display:'flex',float: "right", width: "95%", marginRight:'0px',background:'#E5EEF0',height:'100vh' }}>
    <div style={{textAlign:'center',marginTop:'180px',marginLeft:'100px'}}>
         <Speedometer
          minValue={0}
          maxValue={200}
        //   maxSegmentLabels={12}
          needleHeightRatio={0.8}
          ringWidth={45}
          segments={6}
          value={value}
          segmentColors={[
            "#e6eeff",
            "#ccddff",
            "#b3ccff",
            "#99bbff",
            "#80aaff",
            "#4d88ff",
           
          ]}
          needleColor="#000000"
        />
       
    </div>
    <div style={{marginTop:'220px'}}>
    <BatteryGauge value={value} orientation={"horizontal"}  size={100} height={30}
  
    customization={{
        
        // batteryMeter: {
        //   noOfCells: 10,
        
        // },
        // readingText: {
        //     lightContrastColor : "purple",
        //     darkContrastColor : "yellow",
        //     lowBatteryColor : "red",
        //     fontFamily : "Arial",
        //     fontSize : 12
        //   },
            batteryBody: {
              strokeWidth: 4,
              
              cornerRadius: 6,
              fill: 'none',
              strokeColor: '#111'
            },
            batteryCap: {
              fill: 'none',
              strokeWidth: 4,
              strokeColor: '#111',
              cornerRadius: 2,
              capToBodyRatio: 0.4,
            
            },
            batteryMeter: {  
              fill: 'green',
              lowBatteryValue: 15,
              lowBatteryFill: 'red',
              outerGap: 1,
              noOfCells: 10, // more than 1, will create cell battery
              interCellsGap: 1
            },
            readingText: {
                
              lightContrastColor: '#111',
              darkContrastColor: '#111',
              lowBatteryColor: 'red',
              fontFamily: 'Helvetica',
              fontSize: 30,
              showPercentage: true
            },
            // chargingFlash: {
            //   scale: undefined,
            //   fill: 'orange',
            //   animated: true,
            //   animationDuration: 1500
            // },
          

      }}
    
    />
    
    </div>
    </div>
    </>
  )
}

export default Home
