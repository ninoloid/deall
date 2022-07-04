import 'dotenv/config';
import {app} from './bin/server';
import {logger} from './utils/winston';

app.listen(process.env.PORT, () => {
  logger('app-listen', `${process.env.APP_NAME} app listening at http://localhost:${process.env.PORT}`, 'initiate application')
})
