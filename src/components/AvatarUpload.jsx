// src/components/AvatarUpload.js
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AvatarUpload = ({ onUploadSuccess, error, onError = (message) => console.error('Upload error:', message) }) => {
  const [preview, setPreview] = useState('');
  const [uploadState, setUploadState] = useState('idle');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadState('uploading');
    setPreview('');
    onError('');

    // Create a FileReader to read the file as a Base64-encoded URL for preview
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setPreview(result);

      onUploadSuccess(result);
      setUploadState('success');
    };
    reader.onerror = () => {
      onError('Error reading file.');
      setUploadState('error');
    };
    reader.readAsDataURL(file);
  }, [onUploadSuccess, onError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,

  });

  return (
    <div className="upload-section">
      <label className="text">Upload Profile Picture</label>
      <div 
        {...getRootProps({ 
          className: `dropzone ${error ? 'error' : ''} ${isDragActive ? 'active' : ''}` 
        })}
      >
        <input {...getInputProps()} />
        <div className="preview-container">
          { preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <div className="upload-content">
              { uploadState === 'uploading' ? (
                <div className="upload-status">
                  <div className="loading-spinner" />
                  <p>Uploading your image...</p>
                </div>
              ) : (
                <p>Drag & Drop or Click to Upload</p>
              ) }
            </div>
          ) }
        </div>
      </div>
      {(error || uploadState === 'error') && (
        <p className="error-message">
          {error || 'Upload failed. Please try again.'}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;