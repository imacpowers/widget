import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import pushid from 'pushid';

export default function MyCustomWidget() {
const [newsItems, setNewsItems] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [retryCount, setRetryCount] = useState(0);
const [maxRetryCount] = useState(3);
const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
fetchNewsData();
setupPusher();
}, []);

const fetchNewsData = () => {
const storedNewsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
setNewsItems(storedNewsItems);
setIsLoading(false);

fetch(`http://localhost:5000/live?search=${searchQuery}`)
  .then(response => response.json())
  .then(articles => {
    const updatedNewsItems = [...articles, ...storedNewsItems].slice(0, 20);
    localStorage.setItem('newsItems', JSON.stringify(updatedNewsItems));
    setNewsItems(updatedNewsItems);
    setIsLoading(false);
    setRetryCount(0);
  })
  .catch(error => {
    console.error(error);
    setError('Failed to fetch news data');
    setIsLoading(false);
    setRetryCount(prevRetryCount => prevRetryCount + 1);
  })
  .finally(() => {
    if (retryCount < maxRetryCount) {
      setTimeout(fetchNewsData, 3600000); // Retry after 1 hour
    }
  });
};

const setupPusher = () => {
const pusher = new Pusher('156c7923b89fdf7c2dc7', {
cluster: 'mt1',
encrypted: true,
});

const channel = pusher.subscribe('news-channel');
channel.bind('update-news', data => {
  const storedNewsItems = JSON.parse(localStorage.getItem('newsItems')) || [];
  const updatedNewsItems = [...data.articles, ...storedNewsItems].slice(0, 20);
  localStorage.setItem('newsItems', JSON.stringify(updatedNewsItems));
  setNewsItems(updatedNewsItems);
});
};

const handleSearchChange = e => {
setSearchQuery(e.target.value);
};

const handleSearchSubmit = e => {
e.preventDefault();
setIsLoading(true);
setNewsItems([]);
fetchNewsData();
localStorage.removeItem('newsItems');
};

if (isLoading) {
return <div>Loading...</div>;
}

if (error) {
return <div>Error: {error}</div>;
}

const NewsItem = (article, id) => (
<div key={id} className="news-item">
<a href={article.url} className="news-item-link">{article.title}</a>
<img src={article.urlToImage} alt="headline image" className="news-item-image" />
</div>
);

const newsItemsList = newsItems.map((article, index) => NewsItem(article, pushid()));

return (
<div style={{ height: '500px', width: '500px', overflow: 'auto' }}>
<h1 className="NewsWidget-title">Live {searchQuery !== '' ? searchQuery : 'general'} Headline Feed</h1>
<form className="search-form" onSubmit={handleSearchSubmit}>
<input
       type="text"
       value={searchQuery}
       onChange={handleSearchChange}
       placeholder="Search headlines..."
     />
<button type="submit">Search</button>
</form>
<ul className="NewsWidget-newsItems" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
{newsItemsList}
</ul>
</div>
);
}




