import { Component } from 'react';

import LinkButton from '../../elements/Buttons/LinkButton';

import css from './form.module.css';

interface FormProps{
  title?: string;
  children: any;
  buttonValues: {
    text: string;
    url: {
      pathname: string;
      query: {
        [name: string]: string;
      };
    };
  };
}

const Form = ({title, buttonValues, children}: FormProps) => {
  return (
  <section className={css.formBase}>
    {title && <h1 className={css.formTitle}>{title}</h1>}
      {children}
    <LinkButton {...buttonValues}/>
  </section>);
}

export default Form;