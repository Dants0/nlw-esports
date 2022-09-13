import express from 'express';

const app = express();

app.get('/ads', (req, res) =>{
    res.json([
        {id: 1, name: 'Anuncio_1'},
        {id: 2, name: 'Anuncio_2'},
        {id: 3, name: 'Anuncio_3'},
        {id: 4, name: 'Anuncio_4'},
    ])
})

app.listen(8080, ()=>{console.log('listening on port 8080')})