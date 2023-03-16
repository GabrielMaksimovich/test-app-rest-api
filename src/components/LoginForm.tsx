import React, { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { client } from '../api/fetchClient';
import { User } from '../types/user';
import { Modal } from './Modal';

function LoginForm() {
  const [photoFile, setPhotoFile] = useState<Blob>();
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<User>({
    email: '',
    id: '',
    phone: '',
    photo: '',
    position: '',
    position_id: '',
    registration_timestamp: 0,
    name: '',
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      name: e.target.value,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      email: e.target.value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      phone: e.target.value,
    }));
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      position_id: e.target.value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setPhotoFile(file);

      setFormValues((prevValues) => ({
        ...prevValues,
        photo: String(file),
      }));
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('position_id', formValues.position_id);
    formData.append('name', formValues.name);
    formData.append('email', formValues.email);
    formData.append('phone', formValues.phone);
    formData.append('photo', formValues.photo);

    if (photoFile) {
      formData.append('photo', photoFile);
    }

    try {
      const response = await client.post('/users', formData);

      setShowModal(true);
      // eslint-disable-next-line no-console
      console.log(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="login-form__input"
          type="text"
          id="username"
          value={formValues.name}
          placeholder="Your name"
          onChange={handleUsernameChange}
        />
        <input
          className="login-form__input"
          type="email"
          id="email"
          value={formValues.email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <div className="login-form__phone-container">
          <input
            className="login-form__input"
            type="tel"
            id="phone"
            value={formValues.phone}
            placeholder="Phone"
            onChange={handlePhoneChange}
          />
          <p className="login-form__phone">+38 (XXX) XXX - XX - XX</p>
        </div>

        <div className="login-form__select">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Select your position</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Frontend developer"
              onChange={handlePositionChange}
              value={formValues.position_id}
              name="radio-buttons-group"
            >
              <FormControlLabel value="1" control={<Radio />} label="Frontend developer" />
              <FormControlLabel value="2" control={<Radio />} label="Backend developer" />
              <FormControlLabel value="3" control={<Radio />} label="Designer" />
              <FormControlLabel value="4" control={<Radio />} label="QA" />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="login-form__upload">
          <div className="file has-name">
            <label className="file-label" htmlFor="resume">
              <input
                id="resume"
                className="file-input"
                type="file"
                name="resume"
                onChange={handlePhotoChange}
              />
              <span className="file-cta">
                <i className="fas fa-upload"></i>
                <div className="file-label">
                  Upload
                </div>
              </span>
              <span className="file-name">
                {formValues.photo ? 'Picture uploaded' : 'No file chosen'}
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="login-form__button"
          onChange={() => handleSubmit}
        >
          Sign Up
        </button>
      </form>

      {showModal && <Modal onClose={setShowModal} />}
    </>
  );
}

export default LoginForm;
