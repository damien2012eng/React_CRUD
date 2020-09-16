import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Input from "../Component/Input";
import {isEmpty} from "../helper";

class AddForm extends Component {
    constructor(props){
        console.log("AddForm")
        super (props);
        this.state = {
            formValue:{
                label:"",
                price:0,
                core:""
            },
            submitting: false,
            errors: {},
            serverFeedback: ""
        }
    }

    submitHandler = (event)=>{
        event.preventDefault();
        let errors = this.validate(this.state.formValue);
        if(isEmpty(errors)){
            this.setState({
                submitting: true,
                errors:{}
            }, ()=>{    //setState contains two sections: state and callback?
                fetch("http://localhost:8080/v1/CPUs", {
                    method: "POST",
                    body: JSON.stringify(this.state.formValue),
                    headers: {
                        "Content-Type":"application/json"
                    }
                }).then(response => response.json()).then(response => {
                    if(response.result){
                        this.setState({
                            serverFeedback: response.result.message,
                            submitting: false,
                            formValue:{
                                ...response.result
                            }
                        },()=>{
                            this.props.history.push("/")
                        })
                    }else{
                        this.setState({
                            submitting:false,
                            serverFeedback:response.result.message
                        })
                    }
                })
            })
        }else{
            this.setState({
                submitting:false,
                serverFeedback:"",
                errors: errors
            })
        }
    }


    validate(values){
        let errors = {};
        let {label="", price=0, core = ""} = values;
        if(label.trim() === ""){
            errors.label="label cannot be empty"
        }
        if(core.trim() === ""){
            errors.core="core cannot be empty"
        }
        if(Number.isNaN(price) || price <= 0){
            errors.price="price mush be a positive number"
        }
        console.log(errors);
        return errors;

    }

    changeHandler = (event)=>{
        this.setState({
            formValue:{
            ...this.state.formValue,  //Why need to expand formValue
            [event.target.name]:event.target.value
            }
        })

    }


    render() {
        let {label, core, price} = this.state.formValue;
        let errors = this.state.errors;
        return (
            <div>
                <h1>Create New CPU</h1>
                <form onSubmit={this.submitHandler}>
                    {this.state.serverFeedback && <h3>{this.state.serverFeedback}</h3>}
                    <Input
                        name={"label"}
                        label={"Label"}
                        errors={errors}
                        value={label}
                        onChange={this.changeHandler}
                    />

                    <Input
                        name={"core"}
                        label={"Core"}
                        errors={errors}
                        value={core}
                        onChange={this.changeHandler}
                    />

                    <Input
                        name={"price"}
                        label={"Price"}
                        errors={errors}
                        value={price}
                        onChange={this.changeHandler}
                    />

                    <button type={"submit"} disabled={this.state.submitting}>Add</button>

                </form>

            </div>
        );
    }
}

export default withRouter(AddForm);