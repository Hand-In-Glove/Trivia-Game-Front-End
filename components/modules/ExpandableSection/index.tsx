import { useState } from 'react';

import css from './expandableSection.module.css';

const ExpandableSection = ({ title, children}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
  <section className={css.base}>
    <header className={css.title}>
      <h1>{title}</h1>
      <h1 className={css.icon} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '-' : '+'}</h1>
    </header>
    {isExpanded && children}
  </section>
  )
};

export default ExpandableSection;