import { useState } from 'react';
import s from './FormPhone.module.css';
//пример от репеты https://youtu.be/JGzbyfbfo7M?t=793
const FormPhone = ({ addContactPhone }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  //валидация пустого поля до 16 строчки
  const handleSubmit = e => {
    e.preventDefault();

    if (!name || !number) {
      alert('Вы не ввели все контактные данные');
      return;
    }
    //валидация цифры
    if (Number.isNaN(+number)) {
      alert('Телефонный номер должен содержать только цифры');
      return;
    }
    addContactPhone(name, number);
    setName('');
    setNumber('');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Number
        <input
          name="number"
          type="tel"
          value={number}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default FormPhone;
