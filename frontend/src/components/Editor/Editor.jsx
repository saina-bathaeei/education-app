import React, { useState } from 'react';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleInputChange = (event) => {
    setContent(event.target.innerHTML);
  };

  const toggleBold = () => {
    setIsBold(!isBold);
    document.execCommand('bold');
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
    document.execCommand('italic');
  };

  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
    document.execCommand('underline');
  };

  const handleImageInsert = () => {
    const imageUrl = prompt('Enter the image URL');
    if (imageUrl) {
      document.execCommand('insertImage', false, imageUrl);
    }
  };

  const handleVideoInsert = () => {
    const videoUrl = prompt('Enter the video URL');
    if (videoUrl) {
      const videoEmbed = `<iframe width="560" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
      setContent((prevContent) => prevContent + videoEmbed);
    }
  };

  return (
    <div>
      <div>
        <button onClick={toggleBold} style={{ fontWeight: isBold ? 'bold' : 'normal' }}>
          Bold
        </button>
        <button onClick={toggleItalic} style={{ fontStyle: isItalic ? 'italic' : 'normal' }}>
          Italic
        </button>
        <button onClick={toggleUnderline} style={{ textDecoration: isUnderline ? 'underline' : 'none' }}>
          Underline
        </button>
        <button onClick={handleImageInsert}>Insert Image</button>
        <button onClick={handleVideoInsert}>Insert Video</button>
      </div>
      <div
        contentEditable
        onInput={handleInputChange}
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '10px',
          marginTop: '10px',
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div>
        <h2>Output:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TextEditor;
