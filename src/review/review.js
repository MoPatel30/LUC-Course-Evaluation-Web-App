import React from 'react';

import './review.css';

import {ShowsReviews} from '../ShowRevs/ShowRevs'

import * as firebase from 'firebase';


export var firebaseConfig = {
 
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
            term: 'Search for Course...',
            course: '',
            tester: null,
            courseName: ''
            
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

    operation(event, id){
        event.preventDefault()

        var chosenCourse = document.getElementById(id).innerHTML
   

        this.setState({
            courseName: chosenCourse.toUpperCase(),
            tester: <ShowsReviews course = {(chosenCourse).toLowerCase()}  />
        })
        
        
    }

    


   

    render() {
        var selectedCourse = getCourses()
        console.log(selectedCourse)

        const {term} = this.state;

    

        return (
            <div>
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
                    <h1 style = {{ color: 'whitesmoke', textAlign: 'center'}}><u><em>{this.state.courseName}</em></u></h1>
                </div>

                <div id = "reviews-pos">{this.state.tester}</div>
                    
                      

            </div>
        );
    }
}


