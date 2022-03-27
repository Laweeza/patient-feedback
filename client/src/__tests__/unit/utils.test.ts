import { parseContent } from '../../utils';

describe('Parse Content', () => {
  it('should parse the patient, doctor, and diagnosis of question script', () => {
    const expected = 'This is a test. Dr Careful told Tendo they had Diabetes.';
    const content = 'This is a test. Dr [Doctor] told [Patient] they had [Diagnosis].';
    const patientInfoState = {
      id: 1,
      name: 'Tendo',
      doctor: 'Careful',
      diagnosis: 'Diabetes',
    };

    expect(parseContent(content, patientInfoState)).toBe(expected);
  });
});
