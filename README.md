# Introduction

In this repo, we introduce EdTech Assistant, an application designed to enhance the teaching and learning experience for both teachers and students. EdTech Assistant offers the following features:

- **Chatapp**: Provides real-time support with web searches, answers questions, and processes uploaded PDFs for quick responses.
- **Quiz**: Enables teachers to create custom quizzes or auto-generate them using advanced AI.
- **Lesson generator**: Automatically generates lessons tailored to students' needs based on AI insights.
- **Student issue extractor**: Analyzes assignments to identify common challenges and help teachers address them effectively.

# Table of Contents

- [Getting Started](#getting-started)
- [Feature Overview](#features-overview)
- [Technical Overview](#technical-overview)

# Getting Started

This project is built using Next.js. To get started with running the project locally:

1. In the root folder of the project, you’ll find a file named `.env.example`. Copy this file and rename it to `.env`.
2. Install all the necessary dependencies by running the following command:

```bash
yarn add
```

1. Start the development server using:

```bash
yarn run dev
```

or, if you prefer using npm

```bash
npm run dev
```

# Features Overview

## Login/ Sign-Up

### Sign-Up

The application provides a way to register a new account and activate the account through email

![sign-up.png](images/sign-up.png)

after clicking the email the user will be navigated to this page

<p align="center">
  <img src="images/image%206.png" alt="image.png">
</p>

### Login

Login will be done with the email and password set up before.

<p align="center">
  <img src="images/image%207.png" alt="image.png">
</p>

## Chat Application

### Search Web

After logging in, the user is directed to the chat page. The chat application is highly effective because it provides real-time data retrieval, allowing users to search and access the most current information. Below is a demonstration showcasing this functionality.

<p align="center">
  <img src="images/Chat-AppOverView.gif" alt="Chat-AppOverView.gif">
</p>

### Suggestion

The chat application is enriched with a comprehensive knowledge base focused on the education domain. To help users maximise its potential, we have included a button that lists all available suggestions and knowledge areas. Users can select these as a reference to fully leverage the chat application's capabilities.

<p align="center">
  <img src="images/Chat-AppSuggestion.gif" alt="Chat-AppSuggestion.gif">
</p>

### File Handling

The chat application also supports PDF file handling, allowing users to upload a file and provide responses or answers based on its content.

<p align="center">
  <img src="images/Chat-AppFile.gif" alt="Chat-AppFile.gif">
</p>

files can also be uploaded inside the chat itself

<p align="center">
  <img src="images/Chat-AppFileinChat.gif" alt="Chat-AppFileinChat.gif">
</p>

### Question Follow-Up

Our chat application supports follow-up questions by maintaining a conversation history, enabling the model to reference previous messages and provide context-aware responses within the same chat.

<!-- ![Chat-AppFollowUp.gif](images/Chat-AppFollowUp.gif) -->
<p align="center">
  <img src="images/Chat-AppFollowUp.gif" alt="Chat-AppFollowUp.gif">
</p>

## Quiz

The quiz system provides exceptional flexibility, allowing users to customize quizzes and questions while choosing from various question types. Additionally, it offers the option to generate quizzes using our AI models, requiring only a few instructions (prompts) to automate the process and deliver exactly what users need efficiently.

### Create Quiz

You can create a new quiz by clicking the create quiz button and click edit button at the top to edit the name, and click the add question to add a new question

<p align="center">
  <img src="images/Quiz-Create.gif" alt="Quiz-Create.gif">
</p>

### Edit Question

You can edit the question text, modify the answers, and specify the correct ones. There are three types of questions to choose from: **Multiple Choice**, where only one correct answer is accepted with four possible options; **Multiple Answer**, where more than one correct answer can be specified; and **True/False**, which only allows two possible answers. Any changes made to a question require clicking **Save** to apply the updates or **Delete** to remove the question entirely. Additionally, when hovering over a question in the left panel for more than one second, a preview will appear, showing how the quiz will look during the game.

<p align="center">
  <img src="images/Quiz-EditQuestion.gif" alt="Quiz-EditQuestion.gif">
</p>

### Upload Image for Question

You can also upload an image for a question to enrich the content like this example and hover over a question to preview how it would look like while playing in game.

<p align="center">
  <img src="images/Quiz-UploadImage.gif" alt="Quiz-UploadImage.gif">
</p>

### Generate Quiz

Our application also supports automatic quiz generation based on user instructions, streamlining the quiz preparation process. Users can also specify the types of questions they want to include in the quiz.

<p align="center">
  <img src="images/Chat-Generate.gif" alt="Chat-Generate.gif">
</p>

## Game

To host a quiz, simply click the "Host Live" button to start the quiz and play with students in real-time.

### Lobby Page for Teacher

<p align="center">
  <img src="images/image%208.png" alt="image%208.png">
</p>

Lobby page for the teacher to wait for students to join

### Player Join

Students don't need an account to join the quiz. They can simply navigate to the home page, click "Join," and enter the game code along with their name to participate.

<p align="center">
  <img src="images/Game-PlayerJoin.gif" alt="Game-PlayerJoin.gif">
</p>

### Waiting Page

Once the teacher finalises the player list and starts the game, their screen will display the quiz name and the total number of questions included in the quiz.

![image.png](images/image%209.png)

### Waiting Page before each Question

Before each question, there is a 6-second waiting page to ensure that all players have received the question data. This buffer ensures that when the question begins, every player has an equal opportunity to answer without experiencing delays. This page also allows students to read the question first and prepare the answer first

<p align="center">
  <img src="images/image%2010.png" alt="image%2010.png">
</p>

Ready Page for students:

<p align="center">
  <img src="images/image%2011.png" alt="image%2011.png">
</p>

### Question Page

During the question page, the teacher can skip the question once at least one student has answered. After the question ends, the correct answer will be displayed, along with basic statistics such as the number of students who selected each answer.

<p align="center">
  <img src="images/Game-Control.gif" alt="Game-Control.gif">
</p>

Students can answer questions, such as multiple-choice, by selecting their responses and submitting them. After submission, they will wait for the teacher to finalize the question, at which point the results will be displayed.

<p align="center">
  <img src="images/Game-PlayerAnswer.gif" alt="Game-PlayerAnswer.gif">
</p>

### Result Page

after the teacher clicks next button after finish each question, the current scoreboard will be presented

<p align="center">
  <img src="images/image%2012.png" alt="image%2012.png">
</p>

Each student will be shown their earned score after answering a question. If they answer incorrectly, a separate screen will display indicating the incorrect response.

<p align="center">
  <img src="images/image%2013.png" alt="image%2013.png">
</p>

### Final Scoreboard

After all the questions are completed, the teacher's screen will display a scoreboard showing the top 3 players.

<p align="center">
  <img src="images/image%2014.png" alt="image%2014.png">
</p>

And each student will be presented with the score and rank in the game.

<p align="center">
  <img src="images/image%2015.png" alt="image%2015.png">
</p>

## Notification

Our application includes a notification feature to alert users when long-running tasks are completed or special events occur. Notifications are stored in a list, categorised as read or unread. To mark a notification as read, users simply need to click on it.

<p align="center">
  <img src="images/Noti-List.gif" alt="Noti-List.gif">
</p>

Example of notfication for long running tasks

<p align="center">
  <img src="images/image%2016.png" alt="image%2016.png">
</p>

## Assignment

The assignment page is an exclusive feature available to select users, providing specialized information tailored to track student progress for specific assignments. To access this feature, please contact our admin, [Minh Nguyen](mailto:nganhminh2003@gmail.com) or [Hung Tran](mailto:hungtrangia2003@gmail.com), via email.

### Assigment List

when you first enter the page you will see a list of available assignments assigned to you account. you can also search for a specific assignment you want to look into.

<p align="center">
  <img src="images/Assignment-List.gif" alt="Assignment-List.gif">
</p>

### Assignment Detail

When selecting an assignment, you will be presented with the assignment details, including the rubric and a list of classes associated with that assignment.

<p align="center">
  <img src="images/Assignment-Detail.gif" alt="Assignment-Detail.gif">
</p>

### Detail for a Class in an Assignment

After clicking "View" for a class in an assignment, you will be directed to a detailed page showing a list of extracted issues, generated lessons, and quizzes for that class. Upon entering the page, you can access rules and guidance for easier navigation by clicking the question mark button in the bottom-right corner.

<p align="center">
  <img src="images/Assignment-Instruction.gif" alt="Assignment-Instruction.gif">
</p>

**Issue Extraction**

The application extracts common issues identified for the entire class in an assignment. However, the issue extraction function is not triggered automatically from students' work. Users must manually initiate this process when first entering the class page for an assignment. The automatic issue extraction feature can only be used if no issues have already been identified in the list.

<p align="center">
  <img src="images/Assignment-ExtractIssue.gif" alt="Assignment-ExtractIssue.gif">
</p>

The extraction process can take up to 10 minutes. During this time, you can perform other tasks, and a notification will pop up when the process is complete, as shown in the example. If you choose to stay on the page, it will automatically load the issues once the process is finished, thanks to WebSocket, which receives real-time updates. Once you used the automatic issue extraction you can only re-use it after 2 hours.

**Issues Editing**

You can manually add or edit issues if needed. However, there is a limit of 10 issues that can be added.

<p align="center">
  <img src="images/Assignment-EditIssue.gif" alt="Assignment-EditIssue.gif">
</p>

**Lesson Generating**

Lessons can only be generated if at least one issue has been identified. To generate a lesson, click the "Generate Lesson" button and specify the desired file name. Once the lesson is generated, you can download it to view the content.

<p align="center">
  <img src="images/Assignment-LessonGenerate.gif" alt="Assignment-LessonGenerate.gif">
</p>

**Lesson Name Editing**

Once a lesson is generated, you can rename it as desired. There is a limit of five lessons per class in an assignment. If you wish to generate additional lessons, you will need to delete existing ones first.

<p align="center">
  <img src="images/Assignment-LessonEdit.gif" alt="Assignment-LessonEdit.gif">
</p>

**Quiz Generate**

You can also generate quizzes to create interactive lessons based on the identified issues in the class. To do so, click the "Generate Quiz" button and select the types of questions you want to include. To edit a quiz, click the "Edit" button, which will navigate you to the quiz editing page, where you can modify the quiz as needed.

<p align="center">
  <img src="images/Assignment-Quiz.gif" alt="Assignment-Quiz.gif">
</p>

# Technical Overview

The front-end application is built using Next.js, with the application's routing structure illustrated in the following image. More detailed technical implementation can be viewed [here](./documents/technical.md).

<p align="center">
  <img src="images/image.png" alt="image.png">
</p>
