const express = require('express');
const simpleIcons = Object.values(require('simple-icons')).map(e => Object.assign({}, e, { id: e.title.toLowerCase().replace(/ /g, '-') }));

const app = express();
const PORT = process.env.PORT || 3000;


const filterObjByKeys = obj => keysToFilter => keysToFilter.map(k => k in obj ? { [k]: obj[k] } : {})
    .reduce((res, o) => Object.assign(res, o), {});

app.get('/', (req, res) => {
    const searchStr = req.query.q;
    const fields = (req.query.fields && req.query.fields.split(',')) || ['id', 'title', 'hex'];
    const color = req.query.color;

    const icons = simpleIcons
        .filter(e => e.title.match(new RegExp(searchStr, 'i')))
        .filter(e => !color || (e.hex.toLowerCase() === color.toLowerCase()))
        .map(e => filterObjByKeys(e)(fields))
    res.send(JSON.stringify(icons));
});

app.get('/:id', (req, res) => {
    const fields = (req.query.fields && req.query.fields.split(',')) || ['id', 'title', 'hex'];

    const icon = simpleIcons.find(e => e.id === req.params.id);
    const formattedIcon = icon ? filterObjByKeys(icon)(fields) : null;

    res.send(JSON.stringify(formattedIcon));
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

