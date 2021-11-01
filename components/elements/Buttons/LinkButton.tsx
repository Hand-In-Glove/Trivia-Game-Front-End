import Link from 'next/link';

import css from './button.module.css';

interface LinkButtonProps {
  text: string;
  url: string;
}

export default function LinkButton({ text, url }){
  return (
    <button className={css.button}>
      <Link href={url}>
        {text}
      </Link>
    </button>
  )
};