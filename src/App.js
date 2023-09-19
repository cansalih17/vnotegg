import "./App.css";
import Header from "./components/Header";
import ShareNote from "./pages/ShareNote";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import ShortUrlHandler from "./pages/ShortUrlHandler";
import useAuth from "./custom-hooks/useAuth";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<ShareNote />} />
          <Route path="/:shortUrl" element={<ShortUrlHandler />} />
          <Route path="/login" element={currentUser ? <Notes /> : <Login />} />
          <Route
            path="/register"
            element={currentUser ? <Notes /> : <Register />}
          />
          <Route
            path="/notes"
            element={currentUser ? <Notes /> : <ShareNote />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
