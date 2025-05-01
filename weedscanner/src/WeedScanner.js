import * as tf from '@tensorflow/tfjs';
import React, { useState, useEffect } from 'react';
import './WeedScanner.css';

function WeedScanner() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);

  // Load the TensorFlow model when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/models/plant-model.json'); // Adjust path as needed
        setModel(loadedModel);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };
    loadModel();
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setResult(null); // Clear previous result
    }
  };

  // Process the image and make predictions
  const handleScan = async () => {
    if (!image) {
      alert('Please upload an image first.');
      return;
    }
    if (!model) {
      alert('Model is not loaded yet. Please wait.');
      return;
    }

    setLoading(true);

    try {
      // Convert the uploaded image to a tensor
      const img = document.createElement('img');
      img.src = URL.createObjectURL(image);
      img.onload = async () => {
        const tensor = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([224, 224]) // Resize to model input size
          .toFloat()
          .expandDims(); // Add batch dimension

        // Make predictions
        const predictions = model.predict(tensor);
        const predictedIndex = predictions.argMax(-1).dataSync()[0];

        // Mock labels (replace with actual labels from your model)
        const labels = ['Plant A', 'Plant B', 'Plant C'];
        const confidence = predictions.dataSync()[predictedIndex];

        setResult({
          plantName: labels[predictedIndex],
          confidence: confidence,
        });

        setLoading(false);
      };
    } catch (error) {
      console.error('Error processing image:', error);
      setLoading(false);
    }
  };

  // Reset the state for retaking a scan
  const handleRetake = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div style={styles.container}>
      {!image && !result && (
        <div style={styles.screen} className="center-container">
          <h2>WEED SCANNER</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="uploadInput"
            style={{ display: 'none' }}
          />
          <button style={styles.button} onClick={() => document.getElementById('uploadInput').click()}>
            SCAN WEED
          </button>
        </div>
      )}

      {image && !result && (
        <div style={styles.screen}>
          <button style={styles.backButton}>←</button>
          <div>
            <h2>Upload</h2>
            {image && <p>Selected Image: {image.name}</p>}
            <button style={styles.button} onClick={handleScan} disabled={loading}>
              {loading ? 'Scanning...' : 'Process Image'}
            </button>
          </div>
        </div>
      )}

      {result && (
        <div style={styles.screen}>
          <button style={styles.backButton}>←</button>
          <h2>Result</h2>
          <div style={styles.resultContainer}>
            <p>Plant Name: {result.plantName}</p>
            <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          </div>
          <button style={styles.button} onClick={handleRetake}>
            Retake
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { /* ... */ },
  screen: { /* ... */ },
  icon: { /* ... */ },
  button: { /* ... */ },
  backButton: { /* ... */ },
  resultContainer: { /* ... */ },
};

export default WeedScanner;