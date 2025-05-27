import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';


import connectToDatabase from './services/db.js'
import {getAllEntries, addingEntry, deleteEntry, getEntryById, updateEntry} from './services/entryServices.js'


dotenv.config();
await connectToDatabase()

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'dist')));

morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get("/api/persons", async (request, response, next) => {
    try {
        const entries = await getAllEntries();
        response.json(entries);
    } catch (error) {
        next(error);
    }
})

app.post("/api/persons", async (request, response) => {
    const {name, number} = request.body
    
    if (!name || !number){
      return response.status(400).json({error: 'content missing'})
    }

    const existing = await getAllEntries()

    if (existing.some(a => a.name == name)){
      return response.status(400).json({error: 'name must be unique'})
    }

    const savedEntry = await addingEntry(name, number)

    response.status(201).json(savedEntry)
})

app.put("/api/persons/:id", async (request, response, next) => {
    try {
        const {name, number} = request.body
        const updated = await updateEntry(request.params.id, number, name);
        response.json(updated)
    } catch (error) {
        next(error);
    }
})

// Completed 3.15 to 3.18

app.get("/api/persons/:id", async (request, response, next) => {
    try {
        const person = await getEntryById(request.params.id);
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    } catch (error) {
        next(error);
    }
});

// Completed 3.18 
app.get("/info", async (request, response) => {
    const count = await getAllEntries();
    const time = new Date();
    response.send(`<p>Phonebook has info for ${count.length} people</p><p>Current time: ${time}</p>`);
});

// Step 3.15
app.delete("/api/persons/:id", async (request, response, next) => {
    try {
        await deleteEntry(request.params.id);
        response.status(204).end();
    } catch (error) {
        next(error);
    }
});


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});


const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

console.log('Serving index file from:', path.resolve(__dirname, 'dist', 'index.html'));
