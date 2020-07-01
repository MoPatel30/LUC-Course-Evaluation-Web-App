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
          <ul>
            <li className='dropdown'>
              <a href='./App.js' className = 'courseHead' >Courses</a>
              <div className="dropdown-content">
                <a href="#">Subject 1</a>
                <a href="#">Subject 2</a>
                <a href="#">Subject 3</a>
              </div>
            </li>
            <li><a href='./App.js' className="profHead">Professors</a></li>
            <li><a href='./App.js' className="contactHead">Contact</a></li>
          </ul>
        </div>
      
      
      
      
      </div>

    









    )
  }
}