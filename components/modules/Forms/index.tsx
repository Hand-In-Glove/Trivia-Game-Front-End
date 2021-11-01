import { Component } from 'react';

import Button from '../../elements/Buttons';

import css from './form.module.css';

interface FormProps{
  title?: string;
  children: Component;
  buttonValues: {
    text: string;
    handleClick: Function;
  };
}

const Form = ({title, buttonValues, children}: FormProps) => {
  return (
  <section className={css.formBase}>
    {title && <h1 className={css.formTitle}>{title}</h1>}
      {children}
    <Button {...buttonValues}/>
  </section>);
}

export default Form;