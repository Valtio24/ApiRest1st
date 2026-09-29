const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API OK');
});


var Products = {
    1: {
        "id": 1,
        "name": "Manteau",
        "categorie": "vetement",
        "prix": 400
    },
    2: {
        "id": 2,
        "name": "chaussettte",
        "categorie": "vetement",
        "prix": 40

    }

}

app.get('/products', (req, res) => {

    res.json(Products);
});

app.get('/products/:id', (req, res) => {

    res.json(Products[req.params.id]);

});

app.post('/products', (req, res) => {
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({ erreur: "Champs Manquant" });
    }
    else if (!body.categorie) {
        return res.status(400).json({ erreur: "Champs Manquant" });
    }
    else if (!body.prix) {
        return res.status(400).json({ erreur: "Champs Manquant" });
    }
    else {
        const newId = Object.keys(Products).length + 1
        body.id = newId
        Products[newId] = (body)
    }
    res.status(201).json('Created')
});

app.delete('/products/:id', (req, res) => {
    delete Products[req.params.id]
    res.status(204).json('deleted')
})



app.put('/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    if (!body.name) {
        return res.status(400).json({ erreur: "Champs Manquant" });
    }
    else if (!body.categorie) {
        return res.status(400).json({ erreur: "Champs Manquant" });
    }
    else if (!body.prix) {
        return res.status(400).json({ erreur: "Champs Manquant" });
    }
    else {
        Products[id] = {
            id: id,
            name: body.name,
            categorie: body.categorie,
            prix: body.prix
        };
        res.status(200).json(Products[id]);
    }
});









app.listen(3000, () => console.log('Serveur sur http://localhost:3000'));




// je sais qu'il y a un probleme avec les id j'enleverai le message si j'ai le temps de le regler
// je sais que je n'ai pas encore pris en compte si l'id n'est pas bon de renvoyer une 400 mais encore une fois le temps