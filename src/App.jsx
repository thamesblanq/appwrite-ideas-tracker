
import { DataProvider } from './context/DataContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;
