### News Widget for Planner App
The News Widget is an appropriate addition to a Planner App for the following reasons:

**1. Information and Awareness**
A Planner App aims to provide users with a comprehensive tool for organizing and managing their daily tasks, schedules, and important events. Including a News Widget enhances the app's functionality by providing users with relevant news and updates. It helps users stay informed and aware of current events, trends, and news stories that may impact their day-to-day activities and decision-making.

**2. Contextual Relevance**
By integrating a News Widget, the Planner App can offer contextually relevant news based on the user's preferences and interests. The widget can allow users to customize their news feed by choosing specific topics or keywords they want to follow. This personalization ensures that the news articles displayed align with the user's interests and needs, providing them with tailored and meaningful information.

**3. Productivity Enhancement**
While the Reminder Widget, Calendar Widget, Timer Widget, and Time and Date Widget primarily focus on managing time and tasks, the News Widget complements these features by keeping users informed without having to switch to a separate news app or website. It saves users time and effort by conveniently providing news updates within the Planner App interface, creating a seamless user experience.

**4. Broadens User Engagement**
Introducing a News Widget adds another layer of engagement and interactivity to the Planner App. Users can browse news articles, read headlines, and access detailed information without leaving the app. By incorporating diverse content, the Planner App becomes a centralized hub that caters to users' various needs, enhancing their overall engagement and satisfaction.

**5. Synergy with Existing Widgets**
The News Widget synergizes well with the existing widgets in the Planner App. For example:

Reminder Widget: The News Widget can be used to display news articles relevant to upcoming events or tasks, providing users with additional context and information.
Calendar Widget: The News Widget can be used to show news related to holidays, local events, or significant dates, enriching the user's calendar experience.
Timer Widget: While waiting for a timer to complete, users can catch up on the latest news articles conveniently through the News Widget.
Time and Date Widget: The News Widget complements the time and date information by presenting real-time news updates, allowing users to stay up to date while managing their schedules.
Therefore, incorporating a News Widget into a Planner App enhances the user experience, increases productivity, broadens engagement, and complements the existing set of widgets. It provides users with valuable news information within a unified app environment, ensuring they stay informed without disrupting their planning and organizing activities.

# News Widget - User Guide

The News Widget is designed to provide users with up-to-date news articles within your application. This user guide explains how users can utilize the News Widget and provides examples for better understanding.

## Accessing the News Widget

1. Open your application and navigate to the section or page where the News Widget is integrated.

2. The News Widget will be displayed as a component within the user interface, showing a list of news articles.

## Viewing News Articles

1. By default, the News Widget displays a selection of general news articles.

2. **Example:** As a user, I scroll through the list and see headlines like "New Study Reveals Benefits of Exercise" and "Global Tech Conference Announced."

3. Click on a news article's title or image to open the full article in a new tab or window. This allows users to read the complete content from the source website.

## Searching for News

1. To search for news articles on a specific topic or keyword, locate the search bar within the News Widget interface.

2. **Example:** As a user interested in sports, I type "sports" into the search bar.

3. Press the "Enter" key or click the "Search" button to initiate the search.

4. The News Widget will update and display news articles related to the search query. Users can now browse through the search results.

## Refreshing News Articles

1. The News Widget automatically fetches new articles periodically to ensure users receive the latest updates.(The app has been set to update every 3600seconds from when it was deployed as it is running on a free api with a maximum of 100pings per day)

2. Users do not need to manually refresh the widget as new articles are fetched and displayed automatically(every 3600seconds).

## Customization and Personalization

1. The News Widget allows users to personalize their news feed based on their interests and preferences.

2. Users can adjust the search query to focus on specific topics or keywords they want to follow.

3. **Example:** As a user interested in technology, I change the search query to "technology" to receive technology-related news.

## Integration with Planner App Features

The News Widget enhances the functionality of your Planner App by providing users with valuable news information alongside other features such as the Reminder Widget, Calendar Widget, Timer Widget, and Time and Date Widget.

