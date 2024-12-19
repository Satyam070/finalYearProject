import React, { useState } from 'react';
import './styles.css';
import ImageUpload from './components/ImageUpload';
import LanguageSelector from './components/LanguageSelector';
import TranslationBlock from './components/TranslationBlock';
import { translateText } from './api';

const App = () => {
  const [extractedText, setExtractedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [srcLang, setSrcLang] = useState('auto');
  const [destLang, setDestLang] = useState('en');

  const extractText = async (text) => {
    setLoading(true);
    const translation = await translateText(text, srcLang, destLang);
    setTranslatedText(translation.translated);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Text Extraction and Translation</h1>
      <LanguageSelector
        srcLang={srcLang}
        setSrcLang={setSrcLang}
        destLang={destLang}
        setDestLang={setDestLang}
      />
      <ImageUpload setExtractedText={setExtractedText} setLoading={setLoading} extractText={extractText} />
      {loading ? <p>Loading...</p> : <TranslationBlock extractedText={extractedText} translatedText={translatedText} />}
    </div>
  );
};

export default App;
