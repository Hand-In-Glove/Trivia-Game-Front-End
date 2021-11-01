import QuestionCard from '../../elements/QuestionCard';
import ChoiceCard from '../../elements/ChoiceCard';

import css from './gameDisplay.module.css';

const GameDisplay = ({ question, selectAnswer }) => {
  return (
    <article>
      <section>
        <QuestionCard text={question.question} />
      </section>
      <section className={css.choiceGrid}>
        {question.choices.map((choice, i) => {
          return <ChoiceCard text={choice} key={i} handleClick={() => selectAnswer(choice)} />
        })}
      </section>
    </article>
  )
};

export default GameDisplay;