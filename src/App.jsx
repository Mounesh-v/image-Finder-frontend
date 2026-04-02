import HomeImage from "./Components/HomeImage";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";
import NotFound from "./Pages/NotFound";
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <div className="app-container">
      <Helmet>
        <title>Free Image Finder Tool | Search HD Images</title>
        <meta
          name="description"
          content="Find and download high-quality images instantly using our free image finder tool. Free image finder tool to search and download HD images online easily."
        />
      </Helmet>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeImage />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
