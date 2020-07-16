import React from 'react';

import './ShowRevs.css';




var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');




export class ShowsReviews extends React.Component{
    constructor(props){
        super(props)
       this.state = {
           comps : []
       }
        //this.props.course
        var temp = this.state.comps
        let temp2 = firebase.database().ref("/Test Reviews/"  + String(this.props.course).toLowerCase() + "/")
      
        
        temp2.on('value', function(snapshot) {

            snapshot.forEach(function(childRevs){
                let curStudent = childRevs.val().Student_Name
                let curProfessor = childRevs.val().Professor_Name
                let curCourse = childRevs.val().Course_Name
                let curReview = childRevs.val().Course_Review

                let curDifficulty = childRevs.val().Course_Difficulty
                let curRating = childRevs.val().Course_Rating

                let curRecommend = childRevs.val().Textbook_Usage
                let curTextbook = childRevs.val().Course_Recommend

                temp.unshift(<Tester student = {curStudent} professor = {curProfessor} course = {curCourse} review = {curReview} difficulty = {curDifficulty} rating = {curRating} recommend = {curRecommend} textbook = {curTextbook} />)
               
            })
            temp.shift()
            temp.shift()


            
         /*   
            var reviews = snapshot.val()
            var keys = Object.keys(reviews)
            
            for(let i = 0; i < keys.length; i++){
                let curStudent = keys[i].val().Student_Name
                let curProfessor = keys[i].child("Professor_Name").value()
                let curCourse = keys[i].child("Course_Name").value()
                let curReview = keys[i].child("Course_Review").value()

                temp.unshift(<Tester student = {curStudent} professor = {curProfessor} course = {curCourse} review = {curReview} />)
            }*/

        })
 
       
       
        

/*
        ref.on('value', function(snap){

            snap.forEach(function(childNodes){
                temp.unshift(childNodes.key())
                console.log(childNodes.keys())
              

            })
        })
        
      */
      
      
       
    }    


    render(){    

        return(
            <div style = {{position: 'relative', width: '1200px', overflowY: 'scroll', overflowX: 'hidden', display: "run-in"}}>
                <h1 style = {{fontSize: "30px", position: 'relative', height: '800px'}}>{this.state.comps}</h1>

            </div>

        )
    }


}








export class Tester extends React.Component{
    render(){    
        return(
            <div className = "review-box-style">

                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Student Name: </b> {this.props.student}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Course Name: </b> {this.props.course}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Professor Name: </b> {this.props.professor}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Course Review: </b> {this.props.review}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Class Difficulty: </b> {this.props.difficulty}/10</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Overall Class Experience: </b> {this.props.rating}/5</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Would you recommend taking this course?: </b> {this.props.recommend}</p>
                <p style = {{position: "relative", left: "1rem", fontSize: "1rem"}}><b>Textbook/3rd party platform usage: </b> {this.props.textbook}</p>
            </div>
        )
        
    }
}






/*


const database = firebase.database()



function getData(data){
    console.log(data)
    var reviews = data.val() //trying to add to show reviews. this isnt working
    var keys = Object.keys(reviews)
    var addCourse = this.state.comps

    for(var i = 0; i < keys.length; i++){
        if(keys[i].child('Course Name').value() === this.props.course){
            var student = keys[i].child('Student Name').value()
            var professor = keys[i].child('Professor Name').value()
            var course = keys[i].child('Course Name').value()
            var description = keys[i].child('Course Review').value()
          
            addCourse.unshift(<Tester student = {student} professor ={professor} course = {course} review = {description} />)

        }
        
        else{
            continue
        }

    }


}

function errData(data){
    console.log('error')
    console.log(data)
}

*/