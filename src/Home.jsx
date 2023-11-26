// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from './UserReducer';
import axios from 'axios';
import './App.css'; // Import your CSS file

function Home() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch(deleteUser({ id }));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const userList = users.map((user, index) => (
    <tr key={index} className='td-style'>
      <td className='th-td-style'>{user.id}</td>
      <td className='th-td-style'>{user.name}</td>
      <td className='th-td-style'>{user.email}</td>
      <td className='th-td-style'>
        <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>
          Edit
        </Link>
        <button
          onClick={() => handleDelete(user.id)}
          className='btn btn-sm btn-danger ms-2'
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className='container'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>CRUD with Axios</h2>
      <Link to='/create' className='btn btn-success my-3'>
        Create +
      </Link>
      <div className='table-container'>
        <table className='table-style'>
          <thead>
            <tr>
              <th className='th-td-style th-style'>ID</th>
              <th className='th-td-style th-style'>NAME</th>
              <th className='th-td-style th-style'>EMAIL</th>
              <th className='th-td-style th-style'>ACTION</th>
            </tr>
          </thead>
          <tbody>{userList}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
