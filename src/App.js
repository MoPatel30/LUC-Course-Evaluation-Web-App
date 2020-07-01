import React from 'react';
import './App.css';
import Logo from './loyolaPicture.png'




export class App extends React.Component{
  render(){
    return(
      <div>
        
        <div className = 'mainHeader'>
          <a href='./App.js'><img id = 'loyolaLogo' src = {Logo} alt='Loyola Logo' /></a>
          <h1 className= 'siteTitle'> LUC Course Evaluation Web-App </h1>
          <div id = 'middleLine'></div>
          <div><a href='./App.js' className = 'courseHead' >Courses</a></div>
          <div><a href='./App.js' className="profHead">Professors</a></div>
          <div><a href='./App.js' className="contactHead">Contact</a></div>
        </div>
      
      
      
      
      </div>

    









    )
  }
}