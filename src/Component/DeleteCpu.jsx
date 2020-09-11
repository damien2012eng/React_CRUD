import React, {Component} from 'react';

class DeleteCpu extends Component {
    constructor(props){
        super (props);
        this.state = {
            Id: ""
        }
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val})
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.Id)
        let url = "http://localhost:8080/v1/CPUs/" + this.state.Id;
        fetch(url, {method : 'delete'})
            .then(res => res.json())
            .then(data => {
                alert(data.message)
            })
    }

    render() {
        return (
            <form>
                <span>Enter the Id which you want to delete: </span>
                <input type="text" name='Id' value={this.state.Id} onChange={this.myChangeHandler}/>
                <button onClick={this.mySubmitHandler}> Delete </button>
            </form>
        );
    }
}

export default DeleteCpu;