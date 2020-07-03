import React from 'react';
import './App.css';
import Logo from './loyolaPicture.png';

import {Tester} from './review';
import './review.css'


var temp = [['Kevin',"Phil 274",'Mr. Kant','Thought-provoking class with hard exams.'], ['Zeshan','Chem 101','Mrs. Curie','Interesting Labs. Detailed lab reports required per lab. Easy final.'], ['Mo Patel','Theo 107','Mr. God','Opens up mind to other religions. Changed how I thought about religion in general.'],['Mo larya','COMP 264','Mr. Klingensmith','Super chill class, makes assembly easy, learn linux, git and vim to a good extent.'], ['Michael','Math 163','Mr. Newton','Hard class, lots of material, A lot of integrals and derivatives. Tests are pretty hard. ']]



export class App extends React.Component{
  constructor(){
    super()
    this.state = {
      comp: []

    }
  
  }



  showPhil(event){
    event.preventDefault()
    let bigTemper = <Tester id = "review" student = {temp[0][0]} course = {temp[0][1]} professor = {temp[0][2]} review = {temp[0][3]} />
  
    this.setState ({
      comp: bigTemper
    })

    return

    var bigTemp = this.state.comp
    for(let i = 0; i < temp.length; i++){

      let temper = temp[i][1]
      if((temper.substring(0,4)).localeCompare("Phil") === 0){
        let tempComp = <Tester id = "review" student = {temp[i][0]} course = {temp[i][1]} professor = {temp[i][2]} review = {temp[i][3]} />
        
        bigTemp.push(tempComp)    
      }
    
    }
    
  }



  showChem(event){
    event.preventDefault()
    let bigTemper = <Tester id = "review" student = {temp[1][0]} course = {temp[1][1]} professor = {temp[1][2]} review = {temp[1][3]} />
  
    this.setState ({
      comp: bigTemper
    })

    return

  }



  showTheo(event){
    event.preventDefault()
    let bigTemper = <Tester id = "review" student = {temp[2][0]} course = {temp[2][1]} professor = {temp[2][2]} review = {temp[2][3]} />
  
    this.setState ({
      comp: bigTemper
    })

    return
    
  }



  showCompSci(event){
    event.preventDefault()
    let bigTemper = <Tester id = "review" student = {temp[3][0]} course = {temp[3][1]} professor = {temp[3][2]} review = {temp[3][3]} />
  
    this.setState ({
      comp: bigTemper
    })

    return
    
  }



  showMath(event){
    event.preventDefault()
    let bigTemper = <Tester id = "review" student = {temp[4][0]} course = {temp[4][1]} professor = {temp[4][2]} review = {temp[4][3]} />
  
    this.setState ({
      comp: bigTemper
    })

    return
    
  }



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
                  <a href = "#" onClick = {(event) => this.showPhil(event)}>Philosophy</a>
                  <a href="#" onClick = {(event) => this.showChem(event)}>Chemistry</a>
                  <a href="#" onClick = {(event) => this.showTheo(event)}>Theology</a>
                  <a href="#" onClick = {(event) => this.showCompSci(event)}>Computer Sci</a>
                  <a href="#" onClick = {(event) => this.showMath(event)}>Mathematics</a>
               
                </div>
            </li>
            <li><a href='./App.js' className="profHead">Professors</a></li>
            <li><a href='./App.js' className="contactHead">Contact</a></li>
          </ul>

          <div>
           
            <p>{this.state.comp}</p>   
            

          </div>
         
        </div>

         
       

      </div>



    )
  }
}