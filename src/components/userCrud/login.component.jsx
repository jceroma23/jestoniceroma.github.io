import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProductDataService from '../../service/service';
import { Link } from 'react-router-dom';

const LogInComponent = () => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await ProductDataService.loginAccount({ userName, password });
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify({
            id: response.data.user.userId,
            userName: response.data.user.userName,
            customerType: response.data.user.customerType
          }));
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user.userName);
          // if (response.ok) {
          //   const data = await response.json();
          //   console.log(data.data); // add this line to log the data to the console
          //   localStorage.setItem('token', data.token);
          //   navigate('/shop', { replace: true });
          // } else {
          //   console.error(`Error: ${response.status} - ${response.statusText}`);
          // }
          navigate('/shop', { replace: true });
          
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
              User Name:
            </label>
              <input className="form-control mt-1" type="text" id="username" value={userName} onChange={(event) => setUsername(event.target.value)} placeholder="UserName" />
    
            <label className="mt-3" htmlFor="password">
              Password:
            </label>
              <input id="password" className="form-control mt-1" type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            <div className="d-flex justify-content-evenly mt-3">
                {error && <div>{error}</div>}
              <button className="btn btn-secondary mt-3" type="submit">Log In</button>
              <Link to="/signup" className="btn btn-secondary mt-3">Sign Up</Link>
            </div>
          </form>
          
         
        </div>
      );
}

export default LogInComponent;