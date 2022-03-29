import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@mui/material';
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
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
          {responses.length ? (
            <Typography
              style={{ color: '#00aced' }}
              fontWeight={300}
              variant='h5'
              data-cy='feedbackSummaryHeading'
              sx={{ alignSelf: 'center' }}
            >
              Thanks again! Here’s what we heard:
            </Typography>
          ) : (
            <Card>
              <Typography
                style={{ color: '#00aced' }}
                fontWeight={300}
                variant='h6'
                data-cy='feedbackSummaryHeading'
                sx={{ alignSelf: 'center', padding: 5 }}
              >
                We have already recorded your responses. Thank you!
                <div style={{ display: 'inline-block', paddingLeft: 10 }}>
                  <ThumbUpAltSharpIcon />
                </div>
              </Typography>
            </Card>
          )}
          {responses.map((response) => (
            <Card sx={{ minWidth: 275, padding: '20px' }} key={`${response.patient_id}`}>
              <Typography whiteSpace={'pre-line'}>
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
