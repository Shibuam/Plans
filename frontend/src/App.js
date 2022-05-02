import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Registration from './components/registation'
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/registration' element={<Registration />} />
  
      </Routes>
    </Router>
  );
}

export default App;
