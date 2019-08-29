import React, {useState} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
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
  const app = new Clarifai.App({
    apiKey: 'b8f9deab7a7946c7a17ba43972b3b69a'
   });

  const onInputChange = (event) => {
    console.log(event.target.value);
    console.log('hej'); 
    setInput(event.target.value);
  }

  const onButtonSubmit = () => { 
    console.log(input);
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
      .then(
      function(response) {
        console.log(response);  // do something with response
      },
      function(err) {
      // there was an error
      }
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
      {/*}      <FaceRecognition /> 
      */}
    </div>
  );
}

export default App;
