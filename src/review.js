import React from 'react';
import ReviewerData from './reviews.json';
import { render } from '@testing-library/react';
import './review.css';


import Popup from "reactjs-popup";
 

import {
    Slider,
    SliderInput,
    SliderTrack,
    SliderTrackHighlight,
    SliderHandle,
    SliderMarker,
  } from "@reach/slider";
  import "@reach/slider/styles.css";



export const people = [
    {
        id: 1,
        student:'Kevin',
        course:"Phil 274",
        professor:'Mr. Kant',
        review:'Thought-provoking class with hard exams.'
    },
    {
        id: 2,
        student:'Zeshan',
        course:'Chem 101',
        professor:'Mrs. Curie',
        review:'Interesting Labs. Detailed lab reports required per lab. Easy final.'
    },
    {
        id: 3,
        student:'Mo Patel',
        course:'Theo 107',
        professor:'Mr. God',
        review:'Opens up mind to other religions. Changed how I thought about religion in general.'
    },
    {
        id: 4,
        student:'Mo larya',
        course:'COMP 264',
        professor:'Mr. Klingensmith',
        review:'Super chill class, makes assembly easy, learn linux, git and vim to a good extent.'
    },
    {
        id: 5,
        student:'Michael',
        course:'Math 163',
        professor:'Mr. Newton',
        review: 'Hard class, lots of material, A lot of integrals and derivatives. Tests are pretty hard. '
    }
]

function searchingFor(term){
    return function(x){
        return x.course.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}
export class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            people: people,
            term: ''
        }
        this.searchHandler = this.searchHandler.bind(this);
    }
    searchHandler(event){
        this.setState({term: event.target.value})
    }
    render() {
        const {term,people} = this.state;
        return (
            <div className='reviewSection'>
                <form>
                    <input  id="searchBar" 
                            type='text'
                            onChange ={this.searchHandler}
                            value={term}
                            placeholder='Search For Course...'
                    />
                </form>
            {
                people.filter(searchingFor(term)).map(person => 
                        <div id= 'review-block-style' key ={person.id}>
                            <p><strong>Student Name: </strong> {person.student}</p>
                            <p><strong>Course: </strong> {person.course}</p>
                            <p><strong>Professor: </strong> {person.professor}</p>
                            <p><strong>Course Review: </strong>{person.review}</p>
                        </div>      
                )
            }
            </div>
        );
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
            difficulty : 0,
            comp: []
        }

    }

    
    showone = (event) => {
        event.preventDefault()
             
    }

    
  
 
    mySubmit = (event) => {
        event.preventDefault()

        if((this.state.student === "") & (this.state.professor === "") & (this.state.course === "") & (this.state.review === "")){
            return
        }
        
        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} number = {this.state.difficulty} /> 
        
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
                                style = {{position: "relative",left: "15px", padding: '4px 5px', left: "212px", top: '10px'}}
                                placeholder = "Student Name (Optional)"
                                type='text' 
                                value = {this.state.student}
                                onChange= {e => this.setState({student: e.target.value})}
                            />
            
                            <br />
                            <input 
                                style = {{position: "relative",left: "15px",padding: '4px 5px', left: "212px", top: '10px'}}
                                placeholder = "Course Name"
                                type='text' 
                                value = {this.state.course}
                                onChange= {e => this.setState({course: e.target.value})}
                            />

                            <br />
                            <input 
                                style = {{position: "relative", left: "15px", padding: '4px 5px', left: "212px", top: '10px'}}
                                placeholder = "Professor Name (Optional)"
                                type='text' 
                                value = {this.state.professor}
                                onChange= {e => this.setState({professor: e.target.value})}
                            />

                            <br />
                            <br />
                            <textarea 
                                style = {{position: "relative", left: "15px", height:'200px', width: '400px', left: "100px"}}
                                placeholder = "Describe your course experience"
                                type='text' 
                                value = {this.state.review}
                                onChange= {e => this.setState({review: e.target.value})}
                            />
                            <br />


                            <Slider name = "difficulty-level" min={0} max={10} defaultValue = {5} style = {{position: 'relative', left: "125px"}} />

                            <Slider name = "ovr-experience" min={0} max={10} defaultValue = {5} style = {{position: 'relative', left: "125px", bottom: '15px'}} />

                            <button id = 'submitButton' type="submit" onclick={e => this.showone(e)}>Submit</button>
                        </form>
                    </div>
                </div>

     
                

                <p style = {{position: 'relative', top: '150px'}}>{this.state.comp}</p>
                     
            </div>
            
        )
    }


}














