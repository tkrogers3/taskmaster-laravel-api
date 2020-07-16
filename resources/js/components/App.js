import React, { Component } from 'react';
import Axios from 'axios';
import { Link} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tasks: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(id){
        //remove from local state
        const deleteId = task => task.id !== id;
        const updatedTasks = this.state.tasks.filter(deleteId);
        this.setState({tasks: updatedTasks})

        //Delete request to back end
axios.delete(`/tasks/${id}`);



    }
    renderTasks() {
        return this.state.tasks.map(task => (
            <div key={task.id} className="media">
                <div className="media-body">
                    <div>
                        {task.name} {''}
                        <Link to={`/${task.id}/edit`} className="btn btn-sm btn-success float-right">Update</Link>
                        <button
                         onClick ={() => this.handleDelete(task.id)} className="btn btn-sm btn-danger float-right">
                                        Delete
                            </button>
                    </div>
                </div>
            </div>
        ));
    }
    //pull tasks from backend via axios
    getTasks() {
        axios.get('/tasks').then(response => 
            this.setState({
            tasks: [...response.data.tasks]
        }
        ))
    };

    //lifecycle method
    componentWillMount() {
        this.getTasks();
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Task Create</div>

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
                                        {this.renderTasks()}
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

export default App;