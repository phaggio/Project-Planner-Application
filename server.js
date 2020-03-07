"use strict";
// Dependencies
const express = require(`express`);
// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;
// Require database for sync
const db = require(`./models`);
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Set up static file directory
app.use(express.static(`public`));
// Set Handlebars
const expressHandlebars = require(`express-handlebars`);
app.engine(`handlebars`, expressHandlebars({ defaultLayout: `main` }));
app.set(`view engine`, `handlebars`);
// Config routes
require(`./routes/dev-routes`)(app);
require(`./routes/projects-routes`)(app);
require(`./routes/tasks-routes`)(app);
require(`./routes/teams-routes`)(app);
// Syncing sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
});