export class PopUp extends React.Component{
    constructor(){
        super()
        this.state = {
            student : null,
            course : null,
            professor : null,
            review : null,
            difficulty : 0,
            comp: []
        }

    }

    
    showone = (event) => {
        event.preventDefault()
             
    }

    
  
 
    mySubmit = (event) => {
        event.preventDefault()

        if((this.state.student === "") & (this.state.professor === "") & (this.state.course === "") & (this.state.review === "")){
            return
        }
        
        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} number = {this.state.difficulty} /> 
        
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
                <Popup modal trigger={<div class="button_cont" align="center" style ={{position: "relative", top: "100px"}}><button style = {{width: "200px", height: "75px"}} class="example_c"><b>Review a Course</b></button></div>} position="bottom center">
                <div>
                    <div>
                    
                        <p style = {{fontSize: '1.25rem', fontFamily: "Open Sans Condensed", textAlign: "center"}}><u>Course Review Form</u></p>
                        <form className ='submissionForm' onSubmit={this.mySubmit}>
                            <input
                                style = {{position: "relative",left: "15px", border: "2px solid #434343", padding: '4px 5px', left: "282px", top: '10px'}}
                                placeholder = "Student Name (Optional)"
                                type='text' 
                                value = {this.state.student}
                                onChange= {e => this.setState({student: e.target.value})}
                            />
            
                            <br />
                            <input 
                                style = {{position: "relative",left: "15px", border: "2px solid #434343", padding: '4px 5px', left: "282px", top: '10px'}}
                                placeholder = "Course Name"
                                type='text' 
                                value = {this.state.course}
                                onChange= {e => this.setState({course: e.target.value})}
                            />

                            <br />
                            <input 
                                style = {{position: "relative", left: "15px", border: "2px solid #434343", padding: '4px 5px', left: "282px", top: '10px'}}
                                placeholder = "Professor Name (Optional)"
                                type='text' 
                                value = {this.state.professor}
                                onChange= {e => this.setState({professor: e.target.value})}
                            />

                            <br />
                            <br />
                            <textarea 
                                style = {{position: "relative", left: "172px", border: "2px solid #434343", height:'200px', width: '400px'}}
                                placeholder = "Describe your course experience"
                                type='text' 
                                value = {this.state.review}
                                onChange= {e => this.setState({review: e.target.value})}
                            />
                            <br />


                            <Slider name = "difficulty-level" min={0} max={10} defaultValue = {5} style = {{position: 'relative', left: "200px"}} />

                            <Slider name = "ovr-experience" min={0} max={10} defaultValue = {5} style = {{position: 'relative', left: "200px", bottom: '15px'}} />

            
                            <div class="button_cont" align="center"><button style = {{position: "relative",top: "-15px", width: "175px", height: "75px"}} class="example_c"  type="submit" onclick={e => this.showone(e)}><b>Submit Review</b></button></div>
                        </form>
                    
                    </div>

                </div>
                </Popup>

                <h1 style = {{fontFamily: "Open Sans Condensed", color: "whitesmoke", fontSize: "2rem", textAlign: "center", position: "relative", top: '125px'}}><u>Recent Student Reviews</u></h1>
                
                <p style = {{position: 'relative', top: '150px'}}>{this.state.comp}</p>
                
            </div>
        )
    }

}











