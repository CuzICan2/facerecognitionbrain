import React, {useState} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
const particlesOptions = {
  particles: {
    number: {
    value: 300, 
    density: true, 
    value_area: 800
    }    
  }
}


const App = () => {
  
/*  constructor() { //New react func useState removes need of constructor
    super();
    this.state = {
      input: '',
    }
  }
*/
  const [input, setInput] = useState(' ');
  const [box, setBox] = useState(' ');
  
  const app = new Clarifai.App({
    apiKey: 'b8f9deab7a7946c7a17ba43972b3b69a'
   });

  const onInputChange = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
    // console.log('input=' + input);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width); 
    const imageHeight = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * imageWidth,
      topRow: clarifaiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
    }
  }

  const displayFaceBox = (boxParams) => {
    setBox(boxParams);
    console.log('box= ' + box);
    console.log('boxParams: top= ' + boxParams.topRow + 'left= ' + boxParams.leftCol + 'right= ' + boxParams.rightCol + 'bottom= ' + boxParams.bottomRow);
    console.log('box: top= ' + box.topRow + 'left= ' + box.leftCol + 'right= ' + box.rightCol + 'bottom= ' + box.bottomRow);
  }

  const onButtonSubmit = () => { 
    console.log('Click');  // do something with response
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, input)
        .then(function(response) {
          displayFaceBox(calculateFaceLocation(response));
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);  
        },
        function(err) {
          console.log('Something went wrong' + err);
        }
      // ...or with deconstruct and promises:
      /*
      app.models.predict(
      Clarifai.FACE_DETECT_MODEL, input)
      .then(response => calculateFaceLocation(response)
      .catch(err = console.log(err)); */ 
      );
  }

 
  //render() 

  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition box={box} imageUrl={input} /> 
    </div>
  );
}

export default App;
