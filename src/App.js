import React from 'react';
import './App.css';
import Logo from './loyolaPicture.png'




export class App extends React.Component{
  render(){
    return(
      <div id = "header">
        
       
        <h1 className= 'siteTitle'> LUC Course Evaluation Web-App </h1>
        <img id = "luc-img" src = {'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQrmV8I7SnC92JrArc6JUQVoB9_OXjbBWWs0w&usqp=CAU'} />
      
      </div>



    )
  }
}