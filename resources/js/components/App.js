import React, {Component} from 'react';
import Axios from 'axios';

 class App extends Component{
     constructor (props){
         super(props);
         this.state = {
             name: '',
            tasks:[]
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.renderTasks= this.renderTasks.bind(this);    
         }
     handleChange(e){
         this.setState  ({
            name: e.target.value
         });
           
         }
// console.log(e.target.value);
     //handle submit
handleSubmit(e){
    e.preventDefault();
    axios.post('/tasks', {
        name: this.state.name
    }).then(response=>{
       this.setState({
           tasks: [response.data, ...this.state.tasks],
           name: ''
       })
    });
}

renderTasks(){
    return this.state.tasks.map(task =>(
        <div key={task.id} className="media">
        <div className="media-body">
        <div>
            {task.name}
        </div>
        </div>
        </div>
    ) );
}

    render(){
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
                                value = {this.state.name}
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