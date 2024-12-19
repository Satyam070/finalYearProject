import React from 'react';

const LanguageSelector = ({ srcLang, setSrcLang, destLang, setDestLang }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'kn', name: 'Kannada' },
    { code: 'pa', name: 'Punjabi' }
  ];

  return (
    <div className="language-selector">
      <div>
        <label>Select Source Language:</label>
        <select value={srcLang} onChange={(e) => setSrcLang(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Target Language:</label>
        <select value={destLang} onChange={(e) => setDestLang(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
