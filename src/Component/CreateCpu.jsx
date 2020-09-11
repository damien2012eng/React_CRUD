import React, {Component} from 'react';

class CreateCpu extends Component {
    constructor(props){
        super (props);
        this.state = {
            "price": 0,
            "label": "",
            "core": "",
        }
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/v1/CPUs", {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'}
        })
            .then(res => res.json())
            .then(function(){
                alert('Load data Successfully')
            }).catch(function(error){
                console.log(error);
            });

    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({
            [nam] : val
        })
    }

    render() {
        return (
            <form>
                <span>Label: </span>
                <input type="text" name='label' value={this.state.label} onChange={this.myChangeHandler}/>

                <span>Price </span>
                <input type="text" name='price' value={this.state.price} onChange={this.myChangeHandler}/>

                <span>Core: </span>
                <input type="text" name='core' value={this.state.core} onChange={this.myChangeHandler}/>

                <button onClick={this.mySubmitHandler}> Submit </button>
            </form>
        );
    }
}

export default CreateCpu;