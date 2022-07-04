import {StackFrame} from 'stack-trace';

export type Optional<T> = undefined | T;

export interface ErrorStack {
  name: Optional<string>;
  message: Optional<string>;
  details?: any;
  traces: StackFrame[];
  cause?: ErrorStack;
}
