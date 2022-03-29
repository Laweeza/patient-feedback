require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const patientData = require('./data.json');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Returns static JSON data
app.get('/profile', (req, res) => {
  res.status(200).send(patientData);
});

// Returns survey questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await db.Question.findAll();
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Submit question responses, and responds with patient's feedback as well as associated questions
app.post('/submit', async (req, res) => {
  const body = req.body;
  const patient_id = body[0].patient_id;

  try {
    //Check to see if patient has already submitted responses
    const submitted = await db.Response.findAll({ where: { patient_id } });
    if (submitted.length) {
      res.status(409).send({ message: 'You already submitted your responses.' });
      return;
    }

    await db.Response.bulkCreate(body);
    const responses = await db.Response.findAll({
      where: { patient_id },
      include: { model: db.Question, as: 'question' },
      order: [['question_id', 'ASC']],
    });
    res.status(201).send(responses);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Returns patient's responses to the questions
app.get('/responses', async (req, res) => {
  const { patient_id } = req.query;
  try {
    const data = await db.Response.findAll({
      where: {
        patient_id,
      },
      order: [['question_id', 'ASC']],
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//For resetting the demo
app.delete('/responses', async (req, res) => {
  try {
    await db.Response.destroy({ truncate: true, cascade: false });
    res.send('Deleted responses');
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.PORT, async () => {
  console.log(`app listening on port ${process.env.PORT}`);

  const patient = await db.Patient.findAll();

  if (!patient.length) {
    await db.Patient.create({
      name: 'Tendo',
    });
    await db.Question.bulkCreate([
      {
        content: `Hi [Patient], on a scale of 1-10, would you recommend Dr. [Doctor] to a friend or family member?
          1 = Would not recommend, 10 = Would strongly recommend`,
        question_type: 'rating',
      },
      {
        content:
          'Thank you. You were diagnosed with [Diagnosis]. Did Dr. [Doctor] explain how to manage this diagnosis in a way you could understand?',
        question_type: 'boolean',
      },
      {
        content:
          'We appreciate the feedback, one last question: how do you feel about being diagnosed with [Diagnosis]?',
        question_type: 'text',
      },
    ]);
  }
});
