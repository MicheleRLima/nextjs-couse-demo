import { MongoClient } from "mongodb";

// /api/new-meetup

//só aceitar método POST neste caso

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    //database
    const client = await MongoClient.connect('mongodb+srv://michelelima232:POzPMYEr6lGAvVWk@cluster0.irmcl2z.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    //inserir um novo documento na collection

    const result = await meetupsCollection.insertOne(data); // aceita um objeto

    console.log(result);

    //faltaria error handling - try - catch

    client.close();

    res.status(201).json({ message: 'Meetup inserted.' });
  }
}

export default handler;