import css from './questionCard.module.css';

const QuestionCard = ({ text}) => {
  return( 
  <section className={css.cardBase}>
    {text}
  </section>
  );
}
export default QuestionCard;