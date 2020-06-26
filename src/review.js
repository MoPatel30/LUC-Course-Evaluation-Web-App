import React from 'react';
import ReviewerData from './reviews.json';
import { render } from '@testing-library/react';




export class Test extends React.Component{
    render(){
        const student = "john"
        const course = "Psychology"
        const professor = "Mr. Larry"
        const review = "Cool class, lots to learn"

        return(
           
            <div>
            
                <Tester student = {student} course = {course} professor = {professor} review = {review} />

            </div>
        )
    }
}




export class Tester extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.student}</p>
                <p>{this.props.course}</p>
                <p>{this.props.professor}</p>
                <p>{this.props.review}</p>
                
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
            review : null
        }

 

    }

    operation(e){
        e.preventDefault()
        
        this.setState({
            student : document.getElementById("student").value,
            course :  document.getElementById("course").value,
            professor :  document.getElementById("professor").value,
            reveiw :  document.getElementById("review").value,
            comp: null
        })

        this.setState({
            comp: <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} />
        })



    }


    render(){
        return(
            <div>
                <form>
                    <input id = "student" type = 'text' placeholder = "Student Name"></input>
                    
                    <input id = "course" type = 'text' placeholder = "Professor Name"></input>

                    <input id = "professor" type = 'text' placeholder = "Course Name"></input>
                    
                    <input id = "review" type = 'text' placeholder = "Course Review"></input>

                    <button type = 'submit' onClick = {() => this.operation()}>Submit</button>
                </form>

               


            </div>
            
        )
    }


}








