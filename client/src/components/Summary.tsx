import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { patientInfoState, responseState } from '../store/atoms';
import { parseContent } from '../utils';

const Summary = () => {
  const responses = useRecoilValue(responseState);
  const patientInfo = useRecoilValue(patientInfoState);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography data-cy='feedbackSummaryHeading'>
          Thanks again! Here’s what we heard:
        </Typography>
        {responses.map((response) => (
          <div>
            <Typography>
              {response.question_id}. {parseContent(response.question?.content, patientInfo)}
            </Typography>
            <Typography color='text.secondary'>{response.content || response.rating}</Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Summary;
