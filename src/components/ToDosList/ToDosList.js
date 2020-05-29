import React, {Component} from 'react';
import './ToDosList.css';

class ToDosList extends Component {

  render() {
    const { toDosList, hide, loadList, user, logout } = this.props;
    const hiddenStyle = this.props.show === false ? 'hidden' : '';
    const toDoListItems = toDosList.map((item) => {
      return (
        <li className="" onClick={()=>loadList(user,item)} key={item}>{item}</li>
      )
    });
    return (
      <div className={`mainList ${hiddenStyle}`} onMouseLeave={hide}>
        <h5 className="text-center">Saved lists:</h5>
        <ul>
          {toDoListItems}
        </ul>
        <span className="badge  badge-primary" onClick={logout}>Log out</span>
      </div>

    );
  }
}

export default ToDosList;