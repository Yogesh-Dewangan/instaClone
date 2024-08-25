import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import LandingPage from './Components/LandingPage/landing_page';
import {Post} from './Components/PostView/postview';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import ViewPost from './Components/PostView/postview';
import CreatePost from './Components/Form/form';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/post'>
            <Route path='/post/view' element={<Post/>}/>
            <Route path='/post/create' element={<CreatePost/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
