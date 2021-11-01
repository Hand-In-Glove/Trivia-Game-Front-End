import css from './loadingMessage.module.css';

const LoadingMessage = ({ text}) => {
return (
<section className={css.base}>
  <h1>{text}<span className={css.dot1}>.</span>
  <span className={css.dot2}>.</span>
  <span className={css.dot3}>.</span></h1>
</section>)
};

export default LoadingMessage;