const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const dotenv = require('dotenv').config();
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// const apiKey = process.env.API_KEY1;
const apiKey = process.env.API_KEY2;
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.post('/search', (req, res) => {
    const searchContent = req.body.searchInput;
    getSearchResults(searchContent, apiKey, res);
  });
  
  app.get('/Popular', (req, res) => {
    const searchContent = 'Popular';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/Sports', (req, res) => {
    const searchContent = 'Sports';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/Politics', (req, res) => {
    const searchContent = 'Politics';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/Trends', (req, res) => {
    const searchContent = 'Trends';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/Videos', (req, res) => {
    const searchContent = 'Videos';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/Business', (req, res) => {
    const searchContent = 'Business';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/Science', (req, res) => {
    const searchContent = 'Science';
    getSearchResults(searchContent, apiKey, res);
  });

  app.get('/IT', (req, res) => {
    const searchContent = 'IT';
    getSearchResults(searchContent, apiKey, res);
  });

  const getSearchResults = (searchContent, apiKey, res) => {
    let rawData = '';
    const searchItems = [];
    
    https.get({
      hostname: 'newsapi.org',
      path: `/v2/everything?q=${searchContent}&apiKey=${apiKey}&pageSize=50`,
      headers: {
        'User-Agent': 'MyApplication/1.0'
      }
    }, (apiRes) => {
      if(apiRes.statusCode === 404){
        res.redirect('/');
      }else{
        apiRes.on('data', (data) => {
          rawData += data;
        });
        apiRes.on('end', () => {
          const apiData = JSON.parse(rawData);
          const articles = apiData.articles;  
    
          if (articles && articles.length > 0) {  
            
            articles.forEach((article) => {
              const articleTitle = article.title;
              const articleAuthor = article.author;
              const articleDescription = article.description;
              const articlePath = article.url;
              const articleImage = article.urlToImage;
              
              searchItems.push({
                title: articleTitle,
                author: articleAuthor,
                description: articleDescription,
                path: articlePath,
                image: articleImage
              });
            });
          }
  
          res.render('dashboard', {getData: searchItems});
        });
      }
    });
  };

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});