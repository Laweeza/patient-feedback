# Patient Feedback

The purpose of this program is to collect patient feedback after their doctor appointments.

[Getting Started](#getting-started) •
[System Architecture](#system-architecture) •
[Technologies](#technologies)

## For Local Development

- See `/server` [README](https://github.com/Laweeza/patient-feedback/tree/main/server) for instructions for web service.
- See `/client` [README](https://github.com/Laweeza/patient-feedback/tree/main/client)

## Getting Started

To start up the application, please run:

```
docker-compose up
```

## System Architecture

![Architecture Diagram](https://user-images.githubusercontent.com/56424589/160459605-6b9653ee-b5a3-4fdb-abaa-e7dd6aa46e64.png)

## API Methods

| Request Type | Endpoint   | What it does                                      | Status |
| :----------: | ---------- | ------------------------------------------------- | :----: |
|     GET      | /profile   | Returns static JSON data                          |  200   |
|     GET      | /questions | Returns the questions                             |  200   |
|     GET      | /responses | Returns patient responses to questions            |  200   |
|     POST     | /submit    | Submits patient feedback and associated questions |  201   |

## Technologies

| Front End                        | Testing                          | Back End                            | Deployment                |
| -------------------------------- | -------------------------------- | ----------------------------------- | ------------------------- |
| [React](https://reactjs.org/)    | [Jest](https://jestjs.io/)       | [MySQL](https://www.mysql.com/)     | [Docker](www.docker.com/) |
| [Recoil](https://recoiljs.org/)  | [Cypress](https://go.cypress.io) | [Sequelize](https://sequelize.org/) |                           |
| [Axios](https://axios-http.com/) |                                  | [Express](https://expressjs.com/)   |                           |
| [MUI](https://mui.com/)          |                                  |                                     |                           |
| [Emotion](https://emotion.sh)    |                                  |                                     |                           |
