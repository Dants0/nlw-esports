import express from 'express';

const app = express();

app.get('/games', (req, res)=>{
    return res.json([]);
})

app.post('/ads', (req, res)=>{
    return res.status(201).json([]);
})

app.get('/games/:id/ads', (req, res) =>{
    // const gamesId = req.params.id;


    return res.json([
        {id: 1, name: 'Anuncio_1'},
        {id: 2, name: 'Anuncio_2'},
        {id: 3, name: 'Anuncio_3'},
        {id: 4, name: 'Anuncio_4'},
    ])
})

app.get('/ads/:id/discord', (req, res) =>{
    // const adId = req.params.id;

    return res.json([])
})

app.listen(8080, ()=>{console.log('listening on port 8080')})