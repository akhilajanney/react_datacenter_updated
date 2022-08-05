import React, { Component } from 'react'
import axios from 'axios'
import $ from "jquery";
import Lottie from 'react-lottie';
import alertTemp from '../animations/alert_lottie/alert_temp.json';
import alertHumi from '../animations/alert_lottie/alert_humidity.json';
import alertEnergy from '../animations/alert_lottie/alert_energy.json';
import { useEffect } from 'react';

export default class Assetalert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: []
        };
    }
    componentDidMount() {
        let data = sessionStorage.getItem("assethistory")
        let jsonData = JSON.parse(data)
        this.getDetails(jsonData)
    }
    getDetails = (jsonData) => {
        $("#rackImg").attr("src", "../images/mainframe.png");
        $("#rackImg").css({ "width": "200px", "height": "522px" });
        let incValue = 0;
        for (let i = 42; i >= 1; i--) {
            let assetDiv = document.createElement("div");
            $(assetDiv).attr("id", "asset_" + i);
            $(assetDiv).attr("class", "assets");
            $(assetDiv).css({
                "width": "175px",
                "height": "9px",
                "position": "absolute",
                "background": "rgba(16,255,0,0.6)",
                "left": "12px",
                "top": (13 + incValue).toString() + "px",
            });
            $("#img_container").append(assetDiv);
            incValue += 12;
       
        }
        let data = jsonData
        console.log(data)
        console.log(jsonData.location)
        $("#asset_" + data.location).css({
            "background": "rgba(255,35,0,0.6)",
        });
        if (data.alerts.length > 0) {
            $('.alertdiv').show();
            $("#asset_" + data.location).css("animation", "blink 0.9s linear infinite");
 
        }
        let dts = data.alerts;
        let alertData = [];

        for (let i = 0; i < dts.length; i++) {
            if (dts[i].value === 8) {
                alertData.push({ id: 3, value: 8, type: "Temperature", animData: alertTemp })
            } else if (dts[i].value === 9) {
                alertData.push({ id: 4, value: 9, type: "Humidity", animData: alertHumi })
            } else if (dts[i].value === 10) {
                alertData.push({ id: 5, value: 10, type: "Energy", animData: alertEnergy })
            }
        }
        this.setState({ alerts: alertData })
    }

    render() {
        const { alerts } = this.state;
        let data1 = sessionStorage.getItem("assethistory")
        let jsonData1 = JSON.parse(data1)
        return (
            <div id='divheight'
                style={{
                    float: "right",
                    width: "95%",
                    background: "#E5EEF0",
                    marginLeft: "60px",
                }}>
                <div style={{ marginTop: "30px", marginLeft: "60px", }}>
                    <span className="main_header">ASSET DETAILS</span>
                    <div className="underline" style={{ marginBottom: "25px" }}></div>
                    <div style={{ display: 'inline-block' }}>
                        <div id="img_container" style={{ position: "relative" }}>
                            <img id="rackImg"
                                style={{
                                    position: "absolute",
                                }} alt="" />
                        </div>
                    </div>
                    <span style={{color:'#6e737e',fontWeight:700,paddingLeft:'265px'}}>Rack ID : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.placedIn.macid}</span></span>   
                    <span style={{color:'#6e737e',paddingLeft:'39%',fontWeight:700}}>Asset ID : <span style={{color:'#00629B',fontWeight:500}}> {jsonData1.tagid}</span></span>
                   
                    <div style={{ marginLeft: '260px',background:'white',
                                  width:'900px',height:'76vh',borderRadius:'6px',padding:'5px',marginTop:'5px'}}>

                                  <span style={{fontWeight:700, color:'#6e737e',paddingTop:'10px',paddingLeft:'5px'}}>Rack Name : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.placedIn.name}</span></span>

                                  <span style={{fontWeight:700, color:'#6e737e',paddingTop:'10px',paddingLeft:'170px'}}>Asset Name : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.name}</span></span>

                                  <span style={{fontWeight:700, color:'#6e737e',paddingTop:'10px',paddingLeft:'180px'}}>Last Seen : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.lastseen.replace("T", " ").substr(0, 19)}</span></span>
             
                        <div style={{width:'900px',paddingLeft:'8px',marginTop:'10px'}} className='alrt_history'>
                                <div style={{display:'flex',marginBottom:'10px'}}>
                            <div style={{width:'210px',marginTop:'7px',}} >
                                <p>U-Location : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.location}</span> <span style={{color:'#00629B',marginLeft:'22px'}}><i className="fas fa-plus-circle"></i></span></p>
                                <p>High-Power : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.highpowerevent.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'3px'}}><i className="fas fa-plus-circle"></i></span></p>
                            </div>
                            <div style={{width:'200px',marginLeft:'25px',marginTop:'7px'}}>
                                <p>Energy : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.energy.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'22px'}}><i className="fas fa-plus-circle"></i></span></p>
                                <p>Hotspot : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.hotspot}</span> <span style={{color:'#00629B',marginLeft:'53px'}}><i className="fas fa-plus-circle"></i></span></p>
                            </div>
                            <div style={{width:'180px',marginLeft:'25px',marginTop:'7px'}}>
                                <p>Coldspot : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.coldspot}</span> <span style={{color:'#00629B',marginLeft:'40px'}}><i className="fas fa-plus-circle"></i></span></p>
                                <p>Voltage : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.voltage.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'11px'}}><i className="fas fa-plus-circle"></i></span></p>
                            </div>

                            <div style={{width:'215px',height:'90px',border:'1px solid red',borderRadius:'6px'}}>
                        
                            </div>
                        
                        </div>
                        </div>
                        <hr/>
                     
                              <span style={{fontSize:'22px',paddingLeft:'5px',color:'#00629B'}}><i className="fas fa-notes-medical"></i></span> <span style={{color:'#444444',fontSize:'22px',fontWeight:700}}>Health Info</span>
                         <div style={{display:'flex',paddingLeft:'5px',marginTop:'-5px'}} className='alrt_history'>
                                <div style={{width:'290px'}}>
                                <p>Temperature Front (°C) : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.tempf.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'14px'}}><i className="fas fa-plus-circle"></i></span></p>
                                <p>Temperature Back (°C) : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.tempb.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'22px'}}><i className="fas fa-plus-circle"></i></span></p>
                                </div>

                                <div style={{width:'290px',marginLeft:'13%'}}>
                                <p>Humidity Front (RH) : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.humidityf.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'16px'}}><i className="fas fa-plus-circle"></i></span></p>
                                <p>Humidity Back (RH) : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.humidityb.toFixed(2)}</span> <span style={{color:'#00629B',marginLeft:'22px'}}><i className="fas fa-plus-circle"></i></span></p>
                                </div>
                        </div>
                        <hr style={{marginTop:'-2px'}}/>

                        <span style={{fontSize:'22px',paddingLeft:'5px',color:'#00629B'}}><i className="fas fa-info-square"></i></span> <span style={{color:'#444444',fontSize:'22px',fontWeight:700}}>Basic Info</span>
                        <div style={{display:'flex',paddingLeft:'5px',marginTop:'-5px'}} className='alrt_history'>
                               <div style={{width:'290px'}}>
                               <p>Data Center : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.datacenter}</span></p>
                               <p>Manufacturer :<span style={{color:'#00629B',fontWeight:500}}>{jsonData1.manufacturer}</span></p>
                               </div>

                               <div style={{width:'290px',marginLeft:'13%'}}>
                               <p>Address : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.location}</span></p>
                               <p>Supplier : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.supplier}</span></p>
                               </div>
                       </div>
                       <hr style={{marginTop:'-2px'}}/>
                       <span style={{fontSize:'22px',paddingLeft:'5px',color:'#00629B'}}><i className="fas fa-user-cog"></i></span> <span style={{color:'#444444',fontSize:'22px',fontWeight:700}}>Maintenance  Info</span>
                       <div style={{display:'flex',paddingLeft:'5px',marginTop:'-5px'}} className='alrt_history'>
                              <div style={{width:'290px'}}>
                              <p>Maintenance  Life Cycle : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.maintenancecycle}</span></p>
                              <p>Maintenance  Contact : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.maintenancecontact}</span></p>
                              </div>

                              <div style={{width:'290px',marginLeft:'13%'}}>
                              <p>Last Maintenance  Staff : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.lastmaintenancestaff}</span></p>
                              <p>Next Maintenance  Staff : <span style={{color:'#00629B',fontWeight:500}}>{jsonData1.nextmaintenance}</span></p>
                              </div>
                      </div>
                    </div>
                  
                </div>
            </div>
        )
    }
}
