import React from "react";
import './Authorize.css';
import {Link} from "react-router-dom";


const Authorize = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center auth'>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1"  />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary" >Log in</button>
        <div>
          <small className="form-text text-muted">If we don`t registered yet. Please<Link to='/registration'> click to register</Link></small>
        </div>

      </form>



    </div>
  );
};

export default Authorize;
