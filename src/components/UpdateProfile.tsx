import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export const UpdateProfile = () => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };
  const { handleLogOut } = useAuth();

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users/${userId}`, config);
      console.log('account deleted');
      navigate('/');
      handleLogOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        className="bottom"
        variant="danger"
        style={{ margin: '4px' }}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>
    </div>
  );
};
