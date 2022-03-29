import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { patientInfoState, responseState } from '../store/atoms';
import { parseContent } from '../utils';

const Summary = () => {
  const responses = useRecoilValue(responseState);
  const patientInfo = useRecoilValue(patientInfoState);
  return (
    <div>
      <CardContent>
        <SummaryContainer>
          <Typography
            style={{ color: '#00aced' }}
            fontWeight={300}
            variant='h5'
            data-cy='feedbackSummaryHeading'
            sx={{ alignSelf: 'center' }}
          >
            Thanks again! Here’s what we heard:
          </Typography>
          {responses.map((response) => (
            <Card sx={{ minWidth: 275, padding: '20px' }} key={`${response.patient_id}`}>
              <Typography>
                {response.question_id}. {parseContent(response.question?.content, patientInfo)}
              </Typography>
              <Typography color='text.secondary'>{response.content || response.rating}</Typography>
            </Card>
          ))}
        </SummaryContainer>
      </CardContent>
    </div>
  );
};

export default Summary;

const SummaryContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});
