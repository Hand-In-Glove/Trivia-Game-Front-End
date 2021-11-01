import css from './button.module.css';
const Button = ({ text, handleClick }) => {
  return <button className={css.button} onClick={handleClick}>{text}</button>;
}

export default Button;