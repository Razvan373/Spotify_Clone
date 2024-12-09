const express = require('express');
const path = require('path');
const app = express();

// Setează portul serverului
const PORT = 3000;

// Servește fișiere statice din directorul curent
app.use(express.static(path.join(__dirname,)));

app.use('/Cantece', express.static(path.join(__dirname, 'Cantece')));

// API pentru cântece (un exemplu de răspuns JSON)
app.get('/songs', (req, res) => {
    const songs = [
        { title: "Song 1", artist: "Artist 1", file: "/Cantece/song1.mp3" },
        { title: "Song 2", artist: "Artist 2", file: "/Cantece/song2.mp3" },
        { title: "Song 3", artist: "Artist 3", file: "/Cantece/song3.mp3" }
    ];
    res.json(songs);
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});
