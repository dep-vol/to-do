import React, {useState} from 'react';


const RegistrationInput = React.forwardRef( (props, ref) => {
    const [inputValue, setInputValue] = useState('');
    const {validateType, validateCallback, type, name, label, onEnter} = props;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                   name={name}
                   value={inputValue}
                   className={`form-control ${validateType.status}`}
                   onChange={(e) => setInputValue(e.target.value)}
                   onBlur={()=>validateCallback(inputValue)}
                   onKeyPress={(e)=>{
                       if(e.key==='Enter') {
                           validateCallback(inputValue);
                           onEnter();
                       }
                   }}
                   ref={ref}
            />
            <div className="invalid-feedback">
                {validateType.msg}
            </div>
            <div className="valid-feedback">
                Looks good!
            </div>
        </div>
    );
});

export default RegistrationInput;