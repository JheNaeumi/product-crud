import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Product from './components/Product'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Product/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
