import React from 'react';
import Header from '../Header/Header';
import ToDoList from '../ToDoList/ToDoList';
import AddForm from "../AddForm/AddForm";
import Api from "../../Api/Api";
import './App.css';


class App extends React.Component {
  apiConnect = new Api();

  state = {
    toDos:[],
    toDoName:'',
    toDosList:[],
    popup:{
      title: '',
      show: false,
      type:''
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
  loadSavedLists () {
    this.apiConnect.loadToDoList().then(
      (data) => {
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
      name: this.state.toDoName
    };
   if (body.name !==''){
     this.apiConnect.saveToDo(body).then(() =>{
       if(this.apiConnect.apiError!==''){
         this.onError(true,this.apiConnect.apiError)
       }
       else {
         this.onSuccess(true,this.apiConnect.apiMsg);
         this.loadSavedLists()
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
  }

  loadList = (name) => {
    this.apiConnect.loadList(name).then((json) => {
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

  componentDidMount() {
    this.loadSavedLists()
  }

  render() {
    let style = {
      opacity:1
    };

    const { toDos, toDoName, toDosList, popup } = this.state;
    return (
      <>
        <div className='row'>
          <Header total={toDos.length}
                  doneItemsCount={toDos.filter((el) => el.done === true).length}
                  toDosList={toDosList}
                  onLoadList={this.loadList}
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
