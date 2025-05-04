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
  const [isLogin, setIsLogin] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load history if user is logged in
  useEffect(() => {
    if (user) setHistory(getHistory().reverse());
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
    <div className="App bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col">
      {/* Header with animation */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 shadow-lg flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="flex items-center space-x-3 z-10">
          <div className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.41-1.41l4.38 4.37a1 1 0 01-1.42 1.42l-4.37-4.38zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold tracking-wide">TextVision Translate</h1>
        </div>
        <div className="z-10">
          {user ? (
            <div className="flex items-center">
              <div className="mr-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{user}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white text-blue-600 font-medium hover:bg-blue-50 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v4a1 1 0 102 0V8zm5 0a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-5">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6 transition-all duration-500 ease-in-out transform hover:shadow-2xl">
          {/* Login/Signup Check */}
          {!user ? (
            <>
              {/* <div className="flex justify-center mb-8 relative">
                <img src="/api/placeholder/100/100" alt="App Logo" className="w-24 h-24 rounded-full shadow-lg border-4 border-blue-100 animate-pulse" />
              </div> */}
              {isLogin ? (
                <Login onLogin={setUser} />
              ) : (
                <Signup onSignup={setUser} />
              )}
              <p className="text-center mt-6 text-gray-600">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button className="text-white-600 font-medium hover:underline focus:outline-none transition-colors" onClick={() => setIsLogin(false)}>
                      Sign up now
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button className="text-white-600 font-medium hover:underline focus:outline-none transition-colors" onClick={() => setIsLogin(true)}>
                      Login
                    </button>
                  </>
                )}
              </p>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Text Extraction & Translation</h2>
                <p className="text-gray-500">Upload an image, extract text, and translate it instantly</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-4 rounded-full"></div>
              </div>

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
                  <div className="flex justify-center items-center my-8">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="ml-4 text-blue-600 font-medium">Processing...</p>
                  </div>
                ) : (
                  <TranslationBlock extractedText={extractedText} translatedText={translatedText} />
                )}
              </div>

              {/* History Toggle Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
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
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-center py-6 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-300">© 2025 TextVision. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
          </div>
          <p className="mt-4 font-medium">Designed and developed by Us</p>
        </div>
      </footer>
    </div>
  );
};

export default App;