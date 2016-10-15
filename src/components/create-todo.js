import React from 'react';

export default class TodosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    renderError() {
        if (!this.state.error) { return null; }

        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }
    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                // refs are used to retrive the dom element, in this case input feild onSubmit
                <input type="text" placeholder="What do I need to do?" ref="createInput" />
                <button>Create</button>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
          // default behavior is to refresh the page onsubmit is clicked
          event.preventDefault();

          const createInput = this.refs.createInput;
          const task = createInput.value;
          const validateInput = this.validateInput(task);

          if (validateInput) {
              this.setState({ error: validateInput });
              return;
          }

          this.setState({ error: null });
          this.props.createTask(task);
          // this will empty the input value to empty string
          this.refs.createInput.value = '';
    }

    validateInput(task) {
      if (!task) {
          return 'Please enter a task.';
      } else if (_.find(this.props.todos, todo => todo.task === task)) {
          return 'Task already exists.';
      } else {
          return null;
      }
    }
}
