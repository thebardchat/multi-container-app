const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const app = require('express')();

const FrontRouter = require('./routes/front');
const { ensureSchema } = require('./services/memory');

app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'production') {
    const livereload = require('livereload');
    const connectLiveReload = require('connect-livereload');
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => liveReloadServer.refresh("/"), 100);
    });
    app.use(connectLiveReload());
}

app.use(bodyParse.urlencoded({ extended: false }));
app.locals.moment = require('moment');

const db = require('./config/keys').mongoProdURI;
mongoose
    .connect(db)
    .then(() => {
        console.log('MongoDB connected');
        ensureSchema();
    })
    .catch(err => console.log(err));

app.use(FrontRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