1. Users can stay informed about current events while managing their tasks and schedules through the Planner App.

2. **Example:** As a user planning a business meeting, I use the News Widget to check for any relevant news articles related to the meeting's topic.

# News Widget Code Overview

The News Widget code is designed to provide users with real-time news updates within a Planner App. This section provides an overview of how the News Widget code works, explaining its key components and functionality.

### Frontend Code (MyCustomWidget.js)

The frontend code, implemented in React, is responsible for rendering the News Widget component and handling user interactions. Here's how it works:

1. **Component Setup**: The `MyCustomWidget` functional component is defined. It utilizes React hooks, such as `useState` and `useEffect`, to manage the component's state and lifecycle.

2. **State Management**: Several state variables are declared using the `useState` hook. These variables include `newsItems`, `isLoading`, `error`, `retryCount`, and `searchQuery`. They control the display of news items, loading state, error handling, retry count, and the user's search query.

3. **Fetching News Data**: The `fetchNewsData` function is responsible for fetching news articles. It first retrieves stored news items from the browser's local storage and updates the component's state accordingly. Then, it sends a request to the server to fetch news articles based on the search query. The fetched articles are combined with the stored news items, limited to 20 articles, and saved back to the local storage and component's state.

4. **Pusher Integration**: The `setupPusher` function initializes a Pusher instance and subscribes to a specific channel, listening for the 'update-news' event. When a new news update event is received, the function retrieves stored news items, combines them with the received articles, and updates the local storage and component's state accordingly.

5. **User Interaction Handling**: The `handleSearchChange` function updates the component's state with the user's search query as they type. The `handleSearchSubmit` function is triggered when the user submits the search form. It sets the loading state, clears the news items, fetches new articles based on the search query, removes stored news items from local storage, and updates the component's state.

6. **Rendering**: The `render` function renders the News Widget component's user interface. It displays the loading state if articles are being fetched, shows an error message if an error occurs, and renders the list of news items. Each news item is represented by the `NewsItem` component, displaying the article's title, image, and link.

### Backend Code (server.js)

The backend code, implemented using Express.js, handles the server-side functionality of the News Widget. Here's how it works:

1. **Server Setup**: The Express server is initialized, and the required dependencies (Express, CORS, Pusher, and NewsAPI) are imported.

2. **Pusher and NewsAPI Configuration**: The Pusher instance is configured using the app credentials from the environment variables. Similarly, the NewsAPI instance is set up with the API key from the environment variables.

3. **Fetching and Broadcasting News**: The `fetchNews` function uses the NewsAPI library to fetch news articles based on a search term and page number. The `updateFeed` function periodically fetches new articles using `fetchNews` and broadcasts them to connected clients via the Pusher channel.

4. **Routes**: The server defines a single route at the `/live` endpoint. When a request is made to this endpoint, the server retrieves the search query from the request parameter. It then fetches news articles based on the search query, sends the articles as a JSON response, and starts the update feed process for the specified topic.

### Integration and Functionality

The frontend and backend components work together to provide a seamless News Widget experience:

1. When the frontend component (`MyCustomWidget`) mounts, it calls the `fetchNewsData` function to retrieve stored news items and fetch new articles from the server based on the search query.

2. The frontend component also establishes a connection with Pusher via the `setupPusher` function. This allows it to receive real-time news updates sent by the server through the 'news-channel' and 'update-news' event.

3. User interactions, such as typing in the search bar and submitting the form, trigger functions that update the component's state, fetch new articles, and update the local storage.

4. The frontend component renders the news items, loading state, and error messages based on the component's state variables.

5. On the backend, the server handles requests to the `/live` endpoint, fetching news articles from NewsAPI based on the search query. It then sends the articles as a response, broadcasts the articles through Pusher to connected clients, and continues to fetch and broadcast new articles periodically.

