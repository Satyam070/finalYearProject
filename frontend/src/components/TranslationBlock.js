import React from 'react';
import ExtractedText from './ExtractedText';
import TranslatedText from './TranslatedText';

const TranslationBlock = ({ extractedText, translatedText }) => {
  return (
    <div className="translation-block">
      {extractedText && <ExtractedText extractedText={extractedText} />}
      {translatedText && <TranslatedText translatedText={translatedText} />}
    </div>
  );
};

export default TranslationBlock;
