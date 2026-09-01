import { useState } from 'react';
import { calculateExpression } from '../utils/calculator';
const keys = ['C', '⌫', '÷', '×', '7', '8', '9', '−', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.', '±'];
export default function CalculatorApp() {
  const [display, setDisplay] = useState('0');
  const calculate = () => {
    try { setDisplay(calculateExpression(display)); } catch { setDisplay('Error'); }
  };
  const press = (key) => {
    if (key === 'C') return setDisplay('0'); if (key === '⌫') return setDisplay((value) => value.length > 1 ? value.slice(0, -1) : '0'); if (key === '=') return calculate(); if (key === '±') return setDisplay((value) => value.startsWith('-') ? value.slice(1) : `-${value}`);
    setDisplay((value) => value === '0' || value === 'Error' ? key : value + key);
  };
  return <div className="calculator"><output>{display}</output><div>{keys.map((key) => <button className={['=', '+', '−', '×', '÷'].includes(key) ? 'operator' : ''} onClick={() => press(key)} key={key}>{key}</button>)}</div></div>;
}
