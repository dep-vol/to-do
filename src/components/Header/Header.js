import React, { Component } from 'react';
import styles from './header.module.css';
import ToDosList from "../ToDosList/ToDosList";

export default class Header extends Component {
  state = {
    show: false
  };

  togglePopup = () => {
    const showState = !this.state.show;
    this.setState({show:showState})
  };
  hidePopup = () => {
    this.setState({show:false})
  };
    render() {
      const { total, doneItemsCount, toDosList, onLoadList, user, logout } = this.props;
        return (
            <div className={`container-fluid ${styles.head}`}>
                <div className={`row ${styles.mainrow}`}>
                    <div className='col'>
                        <h1 className='text-center'>ToDo-application</h1>
                    </div>
                </div>
              <div className="row">
                <div className={`col ${styles.user}`}>
                  <div className={styles.tog}>
                      <div>{`${user} :`}</div>
                      <i className="fa fa-bars" aria-hidden="true" onClick={this.togglePopup}/>
                      <ToDosList show={this.state.show}
                                 toDosList={toDosList}
                                 hide={this.hidePopup}
                                 loadList = {onLoadList}
                                 user = {user}
                                 logout = {logout}
                      />
                  </div>


                </div>

                <div className="col">
                  <ul className={styles.listCounter}>
                    <li>Uncompleted <span className="badge badge-primary">{total-doneItemsCount}</span></li>
                    <li>Completed <span className="badge badge-primary">{doneItemsCount}</span></li>
                    <li>Total to-dos <span className="badge badge-primary">{total}</span></li>
                  </ul>

                </div>
              </div>
            </div>
        )
    }
}
