import React, { Component } from 'react';
import Layout from './Layout/Layout';
import Section from './Section/Section';
import FormPhone from './FormPhone/FormPhone';
import ContactList from './ContactList/ContactList';
import Feedback from './Feedback/Feedback';

import { v4 as uuidv4 } from 'uuid';

import './App.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts)
      this.setState({
        contacts: parseContacts,
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContactPhone = ({ name, number }) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} уже есть в списке ваших контактов`);
      return;
    }
    const contact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(state => {
      return { contacts: [...state.contacts, contact] };
    });
  };

  deleteContact = contactID => {
    this.setState(state => {
      return {
        contacts: state.contacts.filter(({ id }) => id !== contactID),
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Layout>
        <h1>Home Work #2.2</h1>
        <Section title="Phonebook">
          <FormPhone addContactPhone={this.addContactPhone} />
        </Section>
        {!!contacts.length && (
          <Section title="Contacts">
            <ContactList
              contacts={visibleContacts}
              filter={filter}
              onChangeFilter={this.changeFilter}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        )}
        <Feedback />
      </Layout>
    );
  }
}

export default App;
