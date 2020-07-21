import React from 'react';
import {Tester} from '../ShowRevs/ShowRevs';
import './Popup.css';

import Popup from "reactjs-popup";



var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

const database = firebase.database()




export class PopUp extends React.Component{
    constructor(){
        super()
        this.state = {
            student : "",
            course : "",
            professor : "",
            review : "",
            syllabus: "",
            difficulty : 5,
            rating: 5,
            comp: [],
         
        }

    }

    
    showone = (event) => {
        event.preventDefault()
             
    }

    updateCount(data){
        let num2 = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/Count")
        
        num2.set(String(data))

    }

    
/*
    checkStatus = (event) => {
        if(this.state.student === ""){
            this.setState({
                student : "Anonymous"
            })
        }
        if(this.state.professor){
            this.setState({
                professor: "Anonymous"
            })
        }
        
        this.mySubmit(event)
    }

*/
  
 
    mySubmit = (event) => {
        event.preventDefault()


        this.setState({
            rating: document.getElementById("customRange2").value
        })
    

       
        let recommend = document.getElementById("rec-drop").value
        let textbook = document.getElementById("textbook-drop").value
        
        console.log(recommend)
        console.log(textbook)

        console.log(this.state.course)
        console.log(this.state.review)



        var errors = []
        if(this.state.course === ""){
            errors.unshift("\n Course Name")
         
        }
        if(this.state.review === ""){
            errors.push("\n Course Review")
         
        }
        
        if(this.state.syllabus === ""){
            errors.push("\n Course Syllabus Breakdown")
         
        }
        if(String(recommend) === "No Response"){
            errors.push("\n Course Recommendation")
         
        }
        if(String(textbook) === "No Response"){
            errors.push("\n Textbook Requirement")
         
        }


        console.log(errors)
        if(errors.length !== 0){
            alert("Missing Fields in Form:" + String(errors))
            return
        }



      

        var num = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/Count")
    
        num.once("value", function(snapshot) {        
            var res = Number(snapshot.val()) + 1
      
            num.set(String(res))
            
        })
        

     
        
 /*
        
        let res = num.once('value', (snap) => {
            let ex = snap.val()
            let ex2 = Object.keys(ex)
            num.set(String(ex2[0].value() + 1))
        })
        */
        let temp3 = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/Course")
        temp3.set((this.state.course).toLowerCase())

        var rand = Math.floor(Math.random() * 100000000000)

        let temp2 = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/" + String(rand))
        
   
   

        temp2.child("Student_Name").set(this.state.student)
        temp2.child("Professor_Name").set(this.state.professor)
        temp2.child("Course_Name").set(this.state.course)

        temp2.child("Course_Review").set(this.state.review)
        
        temp2.child("Course_Syllabus").set(this.state.syllabus)


        temp2.child("Textbook_Usage").set(textbook)
        temp2.child("Course_Recommend").set(recommend)

        temp2.child("Course_Difficulty").set(this.state.difficulty)
        temp2.child("Course_Rating").set(this.state.rating)

       
        
        

/*
        var temp = database.ref("/Test Reviews/" + String(this.state.course) + "/")

        temp.child().ref("student").set(this.state.student)
        temp.child().ref("professor").set(this.state.professor)
        temp.child().ref("course").set(this.state.course)
        temp.child().ref("review").set(this.state.review)


*/
        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} syllabus = {this.state.syllabus} difficulty = {this.state.difficulty} rating = {this.state.rating} recommend = {recommend} textbook = {textbook} /> 
        
        //this.state.comp.push(currentReview)
        this.state.comp.unshift(currentReview)

        this.setState({
            student: '',
            professor: '',
            course: '',
            review: '',
            syllabus: '',
            number: '',
            difficulty: 5,
            rating: 5
        })

        return
    

    }

    render(){
        return(
            <div>
                <Popup modal trigger={<div className="buttonDIV" align="center" id = "popup-pos"><button id = 'rev-btn' className="example_c"><b>Review a Course</b></button></div>} position="bottom center">
                <div id = 'popup-size'>
                    <div>
                    
                        <p style = {{fontSize: '1.25rem', fontFamily: "Open Sans Condensed", textAlign: "center", color: 'white'}}><u>Course Review Form</u></p>
                        <form className ='submissionForm' onSubmit={this.mySubmit}>
                            <input
                                className = "small-field-pos"
                                placeholder = "Student Name (Optional)"
                                type='text' 
                                value = {this.state.student}
                                onChange= {e => this.setState({student: e.target.value})}
                            />
            
                            <br />
                            <input 
                                className = "small-field-pos"
                                placeholder = "Course Name (Phil 274)"
                                type='text' 
                                value = {this.state.course}
                                onChange= {e => this.setState({course: e.target.value})}
                            />

                            <br />
                            <input 
                                className = "small-field-pos"
                                placeholder = "Professor Name (Optional)"
                                type='text' 
                                value = {this.state.professor}
                                onChange= {e => this.setState({professor: e.target.value})}
                            />

                            <br />
                            <br />
                            <textarea 
                                id = "course-review-pos"
                                placeholder = "Describe your course experience"
                                type='text' 
                                value = {this.state.review}
                                onChange= {e => this.setState({review: e.target.value})}
                            />
                            <br />

                            <textarea 
                                id = "course-review-pos"
                                style = {{height: '100px'}}
                                placeholder = "Provide a brief course syllabus breakdown (Number of exams, quizzes, and/or papers, Midterm and Final Exam breakdown, etc.)"
                                type='text' 
                                value = {this.state.syllabus}
                                onChange= {e => this.setState({syllabus: e.target.value})}
                            />
                            <br />

        

                            <div id = "textbook-pos">
                                <p id = "question-text">Textbook/3rd party platform usage?</p>
                                <select id = "textbook-drop" class = "select">
                                    <option value = 'No Response'>Select</option>
                                    <option value = 'Yes'>Yes</option>
                                    <option value = "No">No</option>
                                </select>
                            </div>
                        

                            <div id = "recommend-pos">
                                <p id = "question-text">Would you recommend taking this course?</p>
                                <select id = "rec-drop" class = "select">
                                    <option value = 'No Response'>Select</option>
                                    <option value = 'Yes'>Yes</option>
                                    <option value = "No">No</option>
                                </select>
                            </div>


                            <div id = "difficulty-bar">
                                <label style = {{fontSize: '18px', color: 'white'}} for="customRange2">Course Difficulty Rating: </label>
                                <input type="range" class="custom-range" min="0" max="5" id="customRange" onChange= {e => this.setState({difficulty: e.target.value})}></input>
                                <p id = "difficulty-number">{this.state.difficulty}/5</p>
                            </div>


                            <div id = "rating-bar">
                                <label style = {{fontSize: '18px', color: 'white'}} for="customRange2">Overall Experience Rating: </label>
                                <input type="range" class="custom-range" min="0" max="5" id="customRange2" onChange= {e => this.setState({rating: e.target.value})}></input>
                                <p id = "difficulty-number">{this.state.rating}/5</p>
                            </div>


                            <div class="button_cont" align="center"><button id="submit-pos-size" class="example_c"  type="submit" onclick={e => this.showone(e)}><b>Submit Review</b></button></div>
                       
                        </form>

                    
                    </div>

                </div>
                </Popup>

         
            </div>
        )
    }

}

//<p style = {{position: 'relative', top: '150px'}}>{this.state.comp}</p>
                









