import React from 'react';

const ExtractedText = ({ extractedText }) => {
  return (
    <div className="extracted-text">
      <h3>Extracted Text</h3>
      <p>{extractedText}</p>
    </div>
  );
};

export default ExtractedText;
