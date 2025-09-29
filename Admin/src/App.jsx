import AdminNavbar from "./componants/AdminNavbar"
import Home from "./componants/Home"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppProvider from "./context/AppContext";

function App() {

  return (
    <AppProvider>
      <ToastContainer />
      <AdminNavbar />
      <Home />
    </AppProvider>
  )
}

export default App
