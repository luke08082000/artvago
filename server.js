const express = require('express');
const mongoose = require('mongoose');
const Painting = require('./models/painting');
const Artist = require('./models/artist');
const paintingRouter = require('./routes/paintings');
const artistRouter = require('./routes/artist');
const methodOverride = require('method-override');
const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://luke:dZYDHgOZxtGpL6vo@cluster0.hsf7soe.mongodb.net/?retryWrites=true&w=majority');

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const paintings = await Painting.find().sort({ createdAt: "desc" });
    res.render('paintings/index', { paintings: paintings });
})
app.get('/artist/about', async (req, res) => {
    const artists = await Artist.find().sort( { _id : -1 } ).limit(1);
    res.render('artist/about', { artists: artists });
})

app.use(express.static(__dirname + '/public'));

app.use('/paintings', paintingRouter);
app.use('/artist', artistRouter);

app.listen(5000);