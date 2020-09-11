import React, {Component} from 'react';

class UpdateCpu extends Component {
    constructor(props){
        super (props);
        this.state = {
            "Id": "",
            "price": 0,
            "label": "",
            "core": "",
        }
    }

    onsubmitHandler= (event)=>{
        event.preventDefault();
        let url = "http://localhost:8080/v1/CPUs/" + this.state.Id;
        let option = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        fetch(url, option)
            .then(response => response.json())
            .then(()=>alert("Update successfully"))
            .catch((e) => {
                console.error(e)
            })
    }

     onChangeHandler = (event)=>{
        var nam = event.target.name;
        var val = event.target.value;
        this.setState({
            [nam]: val
        })
    }

    idHandler = (event)=>{
        event.preventDefault();

        let url1 = "http://localhost:8080/v1/CPUs/" + this.state.Id;

        fetch(url1)
            .then(response => response.json())
            .then(data => this.setState({
                price:data.result.price,
                label: data.result.label,
                core:data.result.core

            }))
            .catch((e) => {
                console.error(e)
            })
    }

    render() {
        return (
                <form>
                    <div>
                        <span>ID: </span>
                        <input type="text" name='Id' value={this.state.Id} onChange={this.onChangeHandler}/>
                        <button onClick={this.idHandler}> Select ID</button>
                    </div>

                    <span>Label: </span>
                    <input type="text" name='label' value={this.state.label} onChange={this.onChangeHandler}/>

                    <span>Price </span>
                    <input type="text" name='price' value={this.state.price} onChange={this.onChangeHandler}/>

                    <span>Core: </span>
                    <input type="text" name='core' value={this.state.core} onChange={this.onChangeHandler}/>
                    <button onClick={this.onsubmitHandler}> Submit </button>
                </form>
        );
    }
}

export default UpdateCpu;