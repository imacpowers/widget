require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const NewsAPI = require('newsapi');

const app = express();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = (searchTerm, pageNum) =>
  newsapi.v2.everything({
    q: searchTerm,
    language: 'en',
    page: pageNum,
    pageSize: 5,
  });

app.use(cors());

function updateFeed(topic) {
  let counter = 2;
  setInterval(() => {
    fetchNews(topic, counter)
      .then(response => {
        pusher.trigger('news-channel', 'update-news', {
          articles: response.articles,
        });
        counter += 1;
      })
      .catch(error => console.error('Failed to fetch news:', error));
  },  3600000); // Update every 1 hour (3600 seconds)
}

app.get('/live', (req, res) => {
  const searchQuery = req.query.search || 'general'; // Get search query from request parameter
  const topic = searchQuery !== '' ? searchQuery : 'general'; // Set default topic to 'general' if search query is empty
  
  fetchNews(topic, 1)
    .then(response => {
      res.json(response.articles);
      updateFeed(topic);
    })
    .catch(error => console.error('Failed to fetch initial news:', error));
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Express running → PORT ${port}`);
});
