import React, { useState, useEffect } from 'react';
import './styles.css';
import ImageUpload from './components/ImageUpload';
import LanguageSelector from './components/LanguageSelector';
import TranslationBlock from './components/TranslationBlock';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { translateText } from './api';
import { addToHistory, getHistory } from './services/historyService';
import { getCurrentUser, logout } from './services/authService';
import History from './components/History';

const App = () => {
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [srcLang, setSrcLang] = useState('auto');
  const [destLang, setDestLang] = useState('en');
  const [user, setUser] = useState(getCurrentUser());
  const [history, setHistory] = useState([]);
  const [isLogin, setIsLogin] = useState(false); // Toggle Login and Signup
  const [showHistory, setShowHistory] = useState(false); // Toggle History Visibility

  // Load history if user is logged in
  useEffect(() => {
    if (user) setHistory(getHistory().reverse()); // Show latest first
  }, [user]);

  // Extract and Translate Text
  const extractText = async (text) => {
    setLoading(true);
    const translation = await translateText(text, srcLang, destLang);
    setTranslatedText(translation.translated);

    // Update history
    const newHistory = [{ extracted: text, translated: translation.translated }, ...history];
    addToHistory({ extracted: text, translated: translation.translated });
    setHistory(newHistory);

    setLoading(false);
  };

  // Logout Handler
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <div className="App bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Text Extraction and Translation</h1>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-5">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          {/* Login/Signup Check */}
          {!user ? (
            <>
              {isLogin ? (
                <Login onLogin={setUser} />
              ) : (
                <Signup onSignup={setUser} />
              )}
              <p className="text-center mt-4">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button className="text-white-600" onClick={() => setIsLogin(false)}>
                      Signup
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button className="text-white-600" onClick={() => setIsLogin(true)}>
                      Login
                    </button>
                  </>
                )}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Get Started with Text Extraction and Translation
              </h2>
              <div className="grid gap-6">
                <LanguageSelector
                  srcLang={srcLang}
                  setSrcLang={setSrcLang}
                  destLang={destLang}
                  setDestLang={setDestLang}
                />
                <ImageUpload
                  setExtractedText={setExtractedText}
                  setLoading={setLoading}
                  extractText={extractText}
                />
                {loading ? (
                  <p className="text-center text-blue-500 font-medium mt-4">Loading...</p>
                ) : (
                  <TranslationBlock extractedText={extractedText} translatedText={translatedText} />
                )}
              </div>

              {/* History Toggle Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  {showHistory ? 'Hide History' : 'Show History'}
                </button>
              </div>

              {/* History Section */}
              {showHistory && <History history={history} />}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
        Designed and developed by Satyam Shukla
      </footer>
    </div>
  );
};

export default App;
