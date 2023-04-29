import { useState, useMemo } from 'react';
import Layout from '../Layout/Layout';
import Section from '../Section/Section';

import CardInterface from './CardInterface/CardInterface';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

import './Feedback.css';

const Feedback = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // componentDidMount() {
  //   const good = localStorage.getItem('good');
  //   const neutral = localStorage.getItem('neutral');
  //   const bad = localStorage.getItem('bad');
  //   const parseGood = JSON.parse(good);
  //   const parseNeutral = JSON.parse(neutral);
  //   const parseBad = JSON.parse(bad);
  //   if (parseGood && parseNeutral && parseBad) {
  //     this.setState({
  //       good: parseGood,
  //       neutral: parseNeutral,
  //       bad: parseBad,
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { good, neutral, bad } = this.state;
  //   if (good !== prevState.good) {
  //     localStorage.setItem('good', JSON.stringify(good));
  //   }
  //   if (neutral !== prevState.neutral) {
  //     localStorage.setItem('neutral', JSON.stringify(neutral));
  //   }
  //   if (bad !== prevState.bad) {
  //     localStorage.setItem('bad', JSON.stringify(bad));
  //   }
  // }

  const clickHandler = event => {
    const { name } = event.target;
    if (name === 'good') {
      setGood(prevGood => prevGood + 1);
    } else if (name === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else if (name === 'bad') {
      setBad(prevBad => prevBad + 1);
    }
  };

  const total = useMemo(() => {
    return good + neutral + bad;
  }, [good, neutral, bad]);

  const positivePercentage = useMemo(() => {
    return Math.round((good / total) * 100);
  }, [good, total]);

  //метод зброса состаяний на 0👇

  const resetState = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  };

  return (
    <Layout>
      <h1>Home Work #2.2</h1>
      <Section title="Phonebook"></Section>
      <CardInterface>
        <Section title="Please leave feedback">
          <FeedbackOptions onLeaveFeedback={clickHandler} />
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
        <button type="button" onClick={resetState}>
          Reset
        </button>
      </CardInterface>
    </Layout>
  );
};

export default Feedback;
