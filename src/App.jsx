
import { BrowserRouter ,Route, Routes} from 'react-router-dom'
import './App.css'
import DashBoard from './DashBoard'

function App() {
  

  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard/>}/>
      </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
