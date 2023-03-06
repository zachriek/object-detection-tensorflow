import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as cocoModel from '@tensorflow-models/coco-ssd';

const App = () => {
  const [model, setModel] = useState('');
  const [object, setObject] = useState([]);

  const loadModel = async () => {
    try {
      const dataset = await cocoModel.load();
      setModel(dataset);
    } catch (err) {
      console.log(err);
    }
  };

  const predict = async () => {
    const detection = await model.detect(document.getElementById('video'));
    if (detection.length > 0) {
      setObject(detection);
    }
  };

  const videoOption = { width: 720, height: 480, facingMode: 'environment' };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  return (
    <section className="min-h-screen bg-zinc-50 flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl text-zinc-900 font-bold mb-4">Hello World</h1>
        <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-900 text-white rounded mb-4" onClick={predict}>
          Predict
        </button>
        <ul>
          {object &&
            object?.map((result, index) => (
              <li key={index}>
                {result.class.toString()} - {result.score.toString()}
              </li>
            ))}
        </ul>
        <Webcam audio={false} videoConstraints={videoOption} className="mt-6 mx-auto" id="video" />
      </div>
    </section>
  );
};

export default App;
