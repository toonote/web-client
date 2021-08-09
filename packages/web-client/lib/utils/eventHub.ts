import mitt from 'mitt';

export const eventHub = mitt();

export const EVENTS = {
  CREATE_NOTE: Symbol('CREATE_NOTE'),
  UPDATE_NOTE: Symbol('UPDATE_NOTE'),
};
