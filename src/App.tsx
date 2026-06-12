import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import Welcome from './screens/Welcome';
import Intro from './screens/Intro';
import Shape from './screens/Shape';
import YourVoice from './screens/YourVoice';
import Idea from './screens/Idea';
import Impact from './screens/Impact';
import Dashboard from './screens/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/login" element={<Dashboard />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/shape" element={<Shape />} />
          <Route path="/your-voice" element={<YourVoice />} />
          <Route path="/idea" element={<Idea />} />
          <Route path="/impact" element={<Impact />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}
