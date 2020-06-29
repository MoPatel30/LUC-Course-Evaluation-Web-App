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
            review : null,
            comp: null
        }

 

    }

    


    showone = (event) => {
        event.preventDefault()
        this.setState({
            student : "hi"
        })        
    }

    mySubmit = (event) => {
        event.preventDefault()
        this.setState({
            comp: <Tester student = {this.state.student} course = {this.state.course} professor = {this.state.professor} review = {this.state.review} /> 
        })

    }

    render(){
        return(
            <div>

                <form onSubmit={this.mySubmit}>
                    <input 
                        placeholder = "Student Name"
                        type='text' 
                        value = {this.state.student}
                        onChange= {e => this.setState({student: e.target.value})}
                    />

                    <input 
                        placeholder = "Professor Name"
                        type='text' 
                        value = {this.state.professor}
                        onChange= {e => this.setState({professor: e.target.value})}
                    />

                    <input 
                        placeholder = "Course Name"
                        type='text' 
                        value = {this.state.course}
                        onChange= {e => this.setState({course: e.target.value})}
                    />

                    <input 
                        placeholder = "Course Review"
                        type='text' 
                        value = {this.state.review}
                        onChange= {e => this.setState({review: e.target.value})}
                    />

                    <button type="submit" onclick={e => this.showone(e)}>Submit</button>
                </form>
                
              
                
                <p>{this.state.comp}</p>


       


            
             
               


            </div>
            
        )
    }


}








