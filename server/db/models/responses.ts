module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Response',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'questions',
          key: 'id',
        },
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'responses',
      timestamps: false,
      indexes: [
        {
          name: 'question_id',
          using: 'BTREE',
          fields: [{ name: 'question_id' }],
        },
        {
          name: 'patient_id',
          using: 'BTREE',
          fields: [{ name: 'patient_id' }],
        },
      ],
    },
  );
};
