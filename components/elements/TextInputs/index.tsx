import css from './textInput.module.css';

interface TextInputProps{
  label: string;
  name: string;
  textState: string;
  handleChange: (e) => void;
}

const TextInput = ({label, name, textState, handleChange}: TextInputProps) => {
  return (<div className={css.textInput}>
    <label htmlFor={name}>
      {label}
    </label>
    <input onChange={handleChange} value={textState}/>
  </div>)
};

export default TextInput