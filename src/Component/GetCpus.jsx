import React, {Component} from 'react';

class GetCpus extends Component {
    constructor(props){
        super (props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8080/v1/CPUs")
            .then(response => response.json())
            .then(data => {
                this.setState({
                data: data.result
            })})
    }

    renderCpu(){
        return this.state.data.map(cpu =>{
                return(
                    <tr key={cpu.id}>
                        <td>{cpu.id}</td>
                        <td>{cpu.core}</td>
                        <td>{cpu.price}</td>
                        <td>{cpu.label}</td>
                    </tr>
                )
            }
        )
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Core</td>
                        <td>Price</td>
                        <td>Label</td>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderCpu()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GetCpus;