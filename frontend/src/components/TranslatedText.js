import React from 'react';

const TranslatedText = ({ translatedText }) => {
  return (
    <div className="translated-text">
      <h3>Translated Text</h3>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslatedText;
