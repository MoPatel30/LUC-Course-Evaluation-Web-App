import React from 'react';
import './App.css';
import Logo from './loyolaPicture.png';



export class App extends React.Component{
  render(){
    return(
      <div>
        
       <div className = 'mainHeader'>
         <img id = 'loyolaLogo' src = {Logo} alt='Loyola Logo' />
          <h1 className= 'siteTitle'> LUC Course Evaluation Web-App </h1>
      
          <ul>
            <li className='dropdown'>
              <a href='./App.js' className = 'courseHead' >Courses</a>
                <div className="dropdown-content">
                  <a href="#">Philosophy</a>
                  <a href="#">Biology</a>
                  <a href="#">Psychology</a>
                  <a href="#">Mathematics</a>
                  <a href="#">Data Science</a>
               
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