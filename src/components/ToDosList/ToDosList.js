import React, {Component} from 'react';
import './ToDosList.css';

class ToDosList extends Component {

  render() {
    const { toDosList, hide, loadList } = this.props;
    const hiddenStyle = this.props.show === false ? 'hidden' : '';
    const toDoListItems = toDosList.map((item) => {
      return (
        <li className="list-group-item" onClick={()=>loadList(item)} key={item}>{item}</li>
      )
    });
    return (
      <div className={`mainList ${hiddenStyle}`} onMouseLeave={hide}>
        <ul className="list-group">
          {toDoListItems}
        </ul>
      </div>

    );
  }
}

export default ToDosList;