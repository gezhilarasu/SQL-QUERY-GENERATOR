import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Connection from './pages/connection';
import Main from './pages/main';

function App() {

    return (
        <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Landing/>}/>
          <Route path='/databaseconnection' element={<Connection/>}/>
          <Route path='/main'element={<Main/>}/>
          </Routes>
        </BrowserRouter>
    );
}
export default App;
