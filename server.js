const pool = require('./database.js');
require('dotenv').config();
const express = require('express');
const  cors = require("cors")

const app = express();

const  PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);

});


app.use(cors())
app.use(express.json())

 
app.get('/food', async (req, res) => { 
	 try { 
        const result = await pool.query(`SELECT name, type from "recipes";`);
        res.status(200).send(result.rows); 
	 } 
	 catch (error) {
	  console.error(error); res.sendStatus(500); 
	  } 
 });

 app.get('/food/:id', async (req, res) => { 
    const {id} = req.params;
    try { 
       const result = await pool.query(`SELECT r.name, r.type, ing.name, r.instructions from recipes as r 
       left join ingredients as ing ON r.recipe_id=ing.recipe_id WHERE r.recipe_id=${id};`);

       if(result.rowCount === 0){
        return res.status(404).send("doesn't exist");
       }

       res.status(200).send(result.rows); 
    } 
    catch (error) {
     console.error(error); res.sendStatus(500); 
     } 
});


// Start the server
