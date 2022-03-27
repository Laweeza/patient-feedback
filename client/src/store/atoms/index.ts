import { atom } from 'recoil';
import { QuestionProps } from '../../components/Question';

export type QuestionResponse = {
  question_id: number;
  patient_id: number;
  content?: string;
  rating?: number;
  question?: QuestionProps;
};

export const responseState = atom<QuestionResponse[]>({
  key: 'responseState',
  default: [],
});

export type PatientInfo = {
  id: number;
  name: string;
  doctor: string;
  diagnosis: string;
};

export const patientInfoState = atom<PatientInfo>({
  key: 'patientInfoState',
  default: {
    id: 1,
    name: '',
    doctor: '',
    diagnosis: '',
  },
});
