import React from 'react';
import Header from '../Header/Header';
import ToDoList from '../ToDoList/ToDoList';
import AddForm from "../AddForm/AddForm";
import Api from "../../Api/Api";
import './App.css';
import {UserContext} from "../../Context/UserContext";
import {Link} from "react-router-dom";


class App extends React.Component {
  apiConnect = new Api();
  static contextType = UserContext;
  userStorage = JSON.parse(localStorage.getItem('user'));

  state = {
    toDos:[],
    toDoName:'',
    toDosList:[],
    popup:{
      title: '',
      show: false,
      type:''
    },
    loggedUser:{
      name:''
    }
  };
  onToggleDone = (id) => {
    const toDos = [...this.state.toDos];
    const idx = toDos.findIndex((el) => el.id===id);
    const oldItem = {...toDos[idx]};
    toDos[idx] = {...oldItem,done:!oldItem.done};
    this.setState({toDos})
  };
  onDelete = (id) => {
    const toDos = [...this.state.toDos];
    const idx = toDos.findIndex((el) => el.id===id);
    toDos.splice(idx,1);
    this.setState({toDos})
  };
  onAddItem = (title) => {
    const toDos = [...this.state.toDos];
    const itemsCount = toDos.length;
    const toDoItem = {id:itemsCount+1, title, done:false};
    toDos.push(toDoItem);
    this.setState({toDos})
  };
  onChangeToDoName = (name) => {
    this.setState({toDoName:name})
  };
  loadSavedLists (user) {
    this.apiConnect.loadToDoList(user).then(
      (data) => {
        if (data === null) return;

        if(this.apiConnect.apiError!==''){
          this.onError(true,this.apiConnect.apiError)
        }
        else{
          this.setState({toDosList:data})
        }

      });
  }
  onSave = () => {
    const body = {
      toDos: [...this.state.toDos],
      name: this.state.toDoName,
      user: this.state.loggedUser.name
    };
   if (body.name !==''){
     this.apiConnect.saveToDo(body).then(() =>{
       if(this.apiConnect.apiError!==''){
         this.onError(true,this.apiConnect.apiError)
       }
       else {
         this.onSuccess(true,this.apiConnect.apiMsg);
         this.loadSavedLists(this.userStorage.nickname)
       }
     })
   }
   else {
     const error = 'Please choose a name of the list';
     this.onError(true,error);

   }
  };
  onError = (show,title = this.state.popup.title) => {
    const error = {...this.state.popup};
    error.title = title;
    error.show = show;
    error.type = 'error';
    this.setState({popup:error});
    setTimeout(()=>this.closeError(),2500)
  };
  onSuccess = (show,title) => {
    const popup = {...this.state.popup};
    popup.title = title;
    popup.show = show;
    popup.type = 'Success!';
    this.setState({popup});
    setTimeout(()=>this.closeError(),2500)
  };
  loadList = (user,name) => {
    this.apiConnect.loadList(user,name).then((json) => {
      if(this.apiConnect.apiError!==''){
        this.onError(true,this.apiConnect.apiError)
      }
      else {
        this.setState({
          toDos:json.toDos,
          toDoName:json.name
        })
      }

    })
  };
  closeError = () => {
    const error = {...this.state.popup};
    error.show = false;
    this.setState({popup:error})
  };
  onLogOut = () => {
    this.context.logIn();
    localStorage.clear();
    this.setState({...this.state,loggedUser:{name:''}})
  };

  componentDidMount() {
   if(this.context.isLogged || this.userStorage){
     this.setState(()=> {
      return {...this.state,loggedUser:{...this.state.loggedUser,name:this.userStorage.nickname}}
     });
     this.loadSavedLists(this.userStorage.nickname);
   }


  }

  render() {
    let style = {
      opacity:1
    };

    const { toDos, toDoName, toDosList, popup } = this.state;

    if(this.state.loggedUser.name === '') {
      return (
          <div className='d-flex flex-column justify-content-center align-items-center logIn'>
            <h3>Please logIn!</h3>
            <Link to='/'>
              Go to authorization page
            </Link>
          </div>
      )
    }

    return (
      <>
        <div className='row'>
          <Header total={toDos.length}
                  doneItemsCount={toDos.filter((el) => el.done === true).length}
                  toDosList={toDosList}
                  onLoadList={this.loadList}
                  user={this.state.loggedUser.name}
                  logout = {this.onLogOut}

          />
          <ToDoList listItems={toDos}
                    deleteItem={this.onDelete}
                    complete={this.onToggleDone}
                    listName={toDoName}
                    changeName={this.onChangeToDoName}
                    save={this.onSave}
                    toDosList={toDosList}
          />
          <AddForm addItem={this.onAddItem}/>

        </div>
        <div className={'hideError'} style={!popup.show ? {} : style}>
          <h3>{popup.type}</h3>
          <p className='text-muted font-italic'>{popup.title}</p>
          <i className="fa fa-times closeI" aria-hidden="true" onClick={this.closeError}/>

        </div>

      </>
    );
  }
}


export default App;
