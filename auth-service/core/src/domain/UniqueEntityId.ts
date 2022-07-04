import {Identifier} from './Identifier';
import {v4} from 'uuid';

export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : v4());
  }
}