By combining the frontend and backend code, the News Widget provides users with real-time news updates, personalized search functionality, and a seamless integration within the Planner App environment.

# News Widget - Usage Guide

The News Widget consists of two parts: the frontend component written in React (MyCustomWidget.js) and the backend server (server.js). This guide will explain how to use and integrate the News Widget into your application.

## Prerequisites

Before proceeding, ensure that you have the following prerequisites set up:

1. Node.js and npm (Node Package Manager) installed on your system.
2. A valid API key for the News API service. You can obtain one by signing up on the [News API website](https://newsapi.org/).
3. A Pusher account and app credentials. You can create an app on the [Pusher website](https://pusher.com/) and obtain the required credentials.

## Frontend Setup (MyCustomWidget.js)

1. Copy the contents of `MyCustomWidget.js` into your React project's file or component.

2. Install the required dependencies by running the following command in your project's root directory:
   ```
   npm install pusher-js pushid
   ```

3. Replace the placeholder Pusher app credentials in the `setupPusher()` function with your own app credentials.

4. Customize the styling and layout of the News Widget according to your app's design.

5. The News Widget component expects the following CSS classes to be defined for proper styling:
   - `news-item`: Represents a single news item container.
   - `news-item-link`: Represents the link to the full news article.
   - `news-item-image`: Represents the image associated with the news article.
   - `NewsWidget-title`: Represents the title of the News Widget.
   - `search-form`: Represents the form for submitting search queries.
   - `NewsWidget-newsItems`: Represents the container for displaying the list of news items.

6. Include the `MyCustomWidget` component in your app's desired location and ensure that it is rendered within a parent component.

## Backend Setup (server.js)

1. Copy the contents of `server.js` into a new file named `server.js` in your project's backend directory.

2. Install the required dependencies by running the following command in your project's backend directory:
   ```
   npm install express cors pusher newsapi
   ```

3. Create a `.env` file in your backend directory and add the following environment variables:
   ```
   PUSHER_APP_ID=YOUR_PUSHER_APP_ID
   PUSHER_APP_KEY=YOUR_PUSHER_APP_KEY
   PUSHER_APP_SECRET=YOUR_PUSHER_APP_SECRET
   PUSHER_APP_CLUSTER=YOUR_PUSHER_APP_CLUSTER
   NEWS_API_KEY=YOUR_NEWS_API_KEY
   ```

4. Replace the placeholders `YOUR_PUSHER_APP_ID`, `YOUR_PUSHER_APP_KEY`, `YOUR_PUSHER_APP_SECRET`, `YOUR_PUSHER_APP_CLUSTER`, and `YOUR_NEWS_API_KEY` with your actual Pusher and News API credentials.

5. Run the backend server by executing the following command in your project's backend directory:
   ```
   node server.js
   ```

   This will start the server and listen for requests on the specified port (default: 5000). Make sure the server is running and accessible before proceeding.

## Integrating the News Widget

To integrate the News Widget into your application:

1. Make sure both the frontend and backend servers are running.

2. In your frontend component or file, import the `MyCustomWidget` component.

3. Include the `MyCustomWidget` component in your app's desired location and ensure that it is rendered within a parent component.

4. Customize the placement and appearance of the News Widget based on your app's design and layout.

5. Test the News Widget by interacting with the search feature, viewing and clicking on news articles, and verifying that new articles are fetched and displayed automatically.

## Additional Customization

The News Widget can be further customized to suit your specific requirements:

- Modify the number of displayed news items by adjusting the `slice()` function in the `fetchNewsData()` function.
- Customize the interval for fetching new articles by modifying the `setInterval()` function in the `updateFeed()` function in `server.js`.

## Conclusion

By following these steps, you can successfully integrate the News Widget into your application. Users will be able to view and interact with the latest news articles, enhancing their experience and keeping them informed within your app's environment. Feel free to customize and extend the widget to align with your app's unique features and design.

# See Also

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
