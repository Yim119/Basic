import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LogInPage from "./components/views/LogInPage/LogInPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";

import Auth from "./hoc/auth";
import MemoPage from "./components/views/MemoPage/MemoPage";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLogInPage = Auth(LogInPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthVideoDetailPage = Auth(VideoDetailPage, null);

  const AuthMemoPage = Auth(MemoPage, true);

  return (
    <div>
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<AuthLandingPage />} />
          <Route path="/log-in" element={<AuthLogInPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
          <Route path="/video/upload" element={<AuthVideoUploadPage />} />

          <Route
            path="/video/detail/:videoId"
            element={<AuthVideoDetailPage />}
          />
          <Route path="/memo" element={<AuthMemoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
