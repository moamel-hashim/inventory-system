import path from 'path';
import express from 'express';

const publicPath = path.join(__dirname, '../public');
const staticMiddleware = express.static(publicPath);

export default staticMiddleware;
