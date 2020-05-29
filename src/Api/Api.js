const checkCorsHost = async (host) => {
  const response = await fetch(`https://thingproxy.freeboard.io/fetch/${host}/save.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({})
  })
  return response.ok
}

const host = checkCorsHost('https://market-try.000webhostapp.com/api') 
  ? 'https://market-try.000webhostapp.com/api/' : checkCorsHost('http://f0442974.xsph.ru')
  ? 'http://f0442974.xsph.ru/' : null;

class Api {
  BASE_URL = `https://thingproxy.freeboard.io/fetch/${host}`;
  apiError = '';
  apiMsg = '';

  loadToDoList = (user) => {
    return fetch(`${this.BASE_URL}load.php?data=${user}`)
      .then((response) => response.json())
      .catch((error)=>this.apiError=error.message)
  };

  loadList = (user,name) => {
    return fetch(`${this.BASE_URL}load.php?data=${user}&list=${name}`)
      .then((response) => response.json())
      .catch((error)=>this.apiError=error.message)

  };

  saveToDo = (body) => {
    return fetch(`${this.BASE_URL}save.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.text())
      .then((text) => {
        this.apiMsg = text;
        if (text === '') throw new Error('Error on server please try later')
      })
      .catch((error)=>this.apiError=error.message)
  };

  register = (form) => {
    let formData = new FormData(form);
    fetch(`${this.BASE_URL}reg.php`, {
      method: 'POST',
      body: formData
    })
      .then((response) => response.text())
      .then((text)=> {
        this.apiMsg = text;
        if (text === '') throw new Error('Error on server please try later')
      })
      .catch((error)=>console.error(error))
  };

  checkUsernameExist = (nickname) => {
    return fetch(`${this.BASE_URL}reg.php?nick=${nickname}`)
        .then((res) => res.text())
        .then((text) => {
          if (text === 'TRUE') throw new Error(`User with nickname ${nickname} is already exist`);
        })
        .catch((error) => error.message)
  };

  checkUserMailExist = (mail, login) => {
    return fetch(`${this.BASE_URL}reg.php?mail=${mail}`)
        .then((res) => res.text())
        .then((text) => {
          if (text === 'TRUE') {
           if (login === 'login') return 'ok';
           else throw new Error(`User with E-mail ${mail} is already exist`);
          }
          else {
            if (login) return `User with E-mail ${mail} does not exist. Please register`
          }
        })

        .catch((error) => error.message)
  };

  checkUserPass = (password,mail) => {
    return fetch(`${this.BASE_URL}reg.php?mail=${mail}&pass=${password}`)
        .then((res) => res.text())
        .then((text) => {
          if (text === 'TRUE') return 'ok';
          else return `Password or Email does not correct`
        })
        .catch((error) => error.message)
  };

  getLoggedUser = (mail) => {
      return fetch(`${this.BASE_URL}reg.php?mail=${mail}&getU=true`)
          .then((res) => res.json())
          .then((data) => {
              return data
          })
          .catch((error) => error.message)
  }

}

export default Api;