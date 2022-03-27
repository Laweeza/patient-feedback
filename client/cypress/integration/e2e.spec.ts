// import cy from 'cypress';

describe('Patient feedback end to end.', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should verify that the questions are there.', () => {
    cy.get('[data-cy="feedbackHeading"]').contains('How was your appointment?');
    cy.get('[data-cy="question1"]').contains(
      '1. Hi Tendo, on a scale of 1-10, would you recommend Dr. Careful to a friend or family member? 1 = Would not recommend, 10 = Would strongly recommend',
    );
    cy.get('[data-cy="question2"]').contains(
      '2. Thank you. You were diagnosed with Diabetes without complications. Did Dr. Careful explain how to manage this diagnosis in a way you could understand?',
    );
    cy.get('[data-cy="question3"]').contains(
      '3. We appreciate the feedback, one last question: how do you feel about being diagnosed with Diabetes without complications?',
    );
  });

  it('should record patient responses for each question on submit.', () => {
    cy.get('[data-cy="questionRating1"]').children().contains('5').click();
    cy.get('[data-cy="questionAnswer2"]').children().contains('Yes').click();
    cy.get('[data-cy="questionFeedback3"]').type('I feel like I can manage this.');

    cy.get('[data-cy="submitFeedback"]').click();

    cy.get('[data-cy="feedbackSummaryHeading"]').contains('Thanks again! Here’s what we heard:');
  });
});
