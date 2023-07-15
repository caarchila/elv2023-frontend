const TABLE_STATE = {
  OPEN: 'ABI',
  WAIT: 'PEN',
  CLOSE: 'CER',
};

const COMPUTER_STATE = {
  ACT: 'ACT',
  INA: 'INA',
};

const PAGES = {
  index: '/',
  admin: {
    loginAdmin: '/table',
    dashboard: '/table/dashboard',
  },
  votante: {

  },

};

export {
  PAGES,
  TABLE_STATE,
  COMPUTER_STATE,
};
