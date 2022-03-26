var DataTypes = require('sequelize').DataTypes;
var _patients = require('./patients');
var _questions = require('./questions');
var _responses = require('./responses');

function initModels(sequelize) {
  var Patient = _patients(sequelize, DataTypes);
  var Question = _questions(sequelize, DataTypes);
  var Response = _responses(sequelize, DataTypes);

  Response.belongsTo(Patient, { as: 'patient', foreignKey: 'patient_id' });
  Patient.hasMany(Response, { as: 'responses', foreignKey: 'patient_id' });
  Response.belongsTo(Question, { as: 'question', foreignKey: 'question_id' });
  Question.hasMany(Response, { as: 'responses', foreignKey: 'question_id' });

  Response.removeAttribute('id');

  return {
    Patient,
    Question,
    Response,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
