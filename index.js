const express = require('express');
const simpleIcons = require('simple-icons');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/icons', (req, res) => {
    const searchStr = req.query.q;
    const color = req.query.color;
    const icons = Object.entries(simpleIcons)
                    .map(e => ({ id: e[0], title: e[1].title, hex: e[1].hex }))
                    .filter(e => e.title.match(new RegExp(searchStr, 'i')))
                    .filter(e => !color || (e.hex.toLowerCase() === color.toLowerCase()))
    res.send(JSON.stringify(icons));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

