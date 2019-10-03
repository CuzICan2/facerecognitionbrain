import React, {useState, /* useEffect */} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
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
  
/*  constructor() { //New react func useState removes need of classes and hence constructor 
    super();
    this.state = {
      input: '',
    }
  }
*/

  /* Declaring state variables as webhooks */
  const [input, setInput] = useState('');
  const [box, setBox] = useState('');
  const [route, setRoute] = useState('signIn');
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState('');

  const app = new Clarifai.App({
  apiKey: 'b8f9deab7a7946c7a17ba43972b3b69a'
  });

  /*  test the server connection */
  /* 
  useEffect(() => {
  fetch('http://localhost:3000')
  .then(response => response.json()) 
  .then(console.log)
  })
  */

  const onInputChange = (event) => {
  console.log(event.target.value);
  setInput(event.target.value);
  // console.log('input=' + input);
  }

  const loadUser = (user) => {
  console.log('Loading user: ' +user); 
  setUser(user);
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
  }

  const onButtonSubmit = () => { 
 // with deconstruct and promises: 
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          setUser({...user, entries: count}) // update entries in a state hook object!!! Tricky...study
        })
      }
      displayFaceBox(calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }


  //render() //part of constuctor
  const onRouteChange = (reroute) => {
  if (reroute === 'signOut') {
    setSignedIn(false);
  }
  else if (reroute === 'home') { 
    setSignedIn(true);
  }
  setRoute(reroute); 
  } 

  return (
  <div className="App">
    <Particles className='particles' params={particlesOptions} />
    <Navigation signedIn={signedIn} onRouteChange={onRouteChange} />
    { route === 'home' //if route = home...
    ? <div>              
        <Logo /> 
        <Rank user={user} />
        <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
        <FaceRecognition box={box} imageUrl={input} /> 
      </div> //...else return this <div> 
    : (route === 'signIn'
      ? <Signin onRouteChange={onRouteChange} loadUser={loadUser}/>         //...then return signin form 
      : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )
    } 
  </div>
  );
}

export default App;
