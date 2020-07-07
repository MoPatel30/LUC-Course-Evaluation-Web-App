import React from 'react';
import ReviewerData from './reviews.json';
import { render } from '@testing-library/react';
import './review.css';


import Popup from "reactjs-popup";
 


export var people = [
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
            term: '',
            course: '',
            tester: ''
        }
        this.searchHandler = this.searchHandler.bind(this);
    }


    searchHandler(event){
        this.setState({term: event.target.value})
    }



    showClass(event, course){
        event.preventDefault()
        this.setState({
            course: course
        })
    }

    operation(event){
        event.preventDefault()
        this.setState({
            tester: ""
        })
    }



    render() {
        const {term,people} = this.state;
        var selectedCourse = []
        if(this.state.course !== ""){
        selectedCourse = []

        for(let i = 0; i < people.length; i++){
            if(people[i]["course"] === this.state.course){
                selectedCourse.unshift(people[i])
            }
        }
        }
        else{
            selectedCourse = people
        }

        return (
            <div>
                <form>
                    <input  id="searchBar" 
                            type='text'
                            onChange ={this.searchHandler}
                            value={term}
                            placeholder='Search For Course...'
                    />
                </form>
            
                <div className='reviewSection'>


           
            {
            /*  
            people.filter(searchingFor(term)).map(people => 
                <div className = "course-comp" value = {people.course} id = {people.course} onClick = {(event) => this.showClass(event, document.getElementById(people.course).value)}>
                    <h1>{people.course} </h1>
                    <h5>Difficulty Rating: 7/10</h5>
                    <h5>Average Score: 4.4/5.0</h5>

                </div>  
                      
                )
            
            */ 
            }
            

          
                
            {
               
               selectedCourse.filter(searchingFor(term)).map(selectedCourse => 
                    <div id= 'review-block-style' key ={selectedCourse.id} onClick = {(event) => this.operation(event)}>
                        <p><strong>Student Name: </strong> {selectedCourse.student}</p>
                        <p><strong>Course: </strong> {selectedCourse.course}</p>
                        <p><strong>Professor: </strong> {selectedCourse.professor}</p>
                        <p><strong>Course Review: </strong>{selectedCourse.review}</p>
                    </div>   
                      
                )
            
                
            }
                </div>
                    <div style = {{display: "inline-flex", width: "100px"}}>
                        <button style = {{width: "200px", height: "75px"}} class="example_c" id = "chem101" value = "Chem 101" onClick = {(event) => this.showClass(event, document.getElementById("chem101").value)}><b>Chem 101</b></button>
                        <button style = {{width: "200px", height: "75px"}} class="example_c" id = "math163" value = "Math 163" onClick = {(event) => this.showClass(event, document.getElementById("math163").value)}><b>Math 163</b></button>
                        <button style = {{width: "200px", height: "75px"}} class="example_c" id = "phil274" value = "Phil 274" onClick = {(event) => this.showClass(event, document.getElementById("phil274").value)}><b>Phil 274</b></button>
                        <button style = {{width: "200px", height: "75px"}} class="example_c" id = "theo107" value = "Theo 107" onClick = {(event) => this.showClass(event, document.getElementById("theo107").value)}><b>Theo 107</b></button>
                        <button style = {{width: "200px", height: "75px"}} class="example_c" id = "comp264" value = "COMP 264" onClick = {(event) => this.showClass(event, document.getElementById("comp264").value)}><b>Comp 264</b></button>
                        <button style = {{width: "200px", height: "75px"}} class="example_c" id = "allreviews" value = "" onClick = {(event) => this.showClass(event, document.getElementById("allreviews").value)}><b>All Courses</b></button>
                    </div>

                    
                      

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
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Overall Class Experience: </b> {this.props.number}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Would you recommend taking this course?: </b> {this.props.recommend}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Textbook/3rd party platform usage: </b> {this.props.textbook}</p>
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
                                style = {{position: "relative", padding: '4px 5px', left: "212px", top: '10px'}}
                                placeholder = "Student Name (Optional)"
                                type='text' 
                                value = {this.state.student}
                                onChange= {e => this.setState({student: e.target.value})}
                            />
            
                            <br />
                            <input 
                                style = {{position: "relative",padding: '4px 5px', left: "212px", top: '10px'}}
                                placeholder = "Course Name"
                                type='text' 
                                value = {this.state.course}
                                onChange= {e => this.setState({course: e.target.value})}
                            />

                            <br />
                            <input 
                                style = {{position: "relative", padding: '4px 5px', left: "212px", top: '10px'}}
                                placeholder = "Professor Name (Optional)"
                                type='text' 
                                value = {this.state.professor}
                                onChange= {e => this.setState({professor: e.target.value})}
                            />

                            <br />
                            <br />
                            <textarea 
                                style = {{position: "relative", height:'200px', width: '400px', left: "100px"}}
                                placeholder = "Describe your course experience"
                                type='text' 
                                value = {this.state.review}
                                onChange= {e => this.setState({review: e.target.value})}
                            />
                            <br />

                

                            

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
        let recommend = document.getElementById("rec-drop").value
        let textbook = document.getElementById("textbook-drop").value


        
        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} number = {this.state.difficulty} recommend = {recommend} textbook = {textbook} /> 
        
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
                                style = {{position: "relative",border: "2px solid #434343", padding: '4px 5px', left: "282px", top: '10px'}}
                                placeholder = "Student Name (Optional)"
                                type='text' 
                                value = {this.state.student}
                                onChange= {e => this.setState({student: e.target.value})}
                            />
            
                            <br />
                            <input 
                                style = {{position: "relative",border: "2px solid #434343", padding: '4px 5px', left: "282px", top: '10px'}}
                                placeholder = "Course Name"
                                type='text' 
                                value = {this.state.course}
                                onChange= {e => this.setState({course: e.target.value})}
                            />

                            <br />
                            <input 
                                style = {{position: "relative",border: "2px solid #434343", padding: '4px 5px', left: "282px", top: '10px'}}
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

                            <p id = "question-text">Would you recommend taking this course?</p>
                            <select id = "rec-drop" class = "select">
                                <option value = 'No Response'>Select</option>
                                <option value = 'Yes'>Yes</option>
                                <option value = "No">No</option>
                            </select>


                            <p id = "question-text">Textbook/3rd party platform usage?</p>
                            <select id = "textbook-drop" class = "select">
                                <option value = 'No Response'>Select</option>
                                <option value = 'Yes'>Yes</option>
                                <option value = "No">No</option>
                            </select>




                           
            
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











