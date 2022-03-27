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
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';

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
        content: answer || feedback,
        rating,
      },
    ];
    setResponses(temp);
  }, [rating, answer, feedback]);

  let response: any = null;

  if (question_type === 'rating') {
    response = Array.from(Array(10)).map((_, i) => (
      <>
        <RadioGroup
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={radioStyles}
          row
        >
          <FormControlLabel
            key={i}
            value={i + 1}
            control={<Radio />}
            label={i + 1}
            labelPlacement='bottom'
          />
        </RadioGroup>
      </>
    ));
  } else if (question_type === 'boolean') {
    response = (
      <>
        <RadioGroup value={answer} onChange={(e) => setAnswer(e.target.value)} style={radioStyles}>
          <FormControlLabel value='yes' control={<Radio />} label='Yes' labelPlacement='bottom' />
          <FormControlLabel value='no' control={<Radio />} label='No' labelPlacement='bottom' />
        </RadioGroup>
        {answer === 'no' ? (
          <Input
            placeholder='Please elaborate'
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
          />
        ) : null}
      </>
    );
  } else if (question_type === 'text') {
    response = (
      <TextField
        placeholder='Input feedback here'
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
        <Typography>
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

const parseContent = (content: string, patientInfo: any) => {
  let modifiedContent = content.replace(/\[Patient\]/g, patientInfo.name);
  modifiedContent = modifiedContent.replace(/\[Doctor\]/g, patientInfo.doctor);
  modifiedContent = modifiedContent.replace(/\[Diagnosis\]/g, patientInfo.diagnosis);

  return modifiedContent;
};
