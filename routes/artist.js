const express = require('express');
const Artist = require('./../models/artist');
const router = express.Router();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    }
});

const upload = multer({ storage: fileStorageEngine });

router.get('/edit', async (req, res) => {
    res.render('artist/profile', { artist: new Artist() })
})
router.post('/', upload.single('image'), async (req, res) => {
    let artist = new Artist({
        name: req.body.name,
        background: req.body.background,
        email: req.body.email,
        img: req.file.originalname
    })
    try {
        await artist.save();
        res.redirect('artist/about');
        } catch(e) {
        console.log(e);
    }
})
module.exports = router;