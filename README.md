# Patient Feedback

The purpose of this program is to collect patient feedback after their doctor appointments.

[Getting Started](#getting-started) •
[System Architecture](#system-architecture) •
[Wireframes](#wireframes) •
[Technologies](#technologies) •
[Technical Challenges](#technical-challenges)

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

## Wireframes

![Feedback Wireframe](https://user-images.githubusercontent.com/56424589/160701225-26430b1a-f35d-4250-bf1d-7b6b083d1dfc.png)
[Figma Link](https://www.figma.com/file/Ut3mpv60IjkyeKnpqN0g9O/Feedback-Wireframe?node-id=0%3A1)

## Technologies

| Front End                        | Testing                            | Back End                            | Deployment                |
| -------------------------------- | --------------------------------   | ----------------------------------- | ------------------------- |
| [React](https://reactjs.org/)    | [RTL](https://testing-library.com/)| [MySQL](https://www.mysql.com/)     | [Docker](www.docker.com/) |
| [Recoil](https://recoiljs.org/)  | [Cypress](https://go.cypress.io)   | [Sequelize](https://sequelize.org/) |                           |
| [Axios](https://axios-http.com/) |                                    | [Express](https://expressjs.com/)   |                           |
| [MUI](https://mui.com/)          |                                    |                                     |                           |
| [Emotion](https://emotion.sh)    |                                    |                                     |                           |

## Technical Challenges
[Notion Journal](https://zesty-spur-a63.notion.site/Patient-Feedback-970e8904cf7645a3b313c75711f44893)


