export const parseContent = (content: string | undefined, patientInfo: any) => {
  if (!content) {
    return;
  }

  let modifiedContent = content.replace(/\[Patient\]/g, patientInfo.name);
  modifiedContent = modifiedContent.replace(/\[Doctor\]/g, patientInfo.doctor);
  modifiedContent = modifiedContent.replace(/\[Diagnosis\]/g, patientInfo.diagnosis);

  return modifiedContent;
};
