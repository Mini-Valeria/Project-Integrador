import express from 'express';
import mongoose from 'mongoose';
import { DatesModel } from './models/DatesModel.js';
import cors from 'cors';

mongoose.connect('mongodb://localhost:27017/evaluacionTutores')
.then(()=>{
    console.log('¡La conexión ha sido exitosa!')
})
const app = express();

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hola desde mi servidor') //<- Es un endpoint
});

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const last_name = req.body.last_name;
    const email = req.body.email;

    if(!name || !last_name || !email){
        return res.status(400).json({
            msg:'¡Necesitamos todos las respuestas para almacenar un documento!'
        })
    }
    const obj = {
        Name: name,
        Last_name: last_name,
        Email: email,
    };
    DatesModel.create(obj);
    return res.status(200).json({
        msg:'¡Formulario registrado con éxito!'
    })
})

app.get('/dates', async(req,res)=>{
    const response = await DatesModel.find()
    return res.status(200).json(response)
})

app.post("/save-answers", async (req, res)=>{
    const numberOfQuestions = Array.from(Array(20).keys());
    let flag = true;
    for (const nQ of numberOfQuestions){
        console.log(nQ);
        if(!req.body[`pregunta_${nQ}`]){
            flag = false;
        }
    }
    if(!flag){
        return res.status(400).json({msg:"Datos incompletos"})
    }
    try {
        await DatesModel.create(req.body);
        return res.status(200).json({msg:"Datos almacenados"}) //200 error del usuario
    } catch {
        return res.status(500).json({msg:"Algo salió mal al guardar los datos"}) //500 nuestro error
    }
})

app.get("/get-answers", async (req, res)=>{
    return res.status(200).json(await DatesModel.find())
})

app.get("/get-answers-to-chart", async (req, res)=>{
    const allAnswers = await DatesModel.find();
    let totalSiempre = 0;
    let totalAVeces = 0;
    let totalRaraVez = 0;
    let totalNunca = 0;
    for(const answer of allAnswers){
        for(let i = 0; i<20; i++){
            const answerPerQuestion = answer[`pregunta_${i}`];
            if(answerPerQuestion === "Siempre"){
                totalSiempre++
            } else if(answerPerQuestion === "A veces"){
                totalAVeces++
            } else if(answerPerQuestion === "Rara vez"){
                totalRaraVez++
            } else {
                totalNunca++
            }
        }
    }
    return res.status(200).json([
        totalSiempre,
        totalAVeces,
        totalRaraVez,
        totalNunca
    ])
})

app.listen(4000,()=>{
    console.log('¡Servidor en linea!');
})