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
            time:  String((new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + (new Date().getFullYear()))
         
        }

    }

    showForm = () =>  {
        var x = document.getElementById("submissionForm");

        var y = document.getElementById('rev-btn');
        if (x.style.display === "none") {
          x.style.display = "block";
          y.style.display = 'none';
        } else {
          x.style.display = "none";
        }
    }

    hideForm = () =>  {
        var x = document.getElementById("submissionForm");
        var y = document.getElementById('rev-btn');
        if (x.style.display === "block") {
          x.style.display = "none";
          y.style.display = 'block';
        } else {
          x.style.display = "block";
        }
    }

    
    showone = (event) => {
        event.preventDefault()
             
    }

    updateCount(data){
        let num2 = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/Count")
        
        num2.set(String(data))

    }


    

    //This would give the values of the checklist if needed later on
    getCheck = () =>{
        var checks = document.getElementsByName('chk');
        var str = '';

    for ( var i = 0; i < 7; i++) {
        if ( checks[i].checked === true ) {
            str += checks[i].value + ", ";
        }
    }
    
    return str
    } 
 

     checkBoxLimit = () => {
        var checkBoxGroup = document.forms['desc']['chk'];			
        var limit = 3;
        for (var i = 0; i < checkBoxGroup.length; i++) {
            checkBoxGroup[i].onclick = function() {
                var checkedcount = 0;
                for (var i = 0; i < checkBoxGroup.length; i++) {
                    checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
                }
                if (checkedcount > limit) {
                    console.log("You can select maximum of " + limit + " checkboxes.");
                    alert("You can select maximum of " + limit + " checkboxes.");						
                    this.checked = false;
                }
            }
        }
    }



 
    mySubmit = (event) => {
      
       // event.preventDefault()
        


        this.setState({
            rating: document.getElementById("customRange2").value
        })
    

       
        let recommend = document.getElementById("rec-drop").value
        let courseTags = this.getCheck()
        



        var errors = []
        if(this.state.course === ""){
            errors.unshift("\n Course Name")
         
        }
        if(courseTags === ""){
            errors.push("\n Please select up to three course tags further describing the course")
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

        
    


        console.log(errors)
        if(errors.length !== 0){
            event.preventDefault()
            alert("Missing Fields in Form:" + String(errors))
            event.preventDefault()
            return
        }



      

        var num = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/Count")
        var currentCount = 0
        num.once("value", function(snapshot) {        
            var res = Number(snapshot.val()) + 1
            currentCount = String(res)
            num.set(String(res))
            
        })
        console.log(currentCount)
    
        

     
        let temp3 = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/Course")
        temp3.set((this.state.course).toLowerCase())




        // var rand = Math.floor(Math.random() * 100000000000)

        let temp2 = database.ref("/Test Reviews/"  + String(this.state.course).toLowerCase() + "/" + String(currentCount))
        

        if(this.state.student === ""){
            temp2.child("Student_Name").set("Anonymous")
        }
        else{
            temp2.child("Student_Name").set(this.state.student)
        }


        if(this.state.professor === ""){
            temp2.child("Professor_Name").set("Anonymous")        
        }
        else{
            temp2.child("Professor_Name").set(this.state.professor)         
        }
   
      
        temp2.child("Course_Name").set(this.state.course)

        temp2.child("Course_Review").set(this.state.review)
        
        temp2.child("Course_Syllabus").set(this.state.syllabus)


        temp2.child("Course_Tags").set(courseTags)
        temp2.child("Course_Recommend").set(recommend)

        temp2.child("Course_Difficulty").set(this.state.difficulty)
        temp2.child("Course_Rating").set(this.state.rating)

        temp2.child("Submission_Date").set(this.state.time)

    

        let randomNum = Math.floor(Math.random() * 6)

        var forRecents = database.ref("/Recent Reviews/" + String(randomNum))


        if(this.state.student === ""){
            forRecents.child("Student_Name").set("Anonymous")
        }
        else{
            forRecents.child("Student_Name").set(this.state.student)
        }

        
        if(this.state.professor === ""){
            forRecents.child("Professor_Name").set("Anonymous")        
        }
        else{
            forRecents.child("Professor_Name").set(this.state.professor)         
        }


        forRecents.child("Course_Name").set(this.state.course)

        forRecents.child("Course_Review").set(this.state.review)
        
        forRecents.child("Course_Syllabus").set(this.state.syllabus)


        forRecents.child("Course_Tags").set(courseTags)
        forRecents.child("Course_Recommend").set(recommend)

        forRecents.child("Course_Difficulty").set(this.state.difficulty)
        forRecents.child("Course_Rating").set(this.state.rating)

        forRecents.child("Submission_Date").set(this.state.time)


        let currentReview = <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} syllabus = {this.state.syllabus} difficulty = {this.state.difficulty} rating = {this.state.rating} recommend = {recommend} coursetags = {courseTags} date = {this.state.time} /> 

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
            <div style = {{position: 'relative', top: "-215px"}}>
           

                    <div style = {{marginLeft: '10px', marginRight: "25px"}}>
                    
                        <form id ='submissionForm' onSubmit={this.mySubmit}>
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
                                className = "course-review-pos"
                                placeholder = "Describe your course experience"
                                type='text' 
                                value = {this.state.review}
                                onChange= {e => this.setState({review: e.target.value})}
                            />
                            <br />

                            <textarea 
                                className = "course-review-pos"
                                placeholder = "Provide a brief course syllabus breakdown (Number of exams, quizzes, and/or papers, Midterm and Final Exam breakdown, etc.)"
                                type='text' 
                                value = {this.state.syllabus}
                                onChange= {e => this.setState({syllabus: e.target.value})}
                            />
                            <br />

                            <p id = 'courseReviewTitle'><u><em>Course Review Form</em></u></p>
                            <div id= 'questionContainer'>
                                

                            <div id = "recommend-pos">
                                <p id = "question-text">Would you recommend taking this course?</p>
                                <select id = "rec-drop" className = "select">
                                    <option value = 'No Response'>Select</option>
                                    <option value = 'Yes'>Yes</option>
                                    <option value = "No">No</option>
                                </select>
                            </div>


                            <div id = "difficulty-bar">
                                <label style = {{fontSize: '18px', color: 'black'}} for="customRange2">Course Difficulty Rating: </label>
                                <input type="range" className="custom-range" min="0" max="5" id="customRange" onChange= {e => this.setState({difficulty: e.target.value})}></input>
                                <p id = "difficulty-number">{this.state.difficulty}/5</p>
                            </div>


                            <div id = "rating-bar">
                                <label style = {{fontSize: '18px', color: 'black'}} for="customRange2">Overall Experience Rating: </label>
                                <input type="range" className="custom-range" min="0" max="5" id="customRange2" onChange= {e => this.setState({rating: e.target.value})}></input>
                                <p id = "difficulty-number">{this.state.rating}/5</p>
                            </div>
                            </div>


                            <div className="button_cont" align="center"><button id="submit-pos-size" className="example_c"  type="submit" onclick={e => this.showone(e)}><b>Submit Review</b></button></div>
                           
                            <div className='exit-btn'>
                                <i className="fa fa-times" aria-hidden="true" onClick={this.hideForm}></i>
                            </div>

                            <form className = 'container' name ='desc'>

                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value = 'Textbook Required' onClick ={this.checkBoxLimit}/>
                                        <span>Textbook Required</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value= 'Homework Heavy' onClick ={this.checkBoxLimit} />
                                        <span>Homework Heavy</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value = 'Attendance Required' onClick ={this.checkBoxLimit} />
                                        <span>Attendance Required</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value='Test/Quiz Heavy' onClick ={this.checkBoxLimit}/>
                                        <span>Test/Quiz Heavy</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value='Lecture Heavy' onClick ={this.checkBoxLimit}/>
                                        <span>Lecture Heavy</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value='Take Notes' onClick ={this.checkBoxLimit}/>
                                        <span>Take Notes</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value='Participation Matters' onClick ={this.checkBoxLimit}/>
                                        <span>Participation Matters</span>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type = 'checkbox' name="chk" value='Prepare to Read' onClick ={this.checkBoxLimit}/>
                                        <span>Prepare to Read</span>
                                    </label>
                                </div>

                            </form>

                        </form>

                    
                    </div>

                    <div className="buttonDIV" align="center" id = "popup-pos">
                        <button id = 'rev-btn' className="example_c" onClick={this.showForm} ><b>Review a Course</b></button>
                    </div>

         
            </div>
        )
    }

}


export class About extends React.Component{   
    render(){
        return(
            <div>
                <Popup modal trigger={<div class="button_cont" align="center" id = "about-btn-pos"><button style = {{width: "100px", height: "75px"}} class="example_c"><b>About</b></button></div>} position="bottom center">
                    <div style = {{backgroundColor: "#981e4d"}}>
                        <h1 id = "popup-header">Welcome to Loyola's Course Evaluation Website</h1>
                        <p className = "popup-font">This website was created by Mo Patel and Kevin Guilluame for the students of Loyola University Chicago. We are sophomore computer science students with a passion for developing and creating products that benefit others.</p>
                        <p className = "popup-font">Please contact us at Mopatel1214@gmail.com if you experience any visual or technical errors. </p>
                        <p className = "popup-font"> Thank you all and we hope this serves the students well!</p>
                    </div>

                </Popup>

            </div>
        )
    }
}







