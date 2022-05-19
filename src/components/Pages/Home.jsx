import React, { Component } from 'react'
import Speedometer from "react-d3-speedometer";
import BatteryGauge from 'react-battery-gauge'
import Chart from 'react-apexcharts'
import ApexCharts from 'react-apexcharts';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error:false,
      message:'',
        series: [],  
        series1: [
          {
              name: ' ',
              data:[
                [1327359600000,30.95],
                [1327446000000,31.34],
                [1327532400000,31.18],
                [1327618800000,31.05],
                [1327878000000,31.00],
                [1327964400000,30.95],
                [1328050800000,31.24],
                [1328137200000,31.29],
                [1328223600000,31.85],
                [1328482800000,31.86],
                [1328569200000,32.28],
                [1328655600000,32.10],
                [1328742000000,32.65],
                [1328828400000,32.21],
                [1329087600000,32.35],
                [1329174000000,32.44],
                [1329260400000,32.46],
                [1329346800000,32.86],
                [1329433200000,32.75],
                [1329778800000,32.54],
                [1329865200000,32.33],
                [1329951600000,32.97],
                [1330038000000,33.41],
                [1330297200000,33.27],
                [1330383600000,33.27],
                [1330470000000,32.89],
                [1330556400000,33.10],
                [1330642800000,33.73],
                [1330902000000,33.22],
                [1330988400000,31.99],
                [1331074800000,32.41],
                [1331161200000,33.05],
                [1331247600000,33.64],
                [1331506800000,33.56],
                [1331593200000,34.22],
                [1331679600000,33.77],
                [1331766000000,34.17],
                [1331852400000,33.82],
                [1332111600000,34.51],
                [1332198000000,33.16],
                [1332284400000,33.56],
                [1332370800000,33.71],
                [1332457200000,33.81],
                [1332712800000,34.40],
                [1332799200000,34.63],
                [1332885600000,34.46],
                [1332972000000,34.48],]
          },
      ],
        options: {
          chart: {
            id: 'area-datetime',
            type: 'area',
            height: 330,
            zoom: {
              autoScaleYaxis: true
            }
          },
          stroke: {
            width: 2,
            colors:['#ffad99']
           
          },
          dataLabels: {
            enabled: false,
            
          },
          markers: {
            size: 0,
            style: 'hollow',
           
          },
          xaxis: {
            type: 'datetime',
            // tickAmount: 6,
            labels: {
              datetimeUTC: false,
              // style: {
              //   colors: '#0d0d0d',
              //   fontSize: '16px',
              //   fontWeight:600,
              // }
        },
          },
          yaxis: {
            labels: {
              formatter: function (value) {
                return value.toFixed(2) + ""
               
              },
              // style: {
              //   colors: '#0d0d0d',
              //   fontSize: '16px',
              //   fontWeight:600,
              // }
            },
          },
          tooltip: {
            x: {
              format: 'yyyy-MM-dd HH:mm:ss'
            }
          },
          fill: {
            type: 'gradient',
            colors:['#ffad99'],
            // gradient: {
            //   shadeIntensity: 1,
            //   opacityFrom: 0.7,
            //   opacityTo: 0.9,
            //   stops: [0, 100]
            // }
          },
        },
      
        };
}
    componentDidMount(){
      this.setState({series:[5,10]})
    }

    details=()=>{

    }
  render() {
    const{series,series1}=this.state;
    return (
      <>
      <div style={{float: "right", width: "95%", marginRight:'0px',background:'#E5EEF0',height:'100vh' }}>
        <div style={{marginTop:'30px',display:'flex',marginLeft:'60px',justifyContent:'space-between',width:'93%'}}>
        <div className='cards' style={{cursor:'pointer'}} 
         onClick={() => {
          window.location.pathname = "/cardtempdet"
      }}
        >
          {/* <Link to='/'> */}
            <Speedometer 
                 width={200}
                 height={138}
                minValue={0}
                maxValue={200}
                needleHeightRatio={0.8}
                ringWidth={45}
                segments={6}
                value={40}
                segmentColors={["#00cc00", "#66ff66", "#ffff4d", "#ff9933","#ff704d", "#ff4000", ]}
                needleColor="#000000"
              />
              {/* </Link> */}
               <span className='card_text'>Max Temperature</span><br />
               <span style={{paddingTop:'8px',color:'#F15009',fontWeight:600,fontSize:'25px'}}>48°C</span>
        </div>

        <div className='cards' style={{cursor:'pointer'}} 
         onClick={() => {
          window.location.pathname = "/cardhumidet"
      }}>
            <Speedometer 
                width={200}
                height={138}
                minValue={0}
                maxValue={200}
                needleHeightRatio={0.8}
                ringWidth={45}
                segments={6}
                value={40}
                segmentColors={["#ffe6f9", "#ffb3ec", "#ff66d9", "#ff33cc","#ff00bf", "#b30086", ]}
                needleColor="#000000"
                
              />
              <span className='card_text'>Humidity</span><br />
               <span style={{paddingTop:'8px',color:'#cc0099',fontWeight:600,fontSize:'25px'}}>35%</span>
        </div>

        <div className='cards' >
            <Speedometer 
                  width={200}
                  height={138}
                minValue={0}
                maxValue={200}
                needleHeightRatio={0.8}
                ringWidth={45}
                segments={6}
                value={85}
                segmentColors={["#e6eeff", "#ccddff", "#b3ccff", "#99bbff","#80aaff", "#4d88ff", ]}
                needleColor="#000000"
              />
              <span className='card_text'>Energy Usage</span><br />
               <span style={{paddingTop:'8px',color:'#003cb3',fontWeight:600,fontSize:'25px'}}>85 kWh</span>
        </div>
        <div className='cards' >
       <div style={{marginLeft:'8px'}}>
       {series.length >0 ?
        <Chart series={series}
                                    options={{
                                        labels: [
                                            'Occupied','UnOccupied'
                                        ],
                                        legend: {  
                                            show:false,
                                            position:'bottom',
                                            offsetX:20
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        colors: [
                                            '#7CCC84', '#817e7e'
                                        ],
                                        plotOptions: {
                                            pie: {
                                                donut: {
                                                    labels: {
                                                      show:true,
                                                      name: {
                                                        show: true,
                                                        offsetY: -6,
                                                      },
                                                        total: {
                                                            show: false,
                                                            label: '',
                                                            formatter: () =>this.waste
                                                        },
                                                        tooltip: {
                                                          enabled: false,
                                                        }

                                                    }
                                                }
                                            }
                                        },
                                    }}
                                    
                                    type="donut"
                                    width="200"
                                    // height="340"
                                    />:<p></p>}
                                    </div>
              <span className='card_text'>Server Occupency</span><br />
               <span style={{paddingTop:'8px',color:'#7CCC84',fontWeight:600,fontSize:'25px'}}>75%</span>
        </div>
        <div className='cards'>
              <img src="/images/ghostserver.png" alt="" style={{width:'105px',marginBottom:'13px',marginLeft:'25px'}} />
              <br />
              <span className='card_text'>Ghost Servers</span><br />
               <span style={{paddingTop:'8px',color:'#FF7676',fontWeight:600,fontSize:'25px'}}>3</span>
        </div>
        </div>


        <div style={{display:'flex',width:'93%',marginLeft:'60px',marginTop:'30px'}}>
              <div  className='sensors_div'
              style={{boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.65)',background:'white',width:'450px',height:'340px',
              borderRadius:'8px',textAlign:'center'}}
              >
                    <p style={{fontSize:'21px',marginTop:'10px',fontWeight:600,color:'#5C5B5B',marginBottom:'14px',fontFamily:'poppins-Regular'}}>Total senors Installed</p>

                    <div 
                    style={{width:'375px',marginRight:'auto',marginLeft:'auto',borderRadius:'8px',
                    border:'1px solid #00629B',height:'78px',marginBottom:'10px'}}
                    >
                          <div style={{display:'flex',justifyContent:'space-between',boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.25)'
                        }}>
                              <img src="/images/asset.svg" alt="" style={{width:'95px'}}/>
                              <span className='sensor_tagtext'>
                                Asset Tag</span>
                              <span className='sensor_tagcount'>30</span>
                          </div>
                    </div>

                    <div className='sensors_div'
                    style={{width:'375px',boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.25)',marginRight:'auto',marginLeft:'auto',
                    borderRadius:'8px',border:'1px solid #00629B',height:'78px',marginBottom:'10px'}}
                    >
                    <div style={{display:'flex',justifyContent:'space-between'
                        }}>
                              <img src="/images/energy.svg" alt="" style={{width:'95px'}}/>
                              <span className='sensor_tagtext'>
                                Energy Tag</span>
                              <span className='sensor_tagcount'>30</span>
                          </div>
                    </div>

                    <div className='sensors_div'
                    style={{width:'375px',boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.25)',marginRight:'auto',
                    marginLeft:'auto',borderRadius:'8px',border:'1px solid #00629B',height:'78px',marginBottom:'10px'}}
                    >
                    <div style={{display:'flex',justifyContent:'space-between',
                        }}>
                          <div  style={{width:'95px',overflow:'hidden',}}>
                              <img src="/images/thsensor.svg" alt="" style={{height:'90px'}}/>
                           </div>
                              <span className='sensor_tagtext'>
                               T-H Sensors</span>
                              <span className='sensor_tagcount'>30</span>
                          </div>
                    </div>
              </div>  

              <div style={{width:'710px',height:'340px',background:'white',marginLeft:'28px',borderRadius:'8px',boxShadow:'0px 0px 8px rgba(0, 0, 0, 0.65)',textAlign:'center'}}>
                  <p style={{fontSize:'21px',marginTop:'10px',fontWeight:600,color:'#5C5B5B',marginBottom:'14px',fontFamily:'poppins-Regular'}}>Alerts History</p>

                    <div style={{marginLeft:'40px'}}>
                  <ApexCharts options={
                                            this.state.options
                                        }
                                        series={series1}
                                        type="area"
                                        width={620}
                                        height={280}/>
                                        </div>
        </div>      
        </div>

        
      </div>
      </>
    )
  }
}
