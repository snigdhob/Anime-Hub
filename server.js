const express = require('express');
const app = express();

app.use(express.static('./dist/anime-search-engine'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/anime-search-engine/' });
});

app.listen(process.env.PORT || 4200);