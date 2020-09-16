import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'

class List extends Component {
    constructor(props){
        super (props);
        this.state = {
            data: []
        }
    }

    renderTable(){
        return this.state.data.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.label}</td>
                    <td>{item.price}</td>
                    <td>{item.core}</td>
                    <td>
                        <Link to={`/CPUs/${item.id}/edit`}>Edit</Link> {" | "}
                        <a href={"#"} onClick={(e) => {
                            // eslint-disable-next-line no-restricted-globals
                            if(confirm("Please confirm you want to delete this record " + item.id)){
                                console.log("process delete");
                                fetch("http://localhost:8080/v1/CPUs/"+item.id, {method: 'DELETE'})
                                    .then(response => response.json())
                                    .then(()=>{alert(`The item ${item.id} has been removed.`)})
                            }else {
                                console.log("No cancel action")
                            }
                        }}>Delete</a>
                    </td>
                </tr>
            );
        });
    }

    componentWillMount() {
        fetch("http://localhost:8080/v1/CPUs")
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    data: data.result
                })
            })
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lable</th>
                        <th>Price</th>
                        <th>Core</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.data.length>0 && this.renderTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(List);