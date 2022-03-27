/* eslint-disable react-hooks/exhaustive-deps */
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Question, { QuestionProps } from './components/Question';
import Summary from './components/Summary';
import { patientInfoState, responseState } from './store/atoms';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const setPatientInfo = useSetRecoilState(patientInfoState);
  const [responses, setResponses] = useRecoilState(responseState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getPatientData();
    getQuestions();
  }, []);

  const getPatientData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile`);
      const { resource: patient } = data.entry.find((e) => e.resource.resourceType === 'Patient');
      const { resource: doctor } = data.entry.find((e) => e.resource.resourceType === 'Doctor');

      const { resource: diagnosis } = data.entry.find(
        (e) => e.resource.resourceType === 'Diagnosis',
      );

      setPatientInfo({
        id: 1,
        name: patient.name[0].given[0],
        doctor: doctor.name[0].family,
        diagnosis: diagnosis.code.coding[0].name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getQuestions = async () => {
    try {
      const { data: questionsData } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/questions`,
      );
      console.log(questionsData);
      setQuestions(questionsData);

      let temp = [
        ...responses,
        ...questionsData.map(({ id }) => ({ patient_id: 1, question_id: id })),
      ];
      setResponses(temp);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: responseData } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/submit`,
        responses,
      );

      setResponses(responseData);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContainer>
      {isSubmitted ? (
        <Summary />
      ) : (
        <>
          <Typography variant='h5' data-cy='feedbackHeading'>
            How was your appointment?
          </Typography>
          <QuestionsContainer>
            {questions.map((question, i) => (
              <Question key={question.id} {...question} />
            ))}
          </QuestionsContainer>
          <Button
            data-cy='submitFeedback'
            onClick={handleSubmit}
            color='primary'
            variant='contained'
          >
            Submit
          </Button>
        </>
      )}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f2f2f4',
});

const QuestionsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
  padding: '16px',
});