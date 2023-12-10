import { Constructor } from '../types';

export function postMixin<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
    }
  }
}
