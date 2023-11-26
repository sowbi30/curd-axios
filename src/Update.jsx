import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editUser, addUser } from './UserReducer'; // Import addUser
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the existing user or default to an empty object for a new user
  const existingUser = users.find((user) => user.id === parseInt(id, 10)) || {};

  const { name: initialName, email: initialEmail } = existingUser;
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');

  useEffect(() => {
    setName(initialName || '');
    setEmail(initialEmail || '');
  }, [initialName, initialEmail]);

  const handleUpdate = (event) => {
    event.preventDefault();

    // Check if it's an existing user or a new user
    if (existingUser.id) {
      // Update existing user in the API and Redux store
      axios
  .patch(`https://jsonplaceholder.typicode.com/users/${id}`, { name, email })
  .then((response) => {
    dispatch(editUser(response.data));
    navigate('/');
  })
  .catch((error) => {
    console.error('Error updating user:', error);
  });
    } else {
      // It's a new user, add to the API and Redux store
      axios
        .post('https://jsonplaceholder.typicode.com/users', { name, email })
        .then((response) => {
          dispatch(addUser(response.data));
          navigate('/');
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>{existingUser.id ? 'Edit User Details' : 'Add New User'}</h3>
        <form onSubmit={handleUpdate}>
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
          <button type="submit" className='btn btn-info'>
            {existingUser.id ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
