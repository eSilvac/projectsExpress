// Initial Config
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const userRoute = require('./routes/user');
const projectRoute = require('./routes/project');

// Middleware
app.use(cookieSession({
  secret: "randomNumber",
  maxAge: 24 * 60 * 1000 // 1 minute  
}));


app.use(bodyParser.json());
app.use(userRoute);
app.use(projectRoute);
app.use(express.static('public'));
app.use(express.json())

// Handle Errors 404
app.use((req, res, next) => {
  res.status(404).send('No route find');
});

// Handle Errors 500
app.use((err, req, res, next) => {
  console.log(err.stack);

  res.sendFile(path.join(__dirname, '../public/500.html'));
});

app.listen(PORT);
