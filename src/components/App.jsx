import { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackButtons } from './FeedbackButtons/FeedbackButtons';
import { Statistics } from './Statistics/Statistics';
import { NotificationMessage } from './NotificationMessage/NotificationMessage';
import { GlobalStyle, Box } from './GlobalStyle';

export const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleChangeStats = option => {
    switch (option) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      default:
        console.warn(`We don't know that ${option} :(`);
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositivePercentage = () => {
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const handleResetStats = () => {
    setGood(0);
    setBad(0);
    setNeutral(0);
  };

  return (
    <Box>
      <Section title="Please leave your feedback">
        <FeedbackButtons
          options={Object.keys({ good, bad, neutral })}
          onChangeStats={handleChangeStats}
          onClear={handleResetStats}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <NotificationMessage message="There is no feedback, sorry!" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            percent={countPositivePercentage()}
          />
        )}
      </Section>

      <GlobalStyle />
    </Box>
  );
};