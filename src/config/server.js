// Server Configurations

const app = require('../app');
const PORT = process.env.PORT || 3000;

//Initialize Server
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
