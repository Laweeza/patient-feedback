DROP DATABASE IF EXISTS patient_feedback;

CREATE DATABASE patient_feedback;

USE patient_feedback;

CREATE TABLE questions (
 id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
 content VARCHAR(255),
 question_type VARCHAR(255)
);

CREATE TABLE patients (
 id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
 name VARCHAR(255)
);

CREATE TABLE responses (
 content TEXT,
 rating INT,
 question_id INT,
 FOREIGN KEY (question_id) REFERENCES questions(id),
 patient_id INT,
 FOREIGN KEY (patient_id) REFERENCES patients(id)
);
