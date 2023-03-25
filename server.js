const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // This line tells the server to serve files from the 'public' folder

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
