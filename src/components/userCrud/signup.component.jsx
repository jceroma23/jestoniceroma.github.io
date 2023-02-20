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
    <div>
      <h1>Sign Up Page</h1>
      {error && <div className="error text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
      <label>
        User Name:
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <label>
        Customer Name:
        <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} />
      </label>
      <label>
        Customer Address:
        <input type="text" name="customerAddress" value={formData.customerAddress} onChange={handleChange} />
      </label>
      <label>
        Customer Contact:
        <input type="text" name="customerContact" value={formData.customerContact} onChange={handleChange} />
      </label>
      <label>
        Customer Email:
        <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleChange} />
      </label>
      <label>
        Customer DOB:
        <input type="text" name="customerDOB" value={formData.customerDOB} onChange={handleChange} />
      </label>
      <label>
        Customer Type:
        <input type="text" name="customerType" value={formData.customerType} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>

    </div>
  );
};

export default SignUpComponent;
