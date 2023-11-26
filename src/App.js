// App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import UserReducer, { setUsers } from './UserReducer';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './Home';
import Create from './Create';
import Update from './Update';

const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});

const App = () => {
  useEffect(() => {
   
    
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        store.dispatch(setUsers(response.data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
