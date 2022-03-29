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
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import { parseContent } from '../utils';

export type QuestionProps = {
  id: number;
  content: string;
  question_type: string;
  handleNext?: () => any;
  handlePrevious?: () => any;
};

const Question = ({ id, content, question_type, handleNext, handlePrevious }: QuestionProps) => {
  const [rating, setRating] = useState(5);
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
      <Slider
        key={`slider-${rating}`}
        data-cy={`questionRating${id}`}
        defaultValue={rating}
        min={1}
        max={10}
        marks={Array.from(Array(10)).map((_, i) => ({ label: i + 1, value: i + 1 }))}
        onChange={(e, value) => setRating(Number(value))}
      />
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
          <FormControlLabel value='yes' control={<Radio />} label='Yes' labelPlacement='end' />
          <FormControlLabel value='no' control={<Radio />} label='No' labelPlacement='end' />
        </RadioGroup>
        {answer === 'no' ? (
          <Input
            placeholder='How could the visit have been better?'
            onChange={(e) => setFeedBack('No. ' + e.target.value)}
            fullWidth
          />
        ) : null}
      </>
    );
  } else if (question_type === 'text') {
    response = (
      <TextField
        placeholder='Tell us how you feel.'
        data-cy={`questionFeedback${id}`}
        multiline
        fullWidth
        maxRows={4}
        onChange={(e) => setFeedBack(e.target.value)}
      />
    );
  }

  return (
    <QuestionContainer>
      <Card sx={{ padding: '24px', width: '-webkit-fill-available', boxShadow: 2 }}>
        <Typography data-cy={`question${id}`}>{parseContent(content, patientInfo)}</Typography>
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

const PrettoSlider = styled(Slider)({
  color: '#00aced',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 14,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#00aced',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});
