import React from 'react';

import './review.css';

import {ShowsReviews, Tester} from '../ShowRevs/ShowRevs'

import * as firebase from 'firebase';


export var firebaseConfig = {
    apiKey: "AIzaSyDQEmKGVgFd77Kq3FbycSOkXUzeC4YN4G4",
    authDomain: "luc-course-evaluator.firebaseapp.com",
    databaseURL: "https://luc-course-evaluator.firebaseio.com",
    projectId: "luc-course-evaluator",
    storageBucket: "luc-course-evaluator.appspot.com",
    messagingSenderId: "672982640052",
    appId: "1:672982640052:web:c28d1bf9e1eca8657bbee1",
    measurementId: "G-TMXZ2Q01VV"

};


firebase.initializeApp(firebaseConfig);




function searchingFor(term){
    return function(x){
        return x.course.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}


function getCourses(){

    let temp2 = firebase.database().ref("/Test Reviews/")
    let courseInfo = []
    var count = 1
    temp2.on('value', function(snapshot) {

        snapshot.forEach(function(childRevs){
            let temp = {}
            temp["course"] = childRevs.val().Course
            temp["count"] = childRevs.val().Count
          
            temp["id"] = count
            count += 1

            let ratings_level = []
            let difficulty_level = []

            childRevs.forEach(function(childRatings) {
                ratings_level.push(Number(childRatings.val().Course_Rating))
                difficulty_level.push(Number(childRatings.val().Course_Difficulty))
            })
            ratings_level.pop()
            ratings_level.pop()
            difficulty_level.pop()
            difficulty_level.pop()

          
            var sum_rating = 0
            var sum_difficulty = 0

            for(let i = 0; i < ratings_level.length; i++){
                sum_rating += ratings_level[i]

            }

            for(let j = 0; j < difficulty_level.length; j++){
                sum_difficulty += difficulty_level[j]
            }
       

            temp["difficulty"] = String((sum_difficulty / Number(temp['count'])).toFixed(2))
            temp["rating"] = String((sum_rating / Number(temp['count'])).toFixed(2))
            
            
            courseInfo.unshift(temp)
        
        })
   
      
    })
    console.log(courseInfo)
    return courseInfo

}



export class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            course: '',
            tester: this.getRecents(),
            courseName: 'Recent Reviews',
            welcome: true
            
        }
        
       
      

        this.searchHandler = this.searchHandler.bind(this);

    }

    showRecents(event){
        event.preventDefault()
        this.setState({
            welcome: false,
            tester: this.getRecents(),
            courseName: "Recent Reviews"
        })
    }
   
    getRecents(){
        let fbDir = firebase.database().ref("/Recent Reviews/")
        let recentReviews = []

        fbDir.on('value', function(snapshot) {

            snapshot.forEach(function(recentRevs){
                    let tempDict = {}

                    tempDict["Difficulty"] = recentRevs.val().Course_Difficulty 
                    tempDict["Name"] = recentRevs.val().Course_Name 
                    tempDict["Rating"] = recentRevs.val().Course_Rating
                    tempDict["Recommend"] = recentRevs.val().Course_Recommend
                    tempDict["Review"] = recentRevs.val().Course_Review 
                    tempDict["Syllabus"] = recentRevs.val().Course_Syllabus
                    tempDict["Professor"] = recentRevs.val().Professor_Name  
                    tempDict["Student"] = recentRevs.val().Student_Name
                    tempDict["Tags"] = recentRevs.val().Course_Tags
                    tempDict["Date"] = recentRevs.val().Submission_Date
                
                    recentReviews.push(<Tester student = {tempDict["Student"]} professor = {tempDict["Professor"]} course = {tempDict["Name"]} review = {tempDict["Review"]} syllabus = {tempDict["Syllabus"]} difficulty = {tempDict["Difficulty"]} rating = {tempDict["Rating"]} recommend = {tempDict["Recommend"]} coursetags = {String(tempDict["Tags"]).substring(0,tempDict["Tags"].length-2)} date = {tempDict["Date"]} />)

            })
        
        })
        console.log(recentReviews)     

        return recentReviews
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

    operation(event, id){
        event.preventDefault()

        var chosenCourse = document.getElementById(id).innerHTML
   

        this.setState({
            courseName: chosenCourse.toUpperCase(),
            tester: <ShowsReviews course = {(chosenCourse).toLowerCase()}  />
        })
        
        
    }
    

    render() {
        const {term} = this.state;
        var selectedCourse = getCourses()
       

        return (
            <div>
                {
                this.state.welcome?
                       
                    <div className = "modal">
                        <div id = "pop-style">
                            <h1 id = "popup-header"><u><b>Welcome to Loyola's Course Evaluation Website</b></u></h1>
                            <p className = "popup-font">This website was created by Mo Patel and Kevin Guilluame for the students of Loyola University Chicago. We are sophomore computer science students with a passion for developing and creating products that benefit others.</p>
                            <p className = "popup-font">Please contact us at Mopatel1214@gmail.com if you experience any visual or technical errors. </p>
                            <p className = "popup-font"> Thank you all and we hope this serves the students well!</p>  
                            <br />  
                            <button id = "popup-btn-pos" className="example_c" onClick={(event) => this.showRecents(event)} ><b>Continue to Site</b></button>
                            <br />  
                            <p className = "popup-font">Important Note: Leaving "Student Name" and "Professor's Name" blank will set their values to "Anonymous" on your review "Anonymous".</p>
                              
                            
                        </div>

                     
                    </div>
                       
                    :null
                    
                }


                <div className ='searchBar'>
                    <input  className="searchText" 
                            type='text'
                            onChange ={this.searchHandler}
                            value={term}
                            placeholder='Search For Course...'
                    />

                    <div className ='searchGlass'>
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </div>

                </div>

                <div id = "recent-btn-div">
                    <button id = "recent-revs-btn" className="example_c" onClick={(event) => this.showRecents(event)} ><b>View Recent Reviews</b></button>
                </div>

                <p id = "courses-header"><b><u>Courses</u></b></p>

                <div id ='reviewSection'>
                   
        
                    {
                        selectedCourse.filter(searchingFor(term)).map(selectedCourse => 
                            <div className = 'review-block-style' key = {selectedCourse.id} value = {String(selectedCourse.course)} onClick = {(event) => this.operation(event, String(selectedCourse.course))}>
                                <p value = {selectedCourse.course}><u><strong id = {selectedCourse.course}>{(selectedCourse.course).toUpperCase()}</strong></u></p>
                                
                                <p style = {{textAlign: 'center'}}>Overall Difficulty </p>
                                <p style = {{textAlign: 'center'}}><b>{selectedCourse.difficulty}</b></p>
                                
                                <p style = {{textAlign: 'center'}}>Overall Rating </p>
                                <p style = {{textAlign: 'center'}}> <b>{selectedCourse.rating}</b></p>
                
                                <p style = {{textAlign: 'center'}}> Total Reviews: <b>{selectedCourse.count}</b></p>
                            </div> 
                        )
                    } 
                    
                </div>
            

                <div id = "course-tag">
                    <h1 style = {{ color: 'gold', textAlign: 'center'}}><u><em>{this.state.courseName}</em></u></h1>
                </div>

           
                <div id = "reviews-pos">{this.state.tester}</div>

                
            </div>
        );
    }
}


