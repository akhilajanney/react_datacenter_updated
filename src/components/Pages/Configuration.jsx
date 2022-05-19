import React, { Component } from 'react'
import Assetreg from './Assetreg'
import Master from './Master'
import Rackreg from './Rackreg'
import Slave from './Slave';
import Uploadmap from './Uploadmap';
import $ from 'jquery'
import styles from './styles.css'

export default class Congiguration extends Component {
  optionList = [false,false,false,false,false,];
  constructor() {
      super();
      this.state = {
          flag: false
      }
  }

  componentDidMount() {
      this.setState({flag: true})
      this.optionList[0] = true;
      $("#opt0").css({"background": "#00629B","color":"white"});
  }
  changeMenu = (e) => {
      $("#opt0").css({"background": "none","color":"#000000bd"});
      $("#opt1").css({"background": "none","color":"#000000bd"});
      $("#opt2").css({"background": "none","color":"#000000bd"});
      $("#opt3").css({"background": "none","color":"#000000bd"});
      $("#opt4").css({"background": "none","color":"#000000bd"});
      this.setState({flag: true})
      this.optionList = [false,false,false,false,false,]
      let id = parseInt(e.target.id.substring(3))
      console.log('options', e.target.id, '--', id);
      $("#" + e.target.id).css({"background": "#00629B","color":"white"});
      this.optionList[id] = true;
  }
  render() {
    return (
      <div>
         <div style={
                    {
                      float: "right", width: "95%", background:'#E5EEF0',height:'100vh',marginLeft:'60px'
                    }
                }>
                    <div style={
                        {marginTop: '30px',marginLeft:'60px',}}>
                        <span className='main_header'>REGISTRATION</span>

                        <div className='underline'></div>

                    <div style={
                        {
                            marginLeft: '40px',
                            marginTop: '40px',
                            // display: 'flex'
                        }
                    }>
                        <div className='config_menu'
                           >
                            <div  onClick={this.changeMenu}className='config_btn' id="opt0">Upload FloorMap</div>
                            <div onClick={this.changeMenu} className='config_btn' id="opt1">Master Gateway</div>
                            <div  onClick={this.changeMenu}className='config_btn' id="opt2">Slave Gateway</div>
                            
                            <div  onClick={this.changeMenu}className='config_btn' id="opt4">Rack Monitor</div>
                            <div  onClick={this.changeMenu} className='config_btn' id="opt3">Asset Tag</div>
                        </div>
                        
                        <div style={{width:'85%',padding:'5px',marginTop:'10px'}}>
                         {
                            this.optionList[0] && (
                                <Uploadmap/>)
                        }
                            {
                            this.optionList[1] && (
                                <Master/>)
                        }
                            {
                            this.optionList[2] && (
                                <Slave/>)
                        }
                         {
                            this.optionList[3] && (
                                <Assetreg/>)
                        }
                           {
                            this.optionList[4] && (
                                <Rackreg/>)
                        }
                       
                        </div>
                    </div>
                    </div>
                </div>
      </div>
    )
  }
}
