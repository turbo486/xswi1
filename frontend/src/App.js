import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './tasks/AddTask';
import EditTask from './tasks/EditTask';
import ViewTask from './tasks/ViewTask';
import AddSubtask from './tasks/AddSubtask';
import EditSubtask from './tasks/EditSubtask';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route exact path='/addtask' element={<AddTask />} />
          <Route exact path='/edittask/:id' element={<EditTask />} />
          <Route exact path='/viewtask/:id' element={<ViewTask />} />

          <Route exact path='/addsubtask' element={<AddSubtask />} />
          <Route exact path='/editsubtask/:id' element={<EditSubtask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
