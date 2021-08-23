import mitt from 'mitt';

export const eventHub = mitt();

export const EVENTS = {
  CREATE_NOTE: Symbol('CREATE_NOTE'),
  UPDATE_NOTE: Symbol('UPDATE_NOTE'),
  UPDATE_NOTE_TITLE: Symbol('UPDATE_NOTE_TITLE'),
  DELETE_NOTE: Symbol('DELETE_NOTE'),
  SWITCH_CURRENT_NOTE: Symbol('SWITCH_CURRENT_NOTE'),

  PENDING_CREATE_CATEGORY: Symbol('PENDING_CREATE_CATEGORY'),
  CREATE_CATEGORY: Symbol('CREATE_CATEGORY'),
  UPDATE_CATEGORY: Symbol('UPDATE_CATEGORY'),
  DELETE_CATEGORY: Symbol('DELETE_CATEGORY'),

  CREATE_IMAGE: Symbol('CREATE_IMAGE'),

  INSERT_IMAGE: Symbol('INSERT_IMAGE'),
};


export interface PAYLOAD_INSERT_IMAGE {
  id: string;
  name: string;
  url: string;
}
