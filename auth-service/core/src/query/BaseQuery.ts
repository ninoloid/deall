import mongoose from 'mongoose';
import CompositionRoot from '../application-service/CompositionRoot';
import {ILogger} from '../common/logging/ILogger';

export abstract class BaseRepository<T> {
  protected model: mongoose.Model<unknown>;
  protected logger: ILogger;

  constructor(
    model: mongoose.Model<unknown>,
    name: string
  ) {
    this.model = model,
    this.logger = CompositionRoot.getLoggerManager().getLogger(name);
  }
}
