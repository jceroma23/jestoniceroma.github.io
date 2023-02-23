import React, { useState } from 'react';
import ProductDataService from '../../service/service';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    customerName: '',
    customerAddress: '',
    customerContact: '',
    customerEmail: '',
    customerDOB: '',
    customerType: ''
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ProductDataService.createAccount(formData);
      window.alert("Successfuly Sign Up");
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.log(error.response.data.message); // <-- Display error message to console
      setError(error.response.data.message); // <-- Set error message state to display on UI
    }
  };


  return (
    <div className="signUpContainer container d-sm-flex justify-content-center align-items-center mt-5">
     

      <form className="form-control d-sm-flex flex-column justify-content-center p-4" onSubmit={handleSubmit}>
      
        <h3 className="text-center">Strawberry Street</h3>
        <h3 className="text-center">Sign Up</h3>
        {error && <div className="error text-danger">{error}</div>}
        <label className="mt-3" htmlFor="userName">
        User Name:
        </label> 
        <input className="form-control mt-1" type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} />
      
        <label className="mt-3" htmlFor="password">
        Password :
        </label>
        <input id="password" className="form-control mt-1" name="password" type="password" value={formData.password} onChange={handleChange} />
      
        <label className="mt-3" htmlFor="customername">
          Customer Name:
        </label>
        <input id="customername" className="form-control mt-1" name="customerName" type="text" value={formData.customerName} onChange={handleChange} />
        <label className="mt-3" htmlFor="customeraddress">
        Customer Address:
        </label>
        <input id="customeraddress" className="form-control mt-1" name="customerAddress" type="text" value={formData.customerAddress} onChange={handleChange} />
        <label className="mt-3" htmlFor="customercontact">
        Customer Contact:
        </label>
        <input id="customercontact" className="form-control mt-1" name="customerContact" type="text" value={formData.customerContact} onChange={handleChange} />
        <label className="mt-3" htmlFor="customeremail">
        Customer Email:
        </label>
        <input id="customeremail" className="form-control mt-1" name="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} />
        <label className="mt-3" htmlFor="customerdob">
        Customer DOB:
        </label>
        <input id="customerdob" className="form-control mt-1" name="customerDOB" type="text" value={formData.customerDOB} onChange={handleChange} />
        <label className="mt-3" htmlFor="customertype">
        Customer Type:
        </label> 
        <input id="customertype"  className="form-control mt-1" type="text" value={formData.customerType} onChange={handleChange} />
      
        <div className="d-flex justify-content-evenly mt-3">
           
        <button className="btn mt-3" type="submit" style={{backgroundColor: "#e66aac", color: "white"}}>Submit</button>
        </div>
    </form>

    </div>
  );
}

export default SignUpComponent;
