import express from 'express';
import { connectToMongoDB, connectToMongoose } from './connector.js';
import { Animale } from './Animale.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/animali', async (req, res) => {
  try {
    const animali = await Animale.find({}).lean();
    res.json(animali);
  } catch (err) {
    res.status(500).json({ errore: 'Errore nella lettura dal DB' });
  }
});

app.post('/api/animali', async (req, res) => {
  try {
    const { nome, specie, eta, vaccinato } = req.body;
    const nuovoAnimale = new Animale({ nome, specie, eta, vaccinato });

    const risultato = await nuovoAnimale.save();
    res.status(201).json({ id: risultato._id });
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel salvataggio su DB' });
  }
});

async function avviaServer() {
  try {
    await connectToMongoDB();
    app.listen(PORT, () => {
      console.log(`Server avviato su http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Impossibile avviare il server:', err);
    process.exit(1);
  }
}

avviaServer();