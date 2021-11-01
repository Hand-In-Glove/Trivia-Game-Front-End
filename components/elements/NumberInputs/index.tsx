import css from './numberInput.module.css';

interface NumberInputProps{
  label: string;
  name: string;
  min?: number;
  max?: number;
  numberState: number;
  handleChange: (e) => void;
}

const NumberInput = ({label, name, numberState, handleChange, min, max}: NumberInputProps) => {
  return (<div className={css.numberInput}>
    <label htmlFor={name}>
      {label}
    </label>
    <input type="number" onChange={handleChange} min={min|| null} max={max|| null} value={numberState}/>
  </div>)
};

export default NumberInput