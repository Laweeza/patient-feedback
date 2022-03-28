import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Question, { QuestionProps } from './Question';
import './styles.css';

type Props = {
  questions: QuestionProps[];
  handleSubmit: () => any;
};

const QuestionList = ({ questions, handleSubmit }: Props) => {
  const [position, setPosition] = useState(0);
  const [transitionState, setTransitionState] = useState(false);

  const handleNext = () => {
    if (position + 1 < questions.length) {
      setPosition(position + 1);
      setTransitionState((transitionState) => !transitionState);
    } else {
      return;
    }
  };

  return (
    <>
      <QuestionsContainer>
        <Typography>
          Question {position + 1} of {questions.length}
        </Typography>
        <CSSTransition
          in={transitionState}
          addEndListener={(node, done) => {
            node.addEventListener('transitioned', done, false);
            setTransitionState(true);
          }}
          classNames='fade'
        >
          <Question {...questions[position]} handleNext={handleNext} />
        </CSSTransition>
      </QuestionsContainer>
      {position < questions.length - 1 ? (
        <Button variant='outlined' data-cy='nextQuestion' onClick={handleNext}>
          Next
        </Button>
      ) : (
        <Button data-cy='submitFeedback' onClick={handleSubmit} color='primary' variant='contained'>
          Submit
        </Button>
      )}
    </>
  );
};

export default QuestionList;

const QuestionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  padding: '16px',
});
