import React, { Component } from 'react';

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        this.setState({
            name: e.target.value
        });

    }
    // console.log(e.target.value);
    //handle submit
    handleSubmit(e) {
        e.preventDefault();
        axios.post('/tasks', {
            name: this.state.name
        }).then(response => {
            this.setState({
                tasks: [response.data, ...this.state.tasks],
                name: ''
            })
        });
    }

  
    //pull tasks from backend via axios
    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response => 
            this.setState({
            tasks: response.data.task,
            name: response.data.task.name
        }
        ))
    };

    //lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    render() {
        console.log(this.props.match.params.id)
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">App Component</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            className="form-control"
                                            value={this.state.name}
                                            maxLength="300"
                                            rows="5"
                                            placeholder="Create a new task"
                                            required
                                        />
                                        <hr />
                                
                                    </div>
                                    <button type="submit" className="btn btn-info">
                                        Create Task
                            </button>

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default TaskEdit;