import './App.css';
import Vote1 from './pages/Vote1';
import Vote2 from './pages/Vote2';
import Vote3 from './pages/Vote3';
import Final from './pages/Final';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { TokenProvider } from './provides/TokenContext';
import IndexPage from './pages/IndexPage';
import { PAGES } from './Pages';
import RequireLogin from './pages/auth/RequireLogin';
import DashboardAdmin from './pages/admin/DashboardAdmin';

function App() {
  return (
    <TokenProvider>
      <Router>
          <Routes>
            <Route exact path={PAGES.index} element={<IndexPage/>} />
            <Route path={PAGES.admin.loginAdmin} element={<LoginPageAdmin/>} />
            <Route path={PAGES.admin.dashboard} element={
              <RequireLogin>
                 <DashboardAdmin/>
              </RequireLogin>
            }/>
            <Route path="/vote1" element={<Vote1/>}/>
            <Route path="/vote2" element={<Vote2/>}/>
            <Route path="/vote3" element={<Vote3/>}/>
            <Route path="/final" element={<Final/>}/>
        </Routes>
      </Router>
    </TokenProvider>
  );
}

export default App;
