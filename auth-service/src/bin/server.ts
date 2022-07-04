import express from 'express';
import cors from 'cors';
import {logger} from '../utils/winston';
import mongoose from 'mongoose';
import {connect} from '../utils/mongo';
import {testRouter, userRouter} from '../routes';

try {
  if (mongoose.connection.readyState === 0) {
    connect()
  }
} catch(err) {
  logger('app-listen', 'failed to connect mongo server', 'initiate application')
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(testRouter)
app.use('/user', userRouter);

export {
  app
}
