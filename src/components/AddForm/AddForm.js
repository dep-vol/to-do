import React, {Component} from 'react';
import './AddForm.css';

class AddForm extends Component {
  state = {
    inpValue : ''
  };

  inpChange = (e) => {
    const inpValue = e.target.value;
    if(inpValue!==''||inpValue!==null) {
      this.setState({inpValue});
    }
    else {
      return null
    }
  };
  onAddItem = () => {
      this.props.addItem(this.state.inpValue)
  };

  render() {
    const { inpValue } = this.state;
    return (
      <form className="form-inline row addInput" onSubmit={(e)=>e.preventDefault()}>
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 placeholder="Please, type toDo"
                 value={inpValue}
                 onChange={this.inpChange}
          />
          <button className="btn btn-self" onClick={this.onAddItem} disabled={inpValue === ''}>Add</button>
        </div>
      </form>

    );
  }
}

export default AddForm;