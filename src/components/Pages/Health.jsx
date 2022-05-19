import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery'
import { master_register, slave_register,assettag_det } from '../urls/api';

export default class Health extends Component {
   constructor(){
      super();
      this.state={
         message:'',
         error:false,
         success:true
      }
   }
  componentDidMount(){
     this.healthType();
     this.interval=setInterval(this.healthType,5000)
  }
 
  healthType=()=>{
     let value= $("#healthtype").val();
     console.log(value);
     if($("#healthtype").val()==='Master'){
         $("#master_table").show();
         $("#slave_table").hide();
         $("#asset_health").hide();
         axios({ method: "GET", url: master_register})
     .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.length !== 0 && response.status === 200) {
           $("#master_table tbody").empty();
           for (let i = 0; i < data.length; i++) {
              let status = 'red';
              if ((new Date() - new Date(data[i].lastseen)) <= (2 * 60 * 1000)) {
                 status = "green";
              }

              $("#master_table ").append(
                 "<tr>" +
                 "<td>" + (i + 1) + "</td>" +
                 "<td>" + data[i].gatewayid + "</td>" +
                 "<td>" + data[i].floor.name + "</td>" +
                 "<td>" + data[i].lastseen.replace("T", " ").substr(0, 19) + "</td>" +
                 "<td>" +
                 "<div style = 'margin:auto;width:12px;height: 12px;border-radius:12px;background-color:" + status + "'></div>" + "</td > " +
                 "</tr>"
              )
           }
        } else {
           this.setState({
              error: true,
              message: "No data found for Master Gateway.",
           });
        }
     })
    
     .catch((error) => {
        if(error.response.status===404){
          this.setState({error:true,message:'No Health Data Found For Master'})
        }
     })
     }
     else if($("#healthtype").val()==='Slave'){
      $("#master_table").hide();
      $("#slave_table").show();
      $("#asset_health").hide();
      axios({ method: "GET", url: slave_register })
      .then((response) => {
         const data = response.data;
         console.log('=====>', data);
         if (data.length !== 0 && response.status === 200) {
            for (let i = 0; i < data.length; i++) {
               let status = 'red';
               if ((new Date() - new Date(data[i].lastseen)) <= (2 * 60 * 1000)) {
                  status = "green";
               }
               $("#slave_table").append(
                  "<tr>" +
                  "<td>" + (i + 1) + "</td>" +
                  "<td>" + data[i].gatewayid + "</td>" +
                  "<td>" + data[i].master.floor.name + "</td>" +
                  "<td>" + data[i].master.gatewayid + "</td>" +
                  "<td>" + data[i].lastseen.replace("T", " ").substr(0, 19) + "</td>" +
                  "<td>" +
                  "<div style = 'margin:auto;width:12px;height: 12px;border-radius:12px;background-color:" + status + "'></div></td> " +
                  "</tr>"
               )
            }
         } else {
            this.setState({
               error: true,
               message: "No Health Data found for Slave Gateway.",
            });
         }
      })
      .catch((error) => {
         console.log('Health Slave gate Error====', error);
         if (error.response.status === 403) {
            this.setState({
               error: true,
               message: "User Session has timed out. Please login again.",
            });
            // this.timeout = setTimeout(() => {
            //    localStorage.setItem("isLogged", "failed");
            //    window.location.pathname = "/"
            // }, 1000 * 2)
         } else {
            this.setState({ error: true, message: "Request Failed." });
         }
      })
     }
     else if($("#healthtype").val()==='Asset'){
      $("#master_table").hide();
      $("#slave_table").hide();
      $("#asset_health").show();
      axios({ method: "GET", url: assettag_det})
         .then((response) => {
            const data = response.data;
            console.log('=====>', response);
            if (data.length !== 0 && response.status === 200) {
               $("#assets_health").empty();
               for (let i = 0; i < data.length; i++) {
                  let status = 'red';
                  if ((new Date() - new Date(data[i].lastseen)) <= (2 * 60 * 1000)) {
                     status = "green";
                  }
                  $("#asset_health tbody").append(
                     "<tr>" +
                     "<td>" + (i + 1) + "</td>" +
                     "<td>" + data[i].tagid + "</td>" +
                     "<td>" + data[i].battery + "</td>" +
                     "<td>" + data[i].lastseen.replace("T", " ").substr(0, 19) + "</td>" +
                     "<td>" +
                     "<div style = 'margin:auto;width:12px;height: 12px;border-radius:12px;background-color:" + status + "'></div>" + "</td> " +
                     "</tr>"
                  )
               }
            } else {
               this.setState({
                  error: true,
                  message: "No Health Data Found For Assets.",
               });
            }
         })
         .catch((error) => {
            console.log('Health assests tag gate Error====', error);
            if (error.response.status === 403) {
               this.setState({
                  error: true,
                  message: "User Session has timed out. Please login again.",
               });
               // this.timeout = setTimeout(() => {
               //    localStorage.setItem("isLogged", "failed");
               //    window.location.pathname = "/"
               // }, 1000 * 2)
            } else {
               this.setState({ error: true, message: "Request Failed." });
            }
         })
     }
  }

  componentWillUnmount(){
   clearInterval(this.interval)
}

  render() {
   const{error,message,success}=this.state
    return (
      <div style={
        {
          float: "right", width: "95%", background:'#E5EEF0',height:'100vh',marginLeft:'60px'
        }}>
           <div style={
                        {marginTop: '30px',marginLeft:'60px',}}>
                        <span className='main_header'>SYSTEM HEALTH</span>

                        <div className='underline'></div>

                        {error && (
            <div style={{ color: 'red',marginBottom:'20px',marginTop:'30px' }}>
              <strong>{message}</strong>
            </div>
          )}

          {success && (
            <div style={{ color: 'green',marginBottom:'20px',marginTop:'30px' }}>
              <strong>{message}</strong>
            </div>
          )}

                        <div className="inputdiv" style={{marginTop:'20px'}} >
                            <span className="label" >Health:</span>
                            <select name="healthtype" id="healthtype" required="required" onChange={this.healthType}>
                                <option >Master</option>
                                <option>Slave</option>
                                <option>Asset</option>

                            </select>
                        </div>
             <table id="master_table" style={{display:'none'}}>
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>MASTER ID</th>
                        <th>FLOOR NAME</th>
                        <th>LAST SEEN</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>
                  <tbody></tbody>
               </table>

               <table  id="slave_table" style={{display:'none'}}>
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>SLAVE ID</th>
                        <th>FLOOR NAME</th>
                        <th>MASTER GATEWAY ID</th>
                        <th>LAST SEEN</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>

                  <tbody></tbody>
               </table>

               <table  id="asset_health" style={{display:'none'}}>
                  <thead>
                     <tr>
                        <th>S.NO</th>
                        <th>ASSET MAC ID</th>
                        <th>BATTERY STATUS(%)</th>
                        <th>LAST SEEN</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>
                  <tbody></tbody>
               </table>
           </div>

      </div>
    )
  }
}
