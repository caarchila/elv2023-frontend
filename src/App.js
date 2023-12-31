import './App.css';
import Final from './pages/votante/phases/Final';
import React from 'react';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {TokenProvider} from './provides/TokenContext';
import IndexPage from './pages/IndexPage';
import RequireLogin from './pages/auth/RequireLogin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import {PAGES} from './config/constants';
import LoginPageVontante from './pages/votante/LoginPageVotante';
import VotePage from './pages/votante/VotePage';

/**
 * Home page
 * @return {Object} Body
 */
function App() {
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route exact path={PAGES.index} element={<IndexPage/>} />
          <Route path={PAGES.admin.loginAdmin} element={<LoginPageAdmin/>} />
          <Route path={PAGES.votante.login} element={<LoginPageVontante/>} />
          <Route path={PAGES.admin.dashboard} element={
            <RequireLogin>
              <DashboardAdmin/>
            </RequireLogin>
          }/>
          <Route path={PAGES.votante.votePage} element={
            <RequireLogin>
              <VotePage/>
            </RequireLogin>
          }/>
          <Route path="/final" element={<Final/>}/>
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
