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
    
    
    }
        


    render(){ 
        var temp = this.state.comps
        temp.length = 0
        let temp2 = firebase.database().ref("/Test Reviews/"  + String(this.props.course).toLowerCase() + "/")
    

        temp2.on('value', function(snapshot) {

            snapshot.forEach(function(childRevs){
                let curStudent = childRevs.val().Student_Name
                let curProfessor = childRevs.val().Professor_Name
                let curCourse = childRevs.val().Course_Name

                let curReview = childRevs.val().Course_Review
                let curSyllabus = childRevs.val().Course_Syllabus
            

                let curDifficulty = childRevs.val().Course_Difficulty
                let curRating = childRevs.val().Course_Rating

                let curRecommend = childRevs.val().Course_Recommend
                let curTags = childRevs.val().Course_Tags

                let curDate = childRevs.val().Submission_Date
                
                temp.unshift(<Tester student = {curStudent} professor = {curProfessor} course = {curCourse} review = {curReview} syllabus = {curSyllabus} difficulty = {curDifficulty} rating = {curRating} recommend = {curRecommend} coursetags = {String(curTags).substring(0,String(curTags).length-2)} date = {curDate} />)
            
            })
        })
            temp.shift()
            temp.shift()  
   
           
        return(
         
            <div style = {{fontSize: "30px", position: 'relative', height: '800px', marginBottom: '-50px',  marginTop: '20px'}}>{this.state.comps}</div>
                

           

        )
    }



}








export class Tester extends React.Component{
    render(){    
        return(
            <div className = "review-box-style">

                <label id = "review-box-name-tag"><b>Name: {this.props.student}</b></label>
          


                <div id = "review-box-numbers">
                    <label id = "review-box-difficulty-tag">Course Difficulty</label>
                    <p id = "review-box-diff-num-pos"> <b id = "review-box-num-size"> {this.props.difficulty}/5 </b></p>
              
                    <label id = "review-box-rating-tag">Overall Course Experience</label>
                    <p id = "review-box-rating-num-pos"> <b id = "review-box-num-size"> {this.props.rating}/5 </b></p>
                </div>


                <p id = "review-box-small-form-pos"><b>Professor Name: </b> {this.props.professor}</p>
                <p id = "review-box-big-form-pos"><b>Course Review: </b> {this.props.review}</p>
                
                <p id = "review-box-big-form-pos"><b>Course Syllabus Breakdown: </b> {this.props.syllabus}</p>

                <p id = "review-box-small-form-pos"><b>Would you recommend taking this course?: </b> {this.props.recommend}</p>
                <p id = "review-box-small-form-pos"><b>Additional Course Insight: </b> {this.props.coursetags}</p>

           
                <p id = "review-box-date-pos">{this.props.date}</p>
                <label id = "review-box-course-tag"><b>{this.props.course.toUpperCase()}</b></label>
                <br />
                
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