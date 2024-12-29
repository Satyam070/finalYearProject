import React from 'react';
import ExtractedText from './ExtractedText';
import TranslatedText from './TranslatedText';

const TranslationBlock = ({ extractedText, translatedText }) => {
  return (
    <div className="translation-block flex flex-col items-center space-y-6 mt-8">
      {extractedText && (
        <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Extracted Text</h3>
          <ExtractedText extractedText={extractedText} />
        </div>
      )}
      {translatedText && (
        <div className="bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Translated Text</h3>
          <TranslatedText translatedText={translatedText} />
        </div>
      )}
    </div>
  );
};

export default TranslationBlock;
