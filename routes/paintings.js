const express = require('express');
const Painting = require('./../models/painting');
const router = express.Router();
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img')
    }
});

const upload = multer({ storage: fileStorageEngine });

router.delete('/:id', async (req, res) => { 
    await Painting.findByIdAndDelete(req.params.id);
    res.redirect('/');
})


router.get('/new', (req, res) => {
    res.render('paintings/new', { painting: new Painting() })
})

router.get('/:id', async (req, res) => {
    const painting = await Painting.findById(req.params.id);
    if (painting == null) res.redirect('/');
    res.render('paintings/show', { painting:painting });
})

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file.originalname);
    let painting = new Painting({
        title: req.body.title,
        description: req.body.description,
        artist: req.body.artist,
        paint: req.body.paint,
        img: req.file.originalname
    })
    try {
        await painting.save();
        res.redirect(`/paintings/${painting.id}`);
    } catch(e) {
        res.render('/paintings/new', { painting: painting });
        console.log(e);
    }
})


module.exports = router;