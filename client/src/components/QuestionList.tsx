import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, createTheme, Typography } from '@mui/material';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Question, { QuestionProps } from './Question';
import './styles.css';

type Props = {
  questions: QuestionProps[];
  handleSubmit: () => any;
};

declare module '@mui/material/styles' {
  interface Palette {
    palette: Palette['primary'];
  }
}

const QuestionList = ({ questions, handleSubmit }: Props) => {
  const [position, setPosition] = useState(0);
  const [transitionState, setTransitionState] = useState(false);

  const handleNext = () => {
    if (position + 1 < questions.length) {
      setPosition((position) => position + 1);
      setTransitionState((transitionState) => !transitionState);
    } else {
      return;
    }
  };

  const handlePrevious = () => {
    if (position <= questions.length && position > 0) {
      setPosition((position) => position - 1);
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
          <Question
            {...questions[position]}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </CSSTransition>
      </QuestionsContainer>
      <div style={{ display: 'inline-block' }}>
        {position !== 0 && (
          <ThemeProvider theme={theme}>
            <Button
              data-cy='previousQuestion'
              onClick={handlePrevious}
              color='primary'
              variant='outlined'
              sx={{ margin: '10px', minWidth: '100px' }}
            >
              Previous
            </Button>
          </ThemeProvider>
        )}
        {position === questions.length - 1 ? (
          <ThemeProvider theme={theme}>
            <Button
              data-cy='submitFeedback'
              onClick={handleSubmit}
              color='primary'
              variant='contained'
              sx={{ margin: '10px', minWidth: '100px' }}
            >
              Submit
            </Button>
          </ThemeProvider>
        ) : (
          <ThemeProvider theme={theme}>
            <Button
              color='primary'
              variant='contained'
              data-cy='nextQuestion'
              onClick={handleNext}
              sx={{ margin: '10px', minWidth: '100px' }}
            >
              Next
            </Button>
          </ThemeProvider>
        )}
      </div>
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#00aced',
      contrastText: '#fff',
    },
  },
});
