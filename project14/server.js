const app = require('./src/index');

const PORT = 8000;

app.listen(PORT, ()=>console.log(`served at http://localhost:${PORT}/`));