const  Pool = require("pg").Pool  
const  pool = new  Pool({
	user:  'postgres',
	password:  'compe',
	database:  'cooking',
	host:  'localhost',
	port:  5432  //postgres default port
})
module.exports = pool