# Patient Feedback

The purpose of this program is to collect patient feedback after their doctor appointments.

[Getting Started](#getting-started) •
[System Architecture](#system-architecture) •
[Wireframes](#wireframes) •
[Technical Challenges](#technical-challenges) •
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

## Wireframes

[Figma Link](https://www.figma.com/file/Ut3mpv60IjkyeKnpqN0g9O/Feedback-Wireframe?node-id=0%3A1)

![Feedback Layout 1](https://user-images.githubusercontent.com/56424589/160701501-064d7aa5-7c6e-4ea5-8634-40428d74e2c0.png)
![Feedback Layout 2](https://user-images.githubusercontent.com/56424589/160701560-953df5f7-8e3b-4e29-b975-2e68407af569.png)
![Feedback Layout 3](https://user-images.githubusercontent.com/56424589/160701628-89170afd-ba6e-43ca-9764-d1793eb42ae8.png)




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


