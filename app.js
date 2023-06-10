const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const router = require('./src/routers/web.router');

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(router);

app.listen(PORT, 'localhost', () => console.log(`Server is running at http://localhost:${PORT}`));
