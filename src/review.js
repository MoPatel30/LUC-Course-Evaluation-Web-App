import React from 'react';
import ReviewerData from './reviews.json';
import { render } from '@testing-library/react';
import './review.css';

var temp = [['Kevin',"Phil 274",'Mr. Kant','Thought-provoking class with hard exams.'], ['Zeshan','Chem 101','Mrs. Curie','Interesting Labs. Detailed lab reports required per lab. Easy final.'], ['Mo Patel','Theo 107','Mr. God','Opens up mind to other religions. Changed how I thought about religion in general.'],['Mo larya','COMP 264','Mr. Klingensmith','Super chill class, makes assembly easy, learn linux, git and vim to a good extent.'], ['Michael','Math 163','Mr. Newton','Hard class, lots of material, A lot of integrals and derivatives. Tests are pretty hard. ']]


export class Test extends React.Component{
    constructor(){
        super()
        this.state = {
            comps: []
        }
    }

    render(){
        for(let idx = 0; idx < temp.length; idx++){    
            let student = temp[idx][0]
            let course = temp[idx][1]
            let professor = temp[idx][2]
            let review = temp[idx][3]

            let temp2 = [student, course, professor, review]

            let compOne = <Tester id = "review" student = {temp2[0]} course = {temp2[1]} professor = {temp2[2]} review = {temp2[3]} />
            var temp3 = this.state.comps
            temp3.push(compOne)

            

        }
     
      
    

       
        return(
           
            <div>
             
                <p style = {{fontFamily: "Open Sans Condensed", fontSize: "18px", border: "3px solid maroon"}}>{this.state.comps}</p>
             
            
                

            </div>
        )
    }
}




export class Tester extends React.Component{
    render(){
        return(
            <div>
                <p>Student Name: {this.props.student}</p>
                <p>Course Name: {this.props.course}</p>
                <p>Professor Name: {this.props.professor}</p>
                <p>Course Review: {this.props.review}</p>
                
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
                        placeholder = "Course Name"
                        type='text' 
                        value = {this.state.course}
                        onChange= {e => this.setState({course: e.target.value})}
                    />


                    <input 
                        placeholder = "Professor Name"
                        type='text' 
                        value = {this.state.professor}
                        onChange= {e => this.setState({professor: e.target.value})}
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









