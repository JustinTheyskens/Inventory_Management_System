// const express = require('express');
import express from 'express';
const app = express();
const port = process.env.PORT || 8080;

// setting up cors
const cors = require('cors');

// setting up white list - split enables multiple white listed clients.
app.use(cors({ origin: process.env.CORS_WHITELIST.split(',')}));

app.use(express.json());

// listening
app.listen(port, () =>
{
    
});