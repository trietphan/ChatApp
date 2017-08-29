import express from 'express';

const PORT = 8008;

const app = express();

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
