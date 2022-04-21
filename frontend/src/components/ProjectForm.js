import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', repo: '', developers: ['']}
    }
    handleChange(event) {
        if (event.target.name === 'developers') {
            let value = Array.from(
                event.target.selectedOptions,
                (option) => option.value
            );
            this.setState(
                {
                    developers: value,
                }
            );
        } else {
            this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
        }
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repo, this.state.developers)
        event.preventDefault()
    }

    render() {
        return(
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="repo">repo</label>
                    <input type="url" required={false} className="form-control" name="repo" value={this.state.repo} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="developers">developers</label>
                    <select multiple={true} name="developers" className="field field-multiple form-control"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.options}>
                        {this.props.all_developers.map((item) => <option value={item.url}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ProjectForm