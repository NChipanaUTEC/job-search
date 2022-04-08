import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import AddForm from './containers/AddForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddForm />} />
      </Routes>
    </div>
  );
}

export default App;
