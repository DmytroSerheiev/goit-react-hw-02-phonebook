import React, { Component } from 'react';
import Layout from './Layout/Layout';
import Section from './Section/Section';
import FormPhone from './FormPhone/FormPhone';
import ContactList from './ContactList/ContactList';

import CardInterface from './CardInterface/CardInterface';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

import { v4 as uuidv4 } from 'uuid';

import './App.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    good: 0,
    neutral: 0,
    bad: 0,
  };

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

  clickHandler = event => {
    const { name } = event.target; //получаем target (сохранённый в локальной переменной name)строик №44  <FeedbackOptions onLeaveFeedback={this.clickHandler} />
    //деструктуризация const { target } = event;
    this.setState(state => ({ [name]: state[name] + 1 }));
    //this.setState-метод перезаписи состаяния
    //[name]-то что мыхотим переписать
    //state[name] + 1 это то что мы хатим записать
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, item) => {
      //Object.keys(obj) возвращает массив ключей собственных свойств обьекта
      return acc + item; //сумма всех фидбеков
    });
  };

  countPositiveFeedbackPercentage = () => {
    return Math.round((this.state.good / this.countTotalFeedback()) * 100); // Math.round(num) - возвращает значение числа округлённое до ближайшего целого (состояния good делит на countTotalFeedback и уммнажает на 100) countTotalFeedback и уммнажает на 100
  }; //получаем процент от хороших одзивов

  render() {
    const { contacts, filter, good, neutral, bad } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
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
        <CardInterface>
          <Section title="Please leave feedback">
            <FeedbackOptions onLeaveFeedback={this.clickHandler} />
          </Section>
          <Section title="Statistics">
            {total ? (
              <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                total={total}
                positivePercentage={positivePercentage}
              />
            ) : (
              <Notification message="No feedback given" />
            )}
          </Section>
        </CardInterface>
      </Layout>
    );
  }
}

export default App;
