import React from 'react';
import Api from "../../Api/Api";
const apiConnect = new Api();

const Registration = () => {
 const ref = React.createRef();
 const onSubmit = (e) => {
   e.preventDefault();
   apiConnect.register(ref.current);
 }
  return (
      <div className='d-flex flex-column justify-content-center align-items-center auth'>
        <h3 className='mb-5 text-center'>Thank you for choosing our app. Please register:</h3>
        <form ref={ref} onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nickname</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='nick'  />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='mail'  />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Repeat password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary" >Register</button>

        </form>
    </div>
  );
};

export default Registration;