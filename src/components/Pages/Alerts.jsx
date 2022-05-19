import React, { Component } from 'react'
import { alerts_det } from '../urls/api';
import axios from 'axios';
import $ from 'jquery'

export default class Alerts extends Component {
 constructor(){
   super();
   this.state={
    message: "",
    error: false,
    success:false
   }
 }
  componentDidMount(){
    axios({ method: "GET", url: alerts_det })
    .then((response) => {
       console.log(response);
       if (response.status === 200 && response.data.length !== 0) {
          let data = response.data;
          $("#alerts_table ").empty();
          let count = 1;
          for (let i = data.length - 1; i >= 0; i--) {
             $("#alerts_table ").append(
                "<tr><td>" +
                count +
                "</td><td>" +
                data[i].macid.tagid +
                "</td><td>" +
                data[i].value +
                "</td><td>" +
                data[i].lastseen.replace("T", " ").substr(0, 19) +
                "</td></tr>"
             );
             count = count + 1;
          }
       } else {
          $("#alerts_table ").empty();
          this.setState({
             error: true,
             message: "No Alert Data Found.",
          });
       }
    })
    .catch((error) => {
       console.log(error);
       if (error.response.status === 403) {
          this.setState({
             error: true,
             message: "User session had timed out. Please login again.",
          });
       } 
       else if (error.response.status === 404) {
        this.setState({
           error: true,
           message: "No Alert Data Found.",
        });
     } else if (error.response.status === 400) {
          this.setState({
             error: true,
             message: "Request Failed.",
          });
       } else {
          this.setState({
             error: true,
             message: "Error occurred. Please try again.",
          });
       }
    });
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout);
 };

  render() {
    const{error,message,success}=this.state
    return (
      <div style={
        {
          float: "right", width: "95%", background:'#E5EEF0',height:'100vh',marginLeft:'60px'
        }}>
           <div style={
                        {marginTop: '30px',marginLeft:'60px',}}>
                        <span className='main_header'>ALERTS</span>

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
         <div style={{marginTop:'30px'}}>

               <table  id="alerts_table">
                  <thead>
                        <tr>
                           <th>S.No</th>
                           <th>ASSET MAC ID</th>
                           <th>TYPE</th>
                           <th>LAST SEEN</th>
                        </tr>
                  </thead>
                  <tbody></tbody>
               </table>
               </div>
                       
           </div>

      </div>
    )
  }
}
