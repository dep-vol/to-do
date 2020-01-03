class Api {
  baseUrl = 'http://my-api.test/';
  apiError = '';
  apiMsg = '';

  loadToDoList = () => {
    return fetch(`${this.baseUrl}load.php?data=name`)
      .then((response) => response.json())
      .catch((error)=>this.apiError=error.message)
  };

  loadList = (name) => {
    return fetch(`${this.baseUrl}load.php?list=${name}`)
      .then((response) => response.json())
      .catch((error)=>this.apiError=error.message)

  };

  saveToDo = (body)=>{
    return fetch(`${this.baseUrl}save.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.text())
      .then((text)=> {
        this.apiMsg = text;
        if (text === '') throw new Error('Error on server please try later')
      })
      .catch((error)=>this.apiError=error.message)
  };

  register = (form) => {
    let formData = new FormData(form);
    return fetch(`${this.baseUrl}reg.php`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.text())
      .then((text)=> {
        this.apiMsg = text;
        if (text === '') throw new Error('Error on server please try later')
      })
      .catch((error)=>console.error(error))
  }
}

export default Api;