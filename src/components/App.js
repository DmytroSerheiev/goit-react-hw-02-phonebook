import { useState } from 'react';
import Layout from './Layout/Layout';
import Section from './Section/Section';
import FormPhone from './FormPhone/FormPhone';
import ContactList from './ContactList/ContactList';
import Feedback from './Feedback/Feedback';

import { v4 as uuidv4 } from 'uuid';

import './App.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parseContacts = JSON.parse(contacts);
  //   if (parseContacts)
  //     this.setState({
  //       contacts: parseContacts,
  //     });
  // }

  // componentDidUpdate(prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const addContactPhone = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} уже есть в списке ваших контактов`);
      return;
    }
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    setContacts(prevState => [...prevState, contact]);
  };

  const deleteContact = contactID => {
    setContacts(contacts.filter(({ id }) => id !== contactID));
  };

  const changeFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Layout>
      <h1>Home Work #2.2</h1>
      <Section title="Phonebook">
        <FormPhone addContactPhone={addContactPhone} />
      </Section>
      {!!contacts.length && (
        <Section title="Contacts">
          <ContactList
            contacts={visibleContacts}
            filter={filter}
            onChangeFilter={changeFilter}
            onDeleteContact={deleteContact}
          />
        </Section>
      )}
      <Feedback />
    </Layout>
  );
};

export default App;
