import React, { Component } from 'react'
import axios from 'axios';
import $ from 'jquery'
import { upload_floormap,asset_rack_det,assettag_det} from '../urls/api';



export default class Assetdetail extends Component {
   optionList = [false,false];
  constructor(){
    super();
    this.state={
       message:'',
       error:false,
       success:true,
       flag: false
    }
 }


 assetTags = () => {
   $("#opt0").css({"background": "#00629B","color":"white"});
   $("#opt1").css({"background": "none","color":"#000000bd"});
   $('#assettag').show();
   $('#rackmonitor').hide(); 
 }
 rackDetail = () => {
   $('#rackmonitor').show();
   $('#assettag').hide();
     $("#opt1").css({"background": "#00629B","color":"white"});
     $("#opt0").css({"background": "none","color":"#000000bd"}); 
 }
   
  componentDidMount(){
  
   $("#opt0").css({"background": "#00629B","color":"white"});
    axios({ method: "GET", url: upload_floormap})
    .then((response) => {
    
       if (response.status === 200 && response.data.length !== 0) {
          for (let i = 0; i < response.data.length; i++) {
             $("#fname").append(
                "<option value=" +
                response.data[i].id +
                ">" +
                response.data[i].name +
                "</option>"
             );
          }
          this.getRackDetails();
          this.interval = setInterval(this.getRackDetails, 15 * 1000)
          this.assetTagDetails();
          this.interval = setInterval(this.assetTagDetails, 15 * 1000)
       } else {
          this.setState({
             success: false,
             error: true,
             message: "No floor Map Details Found.",
          });
       }
    })
    .catch((error) => {
       // console.log(error);
       if (error.response.status === 403) {
          this.setState({
             success: false,
             error: true,
             message: "User session had timed out. Please login again.",
          });
       } 
       else {
          this.setState({
             success: false,
             error: true,
             message: "Error occurred. Please try again.",
          });
       }
    });
  }


  getRackDetails = () => {
    this.setState({ error: false, message:"" })
    axios({
       method: "GET",
       url: asset_rack_det + $("#fname").val(),
    })
       .then((response) => {
          console.log('===getRackDetails====',response);
          if (response.status === 200 && response.data.length !== 0) {
             let data = response.data;
             $("#rack_details_table ").empty();
             for (let i = 0; i < data.length; i++) {
                $("#rack_details_table").append(
                   "<tr><td>" +
                   (i + 1) +
                   "</td><td>" +
                   data[i].macid +
                   "</td><td>" +
                   data[i].capacity +
                   "</td></tr>"
                );
             }
          } else {
             $("#rack_details_table ").empty();
             this.setState({
                error: true,
                success: false,
                message:
                   "No rack is Registered For The Floor. Please Select Some Other Floor.",
             });
          }
       })
       .catch((error) => {
          // console.log(error);
          if (error.response.status === 403) {
             this.setState({
                success: false,
                error: true,
                message: "User session had timed out. Please login again.",
             });
            //  this.timeout = setTimeout(() => {
            //     localStorage.setItem("isLogged", "failed");
            //     window.location.pathname = "/"
            //  }, 1000 * 2)
          } else if (error.response.status === 400) {
             this.setState({
                success: false,
                error: true,
                message: "Request Failed.",
             });
          }
          else if (error.response.status === 404) {
            this.setState({
               success: false,
               error: true,
               message: "No Data Found.",
            });
         }  else {
             this.setState({
                success: false,
                error: true,
                message: "Error occurred. Please try again.",
             });
          }
       });
 }

 assetTagDetails = () => {
   console.log('assetTagDetails=========');
   axios({ method: "GET", url: assettag_det })
      .then((response) => {
         console.log(response);
         if (response.status === 200 && response.data.length !== 0) {
            let data = response.data;
            $("#asset_details_table tbody").empty();
            for (let i = 0; i < data.length; i++) {
               let status = "red";
               if (new Date() - new Date(data[i].lastseen) <= 2 * 60 * 1000) {
                  status = "green";
               }
               $("#asset_details_table tbody").append(
                  "<tr><td>" +
                  (i + 1) +
                  "</td><td>" +
                  data[i].tagid +
                  "</td><td>" +
                  data[i].rackno.macid +
                  "</td><td>" +
                  data[i].usage +
                  "</td><td>" +
                  data[i].lastseen.replace("T", " ").substr(0, 19) +
                  "</td><td>" +
                  "<div style='margin:auto; width:0px; padding:5px; border-radius:5px; background-color:" +
                  status +
                  ";'></div></td></tr>"
               );
            }
         } else {
            $("#asset_details_table tbody").empty();
            this.setState({
               error: true,
               message: "No data found for MasterGateway.",
            });
         }
      })
      .catch((error) => {
         // console.log(error);
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
      });
} 

  render() {
    const{message,error,success}=this.state
    return (
      <div style={
        {
          float: "right", width: "95%", background:'#E5EEF0',height:'100vh',marginLeft:'60px'
        }}>
           <div style={
                        {marginTop: '30px',marginLeft:'60px',}}>
                        <span className='main_header'>ASSET DETAILS</span>

                        <div className='underline' style={{marginBottom:'30px'}}></div>
                        {error && (
            <div style={{ color: 'red',marginBottom:'20px'}}>
              <strong>{message}</strong>
            </div>
          )}

          {success && (
            <div style={{ color: 'green',marginBottom:'20px'}}>
              <strong>{message}</strong>
            </div>
          )}

          <div style={{display:'flex'}} >
             <div className='assetdet_btn' id='opt0'  onClick={this.assetTags}>
                  Asset Tags
             </div>
             <div className='assetdet_btn' id='opt1'  onClick={this.rackDetail}>
                  Rack Details
             </div>
          </div>

                        <div style={{marginTop:'30px',display:'none'}} id='rackmonitor' >

                        <div className="inputdiv">
                            <span className="label">Floor Name :</span>
                            <select name="fname" id="fname" required="required" onChange={this.getRackDetails} />
                        </div>
      
                        <table >
                          <thead>
                            <tr>
                                <th>S.No</th>
                                <th>RACK ID</th>
                                <th>CAPACITY</th>
                            </tr>
                          </thead>

                          <tbody  id="rack_details_table"></tbody>
                      </table>
                        
                        </div>


                        <div id='assettag'>
                        <table  id="asset_details_table">
                              <thead>
                                 <tr>
                                    <th>S.No</th>
                                    <th>ASSET ID</th>
                                    <th>RACK ID</th>
                                    <th>UNIT USAGE</th>
                                    <th>LAST SEEN</th>
                                    <th>STATUS</th>
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
