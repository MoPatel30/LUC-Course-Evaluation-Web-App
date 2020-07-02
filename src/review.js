import React from 'react';
import ReviewerData from './reviews.json';
import { render } from '@testing-library/react';
import './review.css';

import {
    Slider,
    SliderInput,
    SliderTrack,
    SliderTrackHighlight,
    SliderHandle,
    SliderMarker,
  } from "@reach/slider";
  import "@reach/slider/styles.css";



export var temp = [['Kevin',"Phil 274",'Mr. Kant','Thought-provoking class with hard exams.'], ['Zeshan','Chem 101','Mrs. Curie','Interesting Labs. Detailed lab reports required per lab. Easy final.'], ['Mo Patel','Theo 107','Mr. God','Opens up mind to other religions. Changed how I thought about religion in general.'],['Mo larya','COMP 264','Mr. Klingensmith','Super chill class, makes assembly easy, learn linux, git and vim to a good extent.'], ['Michael','Math 163','Mr. Newton','Hard class, lots of material, A lot of integrals and derivatives. Tests are pretty hard. ']]


export class Test extends React.Component{
    constructor(){
        super()
        this.state = {
            comps: []
        }
    }

    render(){
        for(let idx = 0; idx < temp.length; idx++){    
            let student = temp[idx][0]
            let course = temp[idx][1]
            let professor = temp[idx][2]
            let review = temp[idx][3]

            let temp2 = [student, course, professor, review]

            let compOne = <Tester id = "review" student = {temp2[0]} course = {temp2[1]} professor = {temp2[2]} review = {temp2[3]} />
            var temp3 = this.state.comps
            temp3.push(compOne)

            

        }
     
      
    

       
        return(
           
            <div>
             
                <p style = {{fontFamily: "Open Sans Condensed", fontSize: "1rem", position: "relative", top: "150px"}}>{this.state.comps}</p>
             
            
                

            </div>
        )
    }
}




export class Tester extends React.Component{
    render(){    
        return(
            <div id = "review-block-style">
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Student Name: </b> {this.props.student}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Course Name: </b> {this.props.course}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Professor Name: </b> {this.props.professor}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Course Review: </b> {this.props.review}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Class Difficulty: </b> {this.props.number}</p>

            </div>
        )
        
    }
}




export class GiveReview extends React.Component{
    constructor(){
        super()
        this.state = {
            student : null,
            course : null,
            professor : null,
            review : null,
            number : null,
            comp: []
        }

 

    }

    
    showone = (event) => {
        event.preventDefault()
             
    }


 


    mySubmit = (event) => {
        event.preventDefault()
        this.setState({
            number: (document.getElementsByName('slider')).value
        })
        if((this.state.student === "") & (this.state.professor === "") & (this.state.course === "") & (this.state.review === "")){
            return
        }
        
        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} number = {this.state.number} /> 
        
        //this.state.comp.push(currentReview)
        this.state.comp.unshift(currentReview)

        this.setState({
            student: '',
            professor: '',
            course: '',
            review: '',
            number: ''
        })

        return
    

    }

    render(){
        return(
            <div>
                   
                <div>
                    <div id = "review-form">
                        <p style = {{fontSize: '1.25rem', fontFamily: "Open Sans Condensed", textAlign: "center"}}><u>Course Review Form</u></p>
                        <form className ='submissionForm' onSubmit={this.mySubmit}>
                            <input 
                                style = {{position: "relative",left: "15px", padding: '4px 5px'}}
                                placeholder = "Student Name (Optional)"
                                type='text' 
                                value = {this.state.student}
                                onChange= {e => this.setState({student: e.target.value})}
                            />
            
                            <br />
                            <input 
                                style = {{position: "relative", left: "15px",padding: '4px 5px'}}
                                placeholder = "Course Name"
                                type='text' 
                                value = {this.state.course}
                                onChange= {e => this.setState({course: e.target.value})}
                            />

                            <br />
                            <input 
                                style = {{position: "relative", left: "15px", padding: '4px 5px'}}
                                placeholder = "Professor Name (Optional)"
                                type='text' 
                                value = {this.state.professor}
                                onChange= {e => this.setState({professor: e.target.value})}
                            />

                            <br />
                            <br />
                            <textarea 
                                style = {{position: "relative", left: "15px", height:'200px', width: '400px'}}
                                placeholder = "Course Review"
                                type='text' 
                                value = {this.state.review}
                                onChange= {e => this.setState({review: e.target.value})}
                            />
                            <br />



                            <Slider name = "slider" min={0} max={10} defaultValue = {5} />
                          
                            
                            <div>
                                <SliderInput>
                                <SliderTrack>
                                <SliderTrackHighlight />
                                <SliderMarker value={50} />
                                <SliderHandle />
                                </SliderTrack>
                                </SliderInput>
                            </div>

                            <button id = 'submitButton' type="submit" onclick={e => this.showone(e)}>Submit</button>
                        </form>
                    </div>
                </div>
                

                <p style = {{position: 'relative', top: '150px'}}>{this.state.comp}</p>
                
              
                
       
         


            </div>
            
        )
    }


}













