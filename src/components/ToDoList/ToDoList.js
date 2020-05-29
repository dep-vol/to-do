import React, { Component } from 'react';
import './ToDoList.css';

export default class ToDoList extends Component {
  state = {
    show: false,
    inpValue: ''
  };

  checkComplete = (item) => {
    if (item.done) {
      return 'itemDone'
    }
    else return ''
  };
  togglePopup = () => {
    const showState = !this.state.show;
    this.setState({show:showState})
  };

  changeName = (name) => {
    if (!this.props.toDosList.includes(name)){
      this.props.changeName(name);
      this.togglePopup()
    }
    else {

    }
  };

    render() {
        const { listItems, deleteItem, complete, listName } = this.props;

        const toDoList = listItems.map((item,i) => {
            return (
              <li className={`list-group-item ${this.checkComplete(item)}`} key={item.id+'item'}>
                  {`${i+1}. ${item.title}`}
                  <i className={`fa fa-check ${this.checkComplete(item)}`} aria-hidden="true" onClick={() => complete(item.id)}/>
                  <i className="fa fa-trash-o" aria-hidden="true" onClick={()=>deleteItem(item.id)}/>
              </li>
            )
        });

        const hiddenStyle = this.state.show === false ? 'hidden' : '';


        return (

          <div className='container-fluid'>
            <div className='row mt-3 mb-3'>
              <div className='col'>
                <h3 className='text-center'>
                  {listName===''? 'Unnamed list' : listName}:
                  <sup><i className="fa fa-pencil-square-o fa-edit" aria-hidden="true" onClick={this.togglePopup} /></sup>
                  <sup><i className="fa fa-floppy-o fa-edit" aria-hidden="true" onClick={this.props.save} /></sup>
                </h3>
              </div>
            </div>
            <div className={`row center ${hiddenStyle}`}>
              <form className="form-inline row addInput" onSubmit={(e)=>e.preventDefault()}>
                <div className="form-group">
                  <input type="text"
                         className="form-control"
                         placeholder="Please, type new title"
                         value={this.state.inpValue}
                         onChange={(e)=>{this.setState({inpValue:e.target.value})}}
                  />
                  <button className="btn btn-self" onClick={() => this.changeName(this.state.inpValue)}>Rename</button>
                </div>
              </form>
            </div>
            <div className='row center'>
              <div className='col-5'>
                <ul className="list-group">
                  {toDoList}
                </ul>
              </div>
            </div>
          </div>
        )
    }
}
