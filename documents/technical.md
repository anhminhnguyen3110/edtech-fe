# Technical Document

This document provides an in-depth look at the structure and components of the EdTech Assistant front-end project, focusing on how various contexts and providers interact to manage state and functionality across the application.

## Table of Contents

1. [Application Architecture](#application-architecture)
   - [Folder Structure](#folder-structure)
   - [Routing and Navigation](#routing-and-navigation)
   - [Page Layout Structure](#page-layout-structure)
   - [Component Layout Overview](#component-layout-overview)
2. [Communication with the Backend](#communication-with-the-backend)
   - [With API](#with-api)
   - [The use of Axios interceptor](#the-use-of-axios-interceptor)
   - [With WebSocket](#with-websocket)

## Application Architecture

### Folder Structure

```bash
/src
|
├── /components
|
├── /context
|    ├── authContext.js
|    ├── historyContext.js
|    └── ...
|
├── /hoc
|    ├── withAuth.js
|    ├── withNonAuth.js
|    └── ...
|
├── /hooks
|    └── ...
|
├── /lib
|    ├── api.js
|
├── /pages
|    ├── _app.js
|    ├── _document.js
|    ├── /assignment
|    |    └── ...
|    ├── /quiz
|    |    └── ...
|    └── ...
|
├── /styles
|    └── globals.css
|
└── /theme
     └── palette.js

```

- **/components:** Modular UI elements that are reusable across different parts of the application.
- **/context:** Global state management using React Context API, allowing shared state and logic to be accessed across multiple components.
- **/hoc:** Higher-Order Components for handling authorisation and access control to specific pages.
- **/hooks:** Custom hooks encapsulate reusable logic, providing a clean way to manage state and side effects.
- **/lib:** Shared libraries and utility functions, including a custom Axios instance for API requests.
- **/pages:** Contains all the pages of the application, with subfolders for more complex routes (e.g., `/assignment`, `/quiz`). `_app.js` and `_document.js` handle global app settings and document structure.
- **/styles:** Global styling to ensure consistency across the UI.
- **/theme:** Centralised theme settings, particularly for color palettes, making it easy to maintain and update the application’s visual style.

### Routing and Navigation

![image.png](../images/image.png)

- **/**: The root of the application. After login, users are redirected to the `/assistant` page. Once logged in, users cannot re-enter the root page and will be automatically navigated to the `/assistant` page.
- **/assistant**: The chat page where users interact with our state-of-the-art model. This is the primary interface after login, offering AI-powered assistance and interaction.
- **/auth**: Handles user authentication. This page ensures that only authorised users can access specific parts of the application.
- **/game**: A route dedicated to hosts for setting up and controlling a game session. Only authorised users can access this page.
- **/join**: A public route where players can join a game. This route does not require user authentication.
- **/lobby**: Used by hosts to manage the game session before it starts, including participant management and settings. This route is accessible only to authorised users.
- **/play**: Another public route for players to actively participate in the game or quiz. Similar to `/join`, it does not require authentication.
- **/assignment**: The base route for managing assignments. It includes:
  - **/[assignmentId]**: A dynamic route for accessing specific assignments.
  - **/[classAssignmentId]**: Within a specific assignment, this page displays the results of a class, including extracted issues and generated lessons and quizzes related to that assignment.
- **/quiz**: The base route for quizzes, with a dynamic sub-route for accessing specific quizzes (`/[quizId]`).
- **/404**: The custom 404 page for handling non-existent routes. This page ensures that users who try to access an invalid URL are shown an appropriate error message.

### Page Layout Structure

<p align="center">
  <img src="../images/image%201.png" alt="image.png">
</p>

- **AuthProvider**
  - Manages user authentication across the application.
- **HistoryProvider**
  - Handles navigation state, ensuring correct page transitions and functionality.
- **PlayerWebSocketProvider**
  - Maintains player-specific state across multiple pages for real-time interactions.
- **HostWebSocketProvider**
  - Manages game state and information for the host during game sessions.
- **getLayout(Component)**
  - Determines the layout for each component, allowing flexible page rendering.
- **Render Component**
  - The final step where the selected component is rendered within its layout.

### Component Layout Overview

<p align="center">
  <img src="../images/image%202.png" alt="image.png">
</p>

- **\_document.js**
  - Positioned at the top of the structure, `_document.js` is responsible for setting up the global HTML document structure, including SEO elements like meta tags and the `<head>` section of the page.
- **App Component**
  - The entry point of the application, the `App` component wraps around the entire application, managing global context and providing the foundation for routing and layout structure.
- **Page Component**
  - The `Page` component handles SEO and structured data for each individual page. It ensures that each page is optimised for search engines and social media by managing elements like the title, description, and open graph data.
- **Common Page Layout**
  - This component provides a consistent structure across all pages of the application. It includes key UI elements such as the `Top Bar`, `Main Content`, and `Side Bar`, ensuring a cohesive user experience.
- **Top Bar**
  - Part of the common layout, the `Top Bar` typically includes navigation elements, logo, or other global actions accessible throughout the application like logout.
- **Main Content**
  - This area is the core of the page, where the main content relevant to the current route is displayed. It adapts based on the specific page or route being accessed.
- **Side Bar**
  - Also part of the common layout, the `Side Bar` can contain additional navigation, tools, or contextual information that supports the main content.
- **Page-specific Layout**
  - Beneath the `Main Content`, the page-specific layout adjusts depending on the page, such as `/assignment`, `/quiz`, etc. Each route can introduce unique layout elements or additional components tailored to its content.

## Communication with the Backend

### With API

communication with the backend is facilitated through an instance of Axios, a popular HTTP client. This instance is configured to handle API calls efficiently and securely. Below is an example that illustrates how the API instance is used to manage the login process.

![image.png](../images/image%203.png)

The graph illustrates how the login process is handled in the application. The user submits their credentials, which are sent to the backend via an Axios instance. Upon successful authentication, tokens are stored in cookies and the user's authentication state is updated, allowing them to access the chat page.

### The use of Axios interceptor

In order to properly handle refresh token, and by doing this I can avoid repeating code for every HTTP call and interceptors can detect when an authentication token has expired. Before allowing a failed request to cause an error in the application, an interceptor can attempt to refresh the token and try the original request automatically.

![image.png](../images/image%204.png)

This diagram illustrates a simplified version of the token refresh process in the EdTech Assistant application, specifically designed to handle authorisation for API requests. When an authorised request is made, the system first checks if the current access token is expired. To prevent issues during long-running requests, the expiration time of the access token is manually set to expire 30 minutes earlier than the original one-day expiration. If the token is expired, the system sends a refresh request to the backend, which returns a new access token. This new token is then stored in cookies, and the original request is retried with the updated token, ensuring continuous and secure access to the application’s features without interruption.

### With WebSocket

WebSocket is primarily used for two tasks: real-time notifications and game interaction. It ensures real-time updates and provides better response times for game hosting. The WebSocket connection is managed using `socket.io-client` and is implemented as a global context. This approach maintains consistent information across different pages, ensuring the correct logic is applied with the same socket instance throughout the game.

![image.png](../images/image%205.png)

This diagram illustrates how a global WebSocket connection is managed across different pages using a **HostWebSocketProvider**. The provider initializes or reuses a WebSocket instance, registers necessary event listeners, and stores the instance in a **global WebSocket context**. Components throughout the app can then access this shared WebSocket instance through the context to send and receive real-time events, ensuring consistent communication across pages.
