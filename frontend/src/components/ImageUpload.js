import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageUpload = ({ setExtractedText, setLoading, extractText }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setExtractedText('');
    }
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
    setExtractedText('');
  };

  const handleExtractText = () => {
    if (!imageFile) return;

    setLoading(true);

    Tesseract.recognize(imageFile, 'eng', {
      logger: (m) => console.log(m), // Log OCR progress
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        extractText(text);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="image-upload" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button onClick={handleExtractText}>Extract Text</button>
      <div className="drag-drop">
        <p>Drag and Drop an image here</p>
      </div>
    </div>
  );
};

export default ImageUpload;
