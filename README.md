# EdTech Assistant

# Introduction

This repository serves as the front-end for the project, offering an overview of the application's features. We introduce EdTech Assistant, an application designed to enhance the teaching and learning experience for both teachers and students. EdTech Assistant offers the following features:

- **Chatapp**: Provides real-time support with web searches, answers questions, and processes uploaded PDFs for quick responses.
- **Quiz**: Enables teachers to create custom quizzes or auto-generate them using advanced AI.
- **Lesson generator**: Automatically generates lessons tailored to students’ needs based on AI insights.
- **Student issue extractor**: Analyzes assignments to identify common challenges and help teachers address them effectively.

You can access the web site from here: [Edtech Website](https://www.edtech-assistant.sbs/).

You can find the Back-end repository here: [Edtech Back-end Repository](https://github.com/anhminhnguyen3110/edtech-be).

# Table of Contents

- [Project Setup](#project-setup)
- [Tech Stack](#tech-stack)
- [Performance Testing](#performance-testing)
- [Feature Overview](#features-overview)
- [Technical Overview](#technical-overview)

# Project Setup

This project is built using Next.js. To get started with running the project locally:

1. In the root folder of the project, you’ll find a file named `.env.example`. Copy this file and rename it to `.env`.
2. Install all the necessary dependencies by running the following command:

```bash
yarn install
```

1. Start the development server using:

```bash
yarn run dev
```

or, if you prefer using npm

```bash
npm run dev
```

# Tech Stack

## Frontend ([Repository](https://github.com/anhminhnguyen3110/edtech-fe))

<div style="display: inline-block; font-size: 22px;">
    <img src="images/react.png" alt="React" width="25" height="25"> ReactJS |
    <img src="images/nextjs.png" alt="Next.js" width="25" height="25" style="border-radius: 50%;"> NextJS |
    <img src="images/socket-io.png" alt="Socket.IO" width="25" height="25" style="border-radius: 50%;"> Socket.IO |
    <img src="images/material-ui.png" alt="Material-UI" width="25" height="25"> Material-UI |
    <img src="images/seo.png" alt="SEO" width="25" height="25"> Search Engine Optimization (SEO) |
    <img src="images/vercel.png" alt="Vercel" width="25" height="25"> Vercel
</div>

## Backend

<div style="display: inline-block; font-size: 22px;">
    <img src="images/nestjs.svg" alt="NestJS" width="25" height="25"> NestJS |
    <img src="images/nodejs.png" alt="Node.js" width="25" height="25"> NodeJS |
    <img src="images/typescript.png" alt="TypeScript" width="25" height="25"> TypeScript |
    <img src="images/rabbitmq.svg" alt="RabbitMQ" width="25" height="25"> RabbitMQ |
    <img src="images/redis.svg" alt="Redis" width="25" height="25"> Redis |
    <img src="images/redis-insight.png" alt="RedisInsight" width="25" height="25"> Redis Insight |
    <img src="images/mysql.png" alt="MySQL" width="25" height="25" style="border-radius: 50%;"> MySQL |
    <img src="images/prometheus.png" alt="Prometheus" width="25" height="25" style="border-radius: 50%;"> Prometheus |
    <img src="images/grafana.svg" alt="Grafana" width="25" height="25"> Grafana |
    <img src="images/Elasticsearch.png" alt="Elasticsearch" width="25" height="25"> Elasticsearch 
</div>

## AI & Data Engineering

<div style="display: inline-block; font-size: 22px;">
    <img src="images/llm.png" alt="LLM" width="25" height="25"> Large Language Model (LLM) |
    <img src="images/VectorDB.png" alt="VectorDB" width="25" height="25" style="border-radius: 50%;"> Vector Database |
    <img src="images/Airflow.png" alt="Airflow" width="25" height="25"> Airflow |
    <img src="images/dbt.png" alt="dbt" width="75" height="25"> dbt |
    <img src="images/kafka.png" alt="Kafka" width="16" height="25"> Kafka |
    <img src="images/zoo.webp" alt="Zookeeper" width="25" height="25"> Zookeeper |
    <img src="images/delta_lake.png" alt="Delta Lake" width="25" height="25"> Delta Lake |
    <img src="images/scrapy.webp" alt="Scrapy" width="25" height="25"> Scrapy |
    <img src="images/selenium.png" alt="Selenium" width="25" height="25"> Selenium |
    🧠 Advanced Retriever-Augmented Generation (RAG)
</div>

## DevOps

<div style="display: inline-block; font-size: 22px;">
    <img src="images/kubernetes.svg" alt="Kubernetes" width="25" height="25"> Kubernetes |
    <img src="images/aks.png" alt="Azure Kubernetes Service" width="25" height="25"> Azure Kubernetes Service (AKS) |
    <img src="images/helm.png" alt="Helm" width="25" height="25" style="border-radius: 50%;"> Helm |
    <img src="images/terraform.png" alt="Terraform" width="25" height="25"> Terraform |
    <img src="images/docker.png" alt="Docker" width="25" height="16"> Docker |
    <img src="images/AzureCloud.png" alt="Azure Cloud" width="25" height="25"> Azure Cloud |
    <img src="images/porkbun.png" alt="Porkbun" width="25" height="25"> Porkbun DNS Provider |
    <img src="images/nginx.svg" alt="Nginx" width="25" height="25"> Nginx Load Balancer |
    <img src="images/CertManager.png" alt="CertManager" width="25" height="25"> CertManager |
    <img src="images/lets-encrypt.png" alt="Let's Encrypt" width="25" height="25"> Let's Encrypt |
    🔏 TLS Cluster Issuer |
    🚀 CI/CD |
    <img src="images/GitHub-Actions.png" alt="GitHub Actions" width="25" height="25"> GitHub Actions |
    <img src="images/hpa.png" alt="Horizontal Pod Autoscaling" width="25" height="25"> Horizontal Pod Autoscaling (HPA) |
    <img src="images/elk.svg" alt="ELK Stack" width="25" height="25"> ELK Stack 
    (<img src="images/Elasticsearch.png" alt="Elasticsearch" width="25" height="25"> Elasticsearch, 
    <img src="images/Logstash.png" alt="Logstash" width="25" height="25"> Logstash, 
    <img src="images/kibana.png" alt="Kibana" width="25" height="25"> Kibana, 
    <img src="images/Filebeat.png" alt="Filebeat" width="25" height="25"> Filebeat)
</div>

## Testing

<div style="display: inline-block; font-size: 22px;">
    <img src="images/jest.png" alt="Jest" width="25" height="25"> Jest |
    <img src="images/K6.svg" alt="K6" width="25" height="25"> K6 |
    <img src="images/puppeteer.png" alt="Puppeteer" width="25" height="25"> PuppeteerJS
</div>

## <!-- Divider -->

# Performance Testing

The application underwent stress testing using K6 to simulate real-world user interactions. The test was conducted in a cloud environment, allowing for scalable and realistic load conditions. Below are the key findings from the performance tests:

- **Stress Test Setup**:

  - The test simulated common user actions such as login requests, data fetching, and page navigation.
  - The test was conducted by incrementally increasing the number of concurrent users, starting from 1,000.

- **Test Results**:

  - A **peak test** was conducted over the course of one hour, gradually pushing the system to its limit.
  - At **85,000 concurrent users**, response times began to slow down, but no critical issues were observed.

![peak.png](images/peak.webp)

- At **90,000 concurrent users**, the application was pushed to its limit, leading to severe performance degradation, including slower response times, increased error rates, and eventual system failure.

![fail.png](images/fail.png)

- **Cloud Environment**:

  - The stress test was executed in a cloud environment, which provided the necessary scalability and reliable infrastructure to simulate high loads.

- **Analysis & Bottlenecks**:
  - K6 metrics and system logs were thoroughly analyzed to identify resource bottlenecks that caused the system failure at 90,000 users.
  - These insights are being used to optimize the application for better performance and future scalability.

# Features Overview

This section provides a quick overview of the main features of our platform. For more detailed information, follow the links provided for each feature.

| Feature                              | Description                                                         | Detailed Document                           |
| ------------------------------------ | ------------------------------------------------------------------- | ------------------------------------------- |
| **Chat Application**                 | Integrated chat system with web search and custom knowledge base.   | [View Details](documents/chatApp.md)        |
| **Real-Time Multiplayer Game**       | A game supporting unlimited players with real-time competition.     | [View Details](documents/game.md)           |
| **Game Dashboard**                   | Performance insights and analytics dashboard for teachers.          | [View Details](documents/gameDashboard.md)  |
| **Email Authentication**             | Secure sign-up and sign-in process with email verification.         | [View Details](documents/signInSignUp.md)   |
| **Assignment and Class List**        | Manage assignments and class lists easily within the system.        | [View Details](documents/assignment.md)     |
| **AI-Generated Lessons and Quizzes** | Automatically create personalized lessons and quizzes for students. | [View Details](documents/lessonAndQuiz.md)  |
| **Player Performance Analysis**      | Track student performance over time with AI-generated insights.     | [View Details](documents/performance.md)    |
| **Quiz System**                      | Create, modify, and manage quizzes seamlessly.                      | [View Details](documents/quiz.md)           |
| **Identify Common Patterns**         | Detect common student performance issues through AI insights.       | [View Details](documents/issues.md)         |
| **Sample Lesson PPT**                | A sample lesson PowerPoint file for teacher reference.              | [Download Sample](images/Chloe-lesson.pptx) |

## Chat Application with Integrated Web Search and Custom Knowledge Base for the Education Domain

### Education-Specific Platform with Comprehensive Knowledge Base to Assist Teachers

![Education Focus.gif](gifs/Education_Focus.gif)

### Persistent Chat with Memory and Effective Resolution of Ambiguous Messages

![Multi turn conversation.gif](gifs/Multi_turn_conversation.gif)

### Intelligent Conversations with File Reading

![History + PDF Upload.gif](gifs/History__PDF_Upload.gif)

### Real-Time Internet Search for Up-to-Date Knowledge in Resolving User Requests

![Online search + table + keep chat in different field.gif](gifs/Online_search__table__keep_chat_in_different_field.gif)

### Advanced Reasoning Engine to Handle Ambiguous Questions

![Ambigiuos Question.gif](gifs/Ambigiuos_Question.gif)

### Effective Handling of Non-Education Related Questions

![Non-educational questions (biomedical field), Chat history.gif](<gifs/Non-educational_questions_(biomedical_field)_Chat_history.gif>)

### Recommendation System to Showcase All Available Chat Features

![Recommendation.gif](gifs/Recommendation.gif)

### Option to Resume or Delete Chats as Needed

![View + Continue chat conversation + Delete.gif](gifs/View__Continue_chat_conversation__Delete.gif)

## Live Multiplayer Game with Unlimited Players in Real-Time

### Game Screen for Host

![teacher-overalll.gif](gifs/teacher-overalll.gif)

### Game Screen for Player

![student-overall.gif](gifs/student-overall.gif)

### Additional Views

- **Different Types of Questions for Players**
  ![question-types.gif](gifs/question-types.gif)

## Game Dashboard for Performance Insights and Analytics

### Dashboard Overview

![game-dashboard.gif](gifs/game-dashboard.gif)

## Player Performance Analysis Over Time

![performance.gif](gifs/performance.gif)

## Quiz System

### Create Custom Quizzes Instantly with AI-Powered Instructions

![generate-quiz-with-prompt.gif](gifs/generate-quiz-with-prompt.gif)

### Manually Create a New Quiz

![quiz-creation.gif](gifs/quiz-creation.gif)

### Delete a Quiz

![delete-quiz.gif](gifs/delete-quiz.gif)

### Create and Delete Questions

![create-delete-question.gif](gifs/create-delete-question.gif)

### Modify Questions and Preview Their In-Game Display

![question-edit.gif](gifs/question-edit.gif)

### Add Images to a Question

![add-image.gif](gifs/add-image.gif)

## AI-Generated Lessons and Quiz Tailored to Address Student Challenges

### Generating Lessons

![6 - Generate lesson.gif](gifs/6_-_Generate_lesson.gif)

### Lesson Example

![7 - Lesson showing.gif](gifs/7_-_Lesson_showing.gif)

### Generate Quiz

![6 - Generate Quiz.gif](gifs/8-Generate_quiz.gif)

### View and Edit Generated Quiz

![6 - Edit Quiz.gif](gifs/9-Edit_Generate_quiz.gif)

## Identify Common Patterns in Student Performance with AI-Extracted Insights from Class Assignments

### Extracting Process

![4- Class + Extract Issues + Instruction.gif](gifs/4-_Class__Extract_Issues__Instruction.gif)

### Manually Add and Edit Issues

![5 - Add + Edit Issues.gif](gifs/5_-_Add__Edit_Issues.gif)

## Assignment and Class List

![3 - Assignment.gif](gifs/3_-_Assignment.gif)

## Email Authentication for Secure Sign-Up and Sign-In

![1 - Sign in Sign up.gif](gifs/1_-_Sign_in_Sign_up.gif)

# Technical Overview

The front-end application is built using Next.js, with the application’s routing structure illustrated in the following image. More detailed technical implementation can be viewed [technical](./documents/technical.md).

![uploadimagesimage.png](./images/image.png)
