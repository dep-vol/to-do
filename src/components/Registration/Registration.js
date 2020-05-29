import React, {useEffect, useState} from 'react';
import Api from "../../Api/Api";
import RegistrationInput from "./RegistrationInput";
const apiConnect = new Api();

const Registration = (props) => {

//STATE
    const [userValidate, setUserValidate] = useState({
        nickname : {
            status: '',
            msg: '',
            input: ''
        },
        mail : {
            status: '',
            msg: '',
            input: ''
        },
        pass : {
            status: '',
            msg: '',
            input: ''
        }
    });
    const [btnStatus, setBtnStatus] = useState(true);
    const [registered, setRegistered] = useState(false);

//REFS
    const formRef = React.createRef();
    const mailRef = React.createRef();
    const passRef = React.createRef();
    const passRepeatRef = React.createRef();
    const btnRef = React.createRef();
//

//LISTENERS
    const onSubmit = (e) => {
        e.preventDefault();
        apiConnect.register(formRef.current);
        setRegistered(true);
        setTimeout(() => props.history.push('/'),2000)
    };

    const checkUserExist = (inputName, callback, inputValue) => {
        callback(inputValue).then((res) => {

            if (res) {
                const newUserValidate = {...userValidate[inputName], status:'is-invalid', msg:res};
                setUserValidate({...userValidate, [inputName]: newUserValidate})
            }
            else  {
                const newUserValidate = {...userValidate[inputName], status:'is-valid', input:inputValue, msg:''};
                setUserValidate({...userValidate, [inputName]: newUserValidate})
            }
            if (inputValue === '') {
                const newUserValidate = {...userValidate[inputName], status:''};
                setUserValidate({...userValidate, [inputName]: newUserValidate})
            }
        });
    };

    const onPassEnter = (inputValue) => {
        const newUserValidate = {...userValidate.pass, status:'', input:inputValue};
        setUserValidate({...userValidate, pass: newUserValidate})
    };

    const passCheck = (inputValue) => {
        if (inputValue === userValidate.pass.input) {
            const newUserValidate = {...userValidate.pass, status:'is-valid'};
            setUserValidate({...userValidate, pass: newUserValidate})
        }
        else {
            const newUserValidate = {...userValidate.pass, status:'is-invalid', msg:'Password is not similar'};
            setUserValidate({...userValidate, pass: newUserValidate})
        }
    };

    const checkCompleted = () => {
        if((userValidate.nickname.status ==='is-valid') && (userValidate.mail.status ==='is-valid') && (userValidate.pass.status ==='is-valid')) {
            setBtnStatus(false)
        }
        else setBtnStatus(true)
    };

    useEffect(()=>checkCompleted());

//
    if(registered === true) {
        return <div className='d-flex flex-column justify-content-center align-items-center auth'>
            <h3>Thank you for registration. You can login now!</h3>
        </div>
    }

    return (
        <div className='d-flex flex-column justify-content-center align-items-center auth'>
            <h3 className='mb-5 text-center'>Thank you for choosing our app. Please register:</h3>
            <form ref={formRef}>

                <RegistrationInput validateType={userValidate.nickname}
                                   validateCallback={(inputValue)=>checkUserExist('nickname',apiConnect.checkUsernameExist,inputValue)}
                                   type='text'
                                   name='nick'
                                   label='Nickname'
                                   onEnter = {()=>mailRef.current.focus()}
                />
                <RegistrationInput validateType={userValidate.mail}
                                   validateCallback={(inputValue)=>checkUserExist('mail',apiConnect.checkUserMailExist,inputValue)}
                                   type='email'
                                   name='mail'
                                   label='Email address'
                                   ref={mailRef}
                                   onEnter = {()=>passRef.current.focus()}
                />

                <RegistrationInput validateType={userValidate.pass}
                                   validateCallback={onPassEnter}
                                   type='password'
                                   name='password'
                                   label='Password'
                                   ref={passRef}
                                   onEnter = {()=>passRepeatRef.current.focus()}
                />
                <RegistrationInput validateType={userValidate.pass}
                                   validateCallback={passCheck}
                                   type='password'
                                   name='PasswordCheck'
                                   label='Repeat password'
                                   ref={passRepeatRef}
                                   onEnter = {()=>btnRef.current.focus()}
                />

                <button type="button" className="btn btn-primary" onClick={onSubmit} ref={btnRef} disabled={btnStatus}>Register</button>
            </form>
        </div>
    );
};

export default Registration;