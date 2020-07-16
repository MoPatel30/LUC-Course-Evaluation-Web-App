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
            student : null,
            course : null,
            professor : null,
            review : null,
            difficulty : 10,
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
  
 
    mySubmit = (event) => {
        event.preventDefault()

        this.setState({
            rating: document.getElementById("customRange2").value
        })

        if((this.state.student === "") & (this.state.professor === "") & (this.state.course === "") & (this.state.review === "")){
            return
        }
        let recommend = document.getElementById("rec-drop").value
        let textbook = document.getElementById("textbook-drop").value
        




      

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
        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} difficulty = {this.state.difficulty} rating = {this.state.rating} recommend = {recommend} textbook = {textbook} /> 
        
        //this.state.comp.push(currentReview)
        this.state.comp.unshift(currentReview)

        this.setState({
            student: '',
            professor: '',
            course: '',
            review: '',
            number: '',
            difficulty: 10,
            rating: 5
        })

        return
    

    }

    render(){
        return(
            <div>
                <Popup modal trigger={<div className="buttonDIV" align="center" style ={{position: "relative", top: "100px", left: "645px", width: "200px"}}><button style = {{width: "200px", height: "75px", position: "relative", left: '-400px'}} className="example_c"><b>Review a Course</b></button></div>} position="bottom center">
                <div style = {{height: '800px', backgroundColor: 'lightskyblue'}}>
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
                                placeholder = "Course Name (Phil 274)"
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


                            <div id = "difficulty-bar">
                                <label style = {{fontSize: '18px'}} for="customRange2">Course difficulty Rating: </label>
                                <input type="range" class="custom-range" min="0" max="10" id="customRange" onChange= {e => this.setState({difficulty: e.target.value})}></input>
                                <p style = {{fontSize: '24px', position: 'relative', left: '360px', top: '-55px'}}>{this.state.difficulty}/10</p>
                            </div>


                            <div id = "rating-bar">
                                <label style = {{fontSize: '18px'}} for="customRange2">Overall Experience Rating: </label>
                                <input type="range" class="custom-range" min="0" max="5" id="customRange2" onChange= {e => this.setState({rating: e.target.value})}></input>
                                <p style = {{fontSize: '24px', position: 'relative', left: '360px', top: '-55px'}}>{this.state.rating}/5</p>
                            </div>


                            <div class="button_cont" align="center"><button style = {{position: "relative",top: "10px", width: "175px", height: "75px"}} class="example_c"  type="submit" onclick={e => this.showone(e)}><b>Submit Review</b></button></div>
                       
                        </form>

                    
                    </div>

                </div>
                </Popup>

                <h1 style = {{fontFamily: "Open Sans Condensed", color: "whitesmoke", fontSize: "2rem", textAlign: "center", position: "relative", top: '125px', left: "-400px" }}><u>Recent Student Reviews</u></h1>
              
         
            </div>
        )
    }

}

//<p style = {{position: 'relative', top: '150px'}}>{this.state.comp}</p>
                









