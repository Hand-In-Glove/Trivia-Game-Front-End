import css from './choiceCard.module.css';

const ChoiceCard = ({ text, handleClick}) => {
  return( 
  <section className={css.cardBase} onClick={() => {handleClick(); console.log("clicked bizzatch")}}>
    {text}
  </section>
  );
}
export default ChoiceCard;