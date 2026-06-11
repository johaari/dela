import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import IkeaLogo from '../components/IkeaLogo';
import Btn from '../components/Btn';
import { useSession } from '../context/SessionContext';

export default function Login() {
  const navigate = useNavigate();
  const { saveMember } = useSession();
  const [name, setName] = useState('Sigrid Lindqvist');
  const [number, setNumber] = useState('6234 8891 0427');

  function handleSignIn() {
    saveMember({ name: name.trim(), number: number.trim() });
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-ikea-bg flex flex-col">
      <header className="px-8 pt-6 pb-2">
        <IkeaLogo size="md" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-16">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-ikea-text mb-2">
            Welcome to IKEA Family.
          </h1>
          <p className="text-lg text-gray-500 mb-10">Sign in to continue.</p>

          <div className="space-y-5 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Member name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-base text-ikea-text focus:outline-none focus:border-ikea-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Member number
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full border border-ikea-border rounded-2xl px-4 py-3 text-base text-ikea-text focus:outline-none focus:border-ikea-blue"
              />
            </div>
          </div>

          <Btn onClick={handleSignIn} fullWidth>
            Sign in
          </Btn>
        </motion.div>
      </main>
    </div>
  );
}
