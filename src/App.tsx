import React, { memo } from 'react';
import './styles/main.scss';
import { Header } from './components/Header';
import { Banner } from './components/Banner';
import { Cards } from './components/Cards';
import { Form } from './components/Form';

export const App: React.FC = memo(() => {
  return (
    <>
      <Header />
      <Banner />
      <Cards />
      <Form />
    </>
  );
});
