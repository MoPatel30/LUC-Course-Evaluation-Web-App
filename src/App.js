import React from 'react';
import './App.css';
import Logo from './loyolaPic.png'


export class App extends React.Component{
  render(){
    return(
      <div>
        
        <div className = 'topHeader'>
          <img id= 'loyolaLogo' src = {Logo} alt='Loyola Logo' />
          <h1 className='siteTitle'> LUC Course Evaluation Web-App </h1>
        </div>
      
      
      
      
      </div>

    









    )
  }
}