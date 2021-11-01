import css from './modal.module.css';
import Button from '../../elements/Buttons/index'
import LinkButton from '../../elements/Buttons/LinkButton';

interface ModalProps {
  text: string;
  btnData?: {
    text: string;
    url?: string;
    handleClick?: (...args) => void 
  };
  hasBtn: boolean;
  isLink: boolean;
}

const Modal = ({ text, btnData, hasBtn = false , isLink = false }) => {
  return (
  <main className={css.base}>
    <section className={css.card}>
      <h1>{text}</h1>
      {hasBtn && isLink && <LinkButton {...btnData} />}
      {hasBtn && !isLink && <Button {...btnData}/>}
    </section>
  </main>
  );
}

export default Modal;