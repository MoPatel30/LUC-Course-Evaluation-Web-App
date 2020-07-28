import React from 'react';
import './App.css';
import Logo from '../imgs/loyolaPicture.png';

import '../review/review.css'



export class App extends React.Component{
  render(){
    return(
      <div>
        
       <div className = 'mainHeader'>
         <img id = 'loyolaLogo' src = {Logo} alt='Loyola Logo' />
          <h1 className= 'siteTitle' ><span>LUC Course Evaluator</span> </h1>
      
         
        </div>  

      </div>

    )
  }

}






