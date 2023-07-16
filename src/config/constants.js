const TABLE_STATE = {
  OPEN: 'ABI',
  WAIT: 'PEN',
  CLOSE: 'CER',
};

const COMPUTER_STATE = {
  ACT: 'ACT',
  INA: 'INA',
};

const VOTE_ANSWER = {
  SI: 'S',
  NO: 'N',
  ABSTENERCE: 'A',
};

const PAGES = {
  index: '/',
  admin: {
    loginAdmin: '/table',
    dashboard: '/table/dashboard',
  },
  votante: {
    login: '/vontanteLogin',
    votePage: '/votante',
  },

};

export {
  PAGES,
  TABLE_STATE,
  COMPUTER_STATE,
  VOTE_ANSWER,
};
