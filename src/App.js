import './App.css';
import HomeNav from './components/HomeNav';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Cards from './components/Cards';
import About from './components/About';
import EditText from './components/EditText';
import BlogEditor from './components/EditText';
import BlogList from './components/BlogList';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <HomeNav />
        <Routes>
          <Route exact path="/" element={<Cards />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/courses" element={<Cards />} />
          <Route exact path="/editText" element={<EditText />} />
          <Route exact path="/blog-editor" element={<BlogEditor />} />
          <Route exact path="/my-blogs" element={<BlogList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;