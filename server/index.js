require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');
const data = require('./data.json');

app.use(express.json());
// app.use(express.static('../client/'))

app.get('/', async (req, res) => {
  // await db.Patient.create({
  //   name: 'Tendo',
  // });
  // await db.Question.bulkCreate([
  //   {
  //     content:
  //       'Hi [Patient], on a scale of 1-10, would you recommend Dr [Doctor] to a friend or family member? 1 = Would not recommend, 10 = Would strongly recommend',
  //     question_type: 'rating',
  //   },
  //   {
  //     content:
  //       'Thank you. You were diagnosed with [Diagnosis]. Did Dr [Doctor Last Name] explain how to manage this diagnosis in a way you could understand?',
  //     question_type: 'boolean',
  //   },
  //   {
  //     content:
  //       'We appreciate the feedback, one last question: how do you feel about being diagnosed with [Diagnosis]?',
  //     question_type: 'text',
  //   },
  // ]);
});

// Returns static JSON data
app.get('/profile', (req, res) => {
  res.send(data);
});

// Returns survey questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await db.Question.findAll();
    res.send(questions);
  } catch (err) {
    res.send(err);
  }
});

// Submit question responses
app.post('/submit', async (req, res) => {
  const body = req.body;

  try {
    const data = await db.Response.bulkCreate(body);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// Returns question responses
app.get('/responses', async (req, res) => {
  const { patient_id } = req.query;
  try {
    const data = await db.Response.findAll({
      where: {
        patient_id,
      },
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
