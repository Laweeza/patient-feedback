/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { patientInfoState, responseState } from '../store/atoms';
import {
  Card,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { parseContent } from '../utils';

export type QuestionProps = {
  id: number;
  content: string;
  question_type: string;
};

const Question = ({ id, content, question_type }: QuestionProps) => {
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedBack] = useState('');
  const patientInfo = useRecoilValue(patientInfoState);
  const [responses, setResponses] = useRecoilState(responseState);

  useEffect(() => {
    let temp = [
      ...responses.filter(({ question_id }) => question_id !== id),
      {
        patient_id: 1,
        question_id: id,
        content: feedback || answer,
        rating,
      },
    ];
    setResponses(temp);
  }, [rating, answer, feedback]);

  let response: any = null;

  if (question_type === 'rating') {
    response = (
      <RadioGroup
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        style={radioStyles}
        row
        data-cy={`questionRating${id}`}
      >
        {Array.from(Array(10)).map((_, i) => (
          <FormControlLabel
            key={i}
            value={i + 1}
            control={<Radio />}
            label={i + 1}
            labelPlacement='bottom'
          />
        ))}
      </RadioGroup>
    );
  } else if (question_type === 'boolean') {
    response = (
      <>
        <RadioGroup
          data-cy={`questionAnswer${id}`}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          style={radioStyles}
        >
          <FormControlLabel value='yes' control={<Radio />} label='Yes' labelPlacement='bottom' />
          <FormControlLabel value='no' control={<Radio />} label='No' labelPlacement='bottom' />
        </RadioGroup>
        {answer === 'no' ? (
          <Input
            placeholder='Please elaborate'
            onChange={(e) => setFeedBack(e.target.value)}
            fullWidth
          />
        ) : null}
      </>
    );
  } else if (question_type === 'text') {
    response = (
      <TextField
        placeholder='Input feedback here'
        data-cy={`questionFeedback${id}`}
        multiline
        fullWidth
        rows={2}
        maxRows={4}
        onChange={(e) => setFeedBack(e.target.value)}
      />
    );
  }

  return (
    <QuestionContainer>
      <Card sx={{ padding: '24px' }}>
        <Typography data-cy={`question${id}`}>
          {id}. {parseContent(content, patientInfo)}
        </Typography>
        {response}
      </Card>
    </QuestionContainer>
  );
};

export default Question;

const QuestionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const radioStyles = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
} as React.CSSProperties;
