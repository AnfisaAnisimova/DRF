import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: props.projects[0]?.id, creator: props.developers[0]?.url}
    }


    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.project, this.state.creator)
        event.preventDefault()
    }

    render() {
        return(
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <label for="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="project">project</label>
                    <select name="project" className="field field-multiple form-control"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.options}>
                        {this.props.projects.map((item) => <option value={item.url}>{item.name}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label for="creator">creator</label>
                    <select name="creator" className="field field-multiple form-control"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.options}>
                        {this.props.developers.map((item) => <option value={item.url}>{item.username}</option>)}
                    </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}

export default ToDoForm