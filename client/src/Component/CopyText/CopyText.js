import React from 'react';

const CopyText = () => {
  const handleCopy = () => {
    const copyContent = document.getElementById('textToCopy');
    const textToCopy = copyContent.innerText;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard Successfully');
      })
      .catch(error => {
        console.error('Error copying text: ', error);
      });
  };

  return (
    <>
    <div id="textToCopy" style={{ border: '1px solid black', padding: '10px' }}>
      <span>gohlatt</span>
      <span>gohlatter3456</span>
      <span>mail</span>
      
    </div>
    <button onClick={handleCopy}>Copy Text</button>

    </>
  );
};

export default CopyText;
