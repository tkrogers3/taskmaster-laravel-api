import React, {Component} from 'react';

 class App extends Component{
     constructor (props){
         super(props);
         this.state = {
             name: '',
            tasks:[]
         }
         this.handleChange = this.handleChange.bind(this);
     }
     handleChange(e){
         this.setState  ({
            name: e.target.value
         });
           
         }
// console.log(e.target.value);
     

    render(){
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">App Component</div>

                        <div className="card-body">
                        <form>
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