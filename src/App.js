import React, { Component } from 'react';
import './index.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      test: 'Nothing Yet',
      city: '',
      country: '',
      // tempScale: '',
      condition: '',
      temp: 0,
      humidity: 0,
      image: ''
    }


  }

  //This function is used to test that the server is live. 
  componentDidMount() {
    axios.get('/test').then((res, req) => { this.setState({ test: res.data }) })
    // .then(this.addPhoto())
  };


  handleUpdate = () => {
    // console.log('Clicked')
    axios.post(`/weather/${this.state.city}/${this.state.country}`)
      .then(res => {
        console.log(res.data, 'clicked');
        this.setState({ condition: res.data.condition, temp: res.data.temp, humidity: res.data.humidity })
      })
      .then( () =>this.addPhoto())
  }

  addPhoto = () => {
    axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${this.state.condition}-weather&orientation=landscape&client_id=bba5128c4dbaa98c52e3bfc53e9bc8ec198d66ce775e18bd4fb5ca33bfe231ad`)
         .then(res => {
           console.log(res.data.results[0].urls.raw,"photo updated")
           this.setState({image: res.data.results[0].urls.thumb})
         })
  }

  // Run the api call to OWM inside of the submit function (updating the location state at the same time), send the results in a post function to the node server, and return the results to update state.

  // City and state inputs need to update server side get request and update 'location' in state.

  //Farenheiht and Celsius buttons need update temperature scale preference in server side get request.

  //I need to store the last submitted location in the state to be sent by default anytime the temp scale is changed.





  ////////////////////////////////////////-\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  //Note to self, this is where the components and elements are made. Hence "render"
  render() {
    return (



      <div className="App">

        {/* {console.log(this.state.test)} */}

        <div className="left_side_bar"> Your Weather, Your Way</div>

        <div className="right_side_inputs">

          <h1>Current Conditions</h1>
          
          {this.state.condition?<img src={this.state.image}/>:null}

          <ul className='city'>City:              <input className="city_input" placeholder="City" onChange={(event) => { this.setState({ city: event.target.value }) }}></input>
        </ul>
          
          <ul className='country'>Country:              <input className="country_input" placeholder="Country" onChange={(event) => { this.setState({ country: event.target.value }) }} ></input>         <button onClick={this.handleUpdate}>Submit</button></ul>
          
         
          

          {console.log(this.state.city, this.state.country, this.state.temp)}
          {/* <button className="temp_scale_button" >F</button>
          <button className="temp_scale_button" >C</button> */}


          <ul id='location'>Location:  {this.state.city} {this.state.country}</ul>
          <ul id='conditions'>Conditions:  {this.state.condition}</ul>
          <ul id='temperature'>Temperature:  {this.state.temp}°</ul>
          <ul id='humidity'>Humidity:  {this.state.humidity}%</ul>
          
        </div>

      </div>
    );
  }
}

export default App;
