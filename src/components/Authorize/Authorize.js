import React, {useContext, useEffect, useState, useRef} from "react";
import './Authorize.css';
import {Link} from "react-router-dom";
import RegistrationInput from "../Registration/RegistrationInput";
import Api from "../../Api/Api";
import {UserContext} from "../../Context/UserContext";

const apiConnect = new Api();

const Authorize = (props) => {
  const user = useContext(UserContext);

  const [userLogin, setUserLogin] = useState({
    mail : {
      input: '',
      status: '',
      msg: ''
    },
    pass : {
      status: '',
      msg: ''
    }
  });
  const [btnStatus, setBtnStatus] = useState(true);

  const btnRef = useRef(null);
  const passwRef = useRef(null);

  const checkUserLogin = (inputName, callback, inputValue, params) => {
    callback(inputValue,...params).then((res) => {

      if (res === 'ok') {
        const newUserValidate = {...userLogin[inputName], status:'is-valid', input:inputValue};
        setUserLogin({...userLogin, [inputName]: newUserValidate})
      }
      else  {
        const newUserValidate = {...userLogin[inputName], status:'is-invalid',  msg:res, input:inputValue};
        setUserLogin({...userLogin, [inputName]: newUserValidate, pass:{status: '',
            msg: ''}})
      }
      if (inputValue === '') {
        const newUserValidate = {...userLogin[inputName], status:''};
        setUserLogin({...userLogin, [inputName]: newUserValidate})
      }
    });
  };
  const checkCompleted = () => {
    if((userLogin.mail.status ==='is-valid') && (userLogin.pass.status ==='is-valid')) {
      setBtnStatus(false)
    }
    else setBtnStatus(true)
  };
  const onSubmit = () => {
    apiConnect.getLoggedUser(userLogin.mail.input)
        .then ((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          user.logIn();
          props.history.push('/main')
        })
  };
  

  useEffect(()=>checkCompleted());

  return (
    <div className='d-flex flex-column justify-content-center align-items-center auth'>
      <form>
        <RegistrationInput validateType={userLogin.mail}
                           validateCallback={(inputValue)=>checkUserLogin('mail',apiConnect.checkUserMailExist,inputValue,['login'])}
                           type='email'
                           name='email'
                           label='Email address'
                           onEnter={() => passwRef.current.focus()}
        />
        <RegistrationInput validateType={userLogin.pass}
                           validateCallback={(inputValue)=>checkUserLogin('pass',apiConnect.checkUserPass,inputValue,[userLogin.mail.input])}
                           type='password'
                           name='password'
                           label='Password'
                           ref={passwRef}
                           onEnter={() => btnRef.current.focus()}
        />


        <button type="button" className="btn btn-primary" disabled={btnStatus} onClick={onSubmit} ref={btnRef}>Log in</button>
        <div>
          <small className="form-text text-muted">If we don`t registered yet. Please<Link to='/registration'> click to register</Link></small>
        </div>

      </form>



    </div>
  );
};

export default Authorize;
