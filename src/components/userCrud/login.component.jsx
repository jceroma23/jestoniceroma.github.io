import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProductDataService from '../../service/service';
import { Link } from 'react-router-dom';

const LogInComponent = ({ setToken, setName }) => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await ProductDataService.loginAccount("/login", { userName, password });
          localStorage.setItem('token', response.data.token);
          navigate('/shop', { replace: true });
          setToken(token);
        
          console.log(response.data); // Add this line to log response data
        } catch (error) {
          setError(error.response.data.message);
        }
      };


      return (
        <div className="loginContainer container d-sm-flex justify-content-center align-items-center mt-5">
          <form className="form-control d-sm-flex flex-column justify-content-center p-4" onSubmit={handleSubmit}>
            <h3 className="text-center">Strawberry Street</h3>
            <h3 className="text-center">Log In</h3>
            
            <label className="mt-3" htmlFor="userName">
              UserName :
            </label>
              <input className="form-control mt-1" type="text" id="username" value={userName} onChange={(event) => setUsername(event.target.value)} placeholder="UserName" />
    
            <label className="mt-3" htmlFor="password">
              Password :
            </label>
              <input id="password" className="form-control mt-1" type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            <div className="d-flex justify-content-evenly mt-5">
                {error && <div>{error}</div>}
              <button type="submit">Log In</button>
              <Link to="/signup" className="btn btn-secondary mt-3">Sign Up</Link>
            </div>
          </form>
          
         
        </div>
      );
}

export default LogInComponent;