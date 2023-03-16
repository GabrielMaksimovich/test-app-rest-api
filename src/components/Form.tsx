import React, { memo } from 'react';
import LoginForm from './LoginForm';

export const Form = memo(() => {
  return (
    <div className="form">
      <div className="form__content">
        <h1 className="form__title">Working with POST request</h1>

        <LoginForm />
      </div>

    </div>
  );
});
