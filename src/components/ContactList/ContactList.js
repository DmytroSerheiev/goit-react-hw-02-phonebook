import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Filter from './Filter';
import s from './ContactList.module.css';

const element = <FontAwesomeIcon icon={faTrashAlt} />;
<Filter />;

// const Filter = ({ value, onChangeFilter }) => {
//   return (
//     <div className={s.filter}>
//       <label>
//         Find contacts by name
//         <input
//           type="text"
//           value={value}
//           onChange={e => onChangeFilter(e.target.value)}
//         />
//       </label>
//     </div>

//   );
// };
// Этот код описывает компонент ContactList, который принимает массив контактов contacts, значение фильтра filter, функцию onChangeFilter для изменения фильтрации и функцию onDeleteContact для удаления контакта. Вот его расшифровка:

// С помощью метода map() исходный массив contacts преобразуется в массив компонентов <li>. Каждый компонент получает уникальный key по свойству id.
// Каждый компонент <li> содержит имя и номер контакта, а также кнопку "удалить", при нажатии на которую вызывается функция onDeleteContact с передачей в нее идентификатора контакта.
// Иконка для кнопки "удалить" получается из переменной element.
// Полученный массив компонентов <li> сохраняется в переменную contactList.
// В целом этот компонент отображает список контактов с возможностью удаления каждого контакта и использованием фильтра для поиска контактов.👇
const ContactList = ({ contacts, filter, onChangeFilter, onDeleteContact }) => {
  const contactList = contacts.map(({ id, name, number }) => {
    return (
      <li key={id}>
        {name}: {number}
        <button
          className={s.btn}
          type="button"
          onClick={() => onDeleteContact(id)}
          title="delete"
        >
          {element}
        </button>
      </li>
    );
  });

  //Этот код отвечает за отображение компонента ContactList. Вот его расшифровка:

  //Компонент полностью находится внутри элемента <div>, у которого есть класс s.contacts.
  //Выражение !!contacts.length проверяет, есть ли в массиве contacts хотя бы один контакт. Если есть, то отображается компонент Filter, которому передаются свойства value и onChangeFilter.
  //Если в массиве contacts нет контактов, то отображается сообщение, которое содержит значение filter, а также кнопка, при нажатии на которую вызывается функция onChangeFilter с пустой строкой в качестве аргумента.
  //Массив contactList переворачивается, а затем создается массив компонентов <ContactListItem> с помощью метода map(). Эти компоненты затем отображаются внутри элемента <ul>.
  //В целом этот компонент отвечает за отображение отфильтрованного списка контактов, а также за отображение поля для фильтрации и сообщения, если контакты не найдены.👇*/

  return (
    <div className={s.contacts}>
      {!!contacts.length ? (
        <Filter value={filter} onChangeFilter={onChangeFilter} />
      ) : (
        <div>
          <p>Запрашиваемых данных "{filter}" нет в списке контактов</p>
          <button type="button" onClick={() => onChangeFilter('')}>
            Вернуться к списку
          </button>
        </div>
      )}
      <ul>{contactList.reverse()}</ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.number.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  filter: PropTypes.number.isRequired,
  onChangeFilter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.string.isRequired,
};

export default ContactList;
