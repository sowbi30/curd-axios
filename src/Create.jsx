// Create.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './UserReducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newUser = {
        name,
        email,
      };
      
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);

      const createdUser = response.data;

      dispatch(addUser(createdUser));

      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Add new User</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className='form-control'
              placeholder='Enter your Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name='email'
              className='form-control'
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div><br />
          <button type="submit" className='btn btn-info'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
