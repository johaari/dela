import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import { useIdleTimer } from './hooks/useIdleTimer';
import Welcome from './screens/Welcome';
import Intro from './screens/Intro';
import Shape from './screens/Shape';
import YourVoice from './screens/YourVoice';
import Idea from './screens/Idea';
import Impact from './screens/Impact';
import Login from './screens/Login';

function AppWithTimer({ children }: { children: React.ReactNode }) {
  useIdleTimer();
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <AppWithTimer>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/shape" element={<Shape />} />
            <Route path="/your-voice" element={<YourVoice />} />
            <Route path="/idea" element={<Idea />} />
            <Route path="/impact" element={<Impact />} />
          </Routes>
        </AppWithTimer>
      </SessionProvider>
    </BrowserRouter>
  );
}
