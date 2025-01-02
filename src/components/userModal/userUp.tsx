
import React, { useState } from 'react';
import './userUp.css';
import axiosInstance from '@/axios/axiosInstances';

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
};

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, userId }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      name,
      username,
      email,
      bio,
      profilePic,
    };

    try {
      const response = await axiosInstance.patch(
        `/users/${userId}`,
        userData
      );
      alert('User updated successfully!');
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="up-modal-overlay">
      <div className="up-modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit} className="up-form">
          <div className="up-form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="up-form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="up-form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="up-form-group">
            <label>Bio:</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter bio"
            ></textarea>
          </div>

          <div className="up-form-group">
            <label>Profile Picture URL:</label>
            <input
              type="text"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
              placeholder="Enter profile picture URL"
            />
          </div>

          <div className="up-form-actions">
            <button type="button" onClick={onClose} className="up-button-cancel">
              Cancel
            </button>
            <button type="submit" className="up-button-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
