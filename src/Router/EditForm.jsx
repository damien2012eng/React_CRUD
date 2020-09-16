import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Input from "../Component/Input";
import {isEmpty} from "../helper";


class EditForm extends Component {
    constructor(props){
        super (props);
        this.state = {
            formValue: {
                label: "",
                core: "",
                price: 0
            },
            submitting: false,
            errors: {},
            serverFeedback: ""
        }
    }

    componentDidMount() {
        console.log("DidMount")
        fetch("http://localhost:8080/v1/CPUs/" + this.props.match.params.id, {
            method: "GET",
        }).then(response => response.json()).then(response => {
            this.setState({
                ...this.state,
                formValue: {
                    ...response.result
                }
            })
        })
    }

    handleSubmit =(event)=>{
        console.log(this.props)
        event.preventDefault();
        let errors = this.validate(this.state.formValue);
        if(isEmpty(errors)){
            this.setState({
                submitting: true,
                errors: {}
            }, () => {
                fetch("http://localhost:8080/v1/CPUs/"+ this.props.match.params.id, {
                    method: "POST",
                    body: JSON.stringify(this.state.formValue),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json()).then(response => {
                    if(response.result){
                        this.setState({
                            serverFeedback: response.result.message,
                            submitting: false,
                            formValue: {
                                ...response.result
                            }
                        }, ()=>{
                            this.props.history.push("/")
                        });
                    }
                    else{
                        this.setState({
                            submitting: false,
                            serverFeedback: response.message
                        });
                    }
                })
            })
        }
        else{
            this.setState({
                submitting: false,
                serverFeedback: "",
                errors: errors
            });
        }
    }

    handleChange =(event)=>{
        this.setState({
            formValue: {
                ...this.state.formValue,
                [event.target.name] : event.target.value
            }
        })

    }

    validate =(values) =>{
        let errors={};
        let {label, core, price} = values;
        if(label.trim() === ""){
            errors.label = "Label cannot be empty."
        }
        if(core.trim() === ""){
            errors.core = "Core cannot be empty."
        }
        if(Number.isNaN(price) || price <= 0){
            errors.price = "Price must be positive number."
        }
        return errors;
    }


    render() {
        let {label, core, price} = this.state.formValue;
        let errors = this.state.errors;
        return (
            <div>
                <h1>{`Edit CPU Entry ${+ this.props.match.params.id}`}</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        {this.state.serverFeedback && <h3 className={"text-danger"}>{this.state.serverFeedback}</h3>}
                        <Input name={"label"} label={"Label"} errors={errors} value={label} onChange={this.handleChange}/>
                        <Input name={"core"} label={"Core"} errors={errors} value={core} onChange={this.handleChange}/>
                        <Input name={"price"} label={"Price"} errors={errors} value={price} onChange={this.handleChange}/>
                        <button type={"submit"} disabled={this.state.submitting}>Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(EditForm);