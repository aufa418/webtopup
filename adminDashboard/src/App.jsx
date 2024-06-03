import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminDashboard from "./pages/AdminDashboard.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
