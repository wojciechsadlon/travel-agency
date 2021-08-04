import React from 'react';
import {connect} from 'react-redux';
import styles from './App.module.scss';
/* eslint-disable no-unused-vars */
import {BrowserRouter, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AnimatedSwitch, AnimatedRoute} from 'react-router-transition';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/views/Home/Home';
import Trips from './components/views/Trips/TripsContainer';
import Trip from './components/views/Trip/TripContainer';
import Countries from './components/views/Countries/CountriesContainer';
import Regions from './components/views/Regions/RegionsContainer';
import Info from './components/views/Info/Info';
import NotFound from './components/views/NotFound/NotFound';
import Country from './components/views/Country/CountryContainer';

import parseTrips from './utils/parseTrips';
import {setMultipleStates} from './redux/globalRedux';

class App extends React.Component {
  static propTypes = {
    trips: PropTypes.array,
    setStates: PropTypes.func,
  }

  constructor(props){
    super(props);
    // parse trips when App is first created
    parseTrips(this.props.trips, this.props.setStates);
  }

  componentDidUpdate(prevProps){
    if(prevProps.trips !== this.props.trips){
      // parse trips again if they changed
      parseTrips(this.props.trips, this.props.setStates);
    }
  }

  

  render(){
    const routeProps = {
      exact: true,
      atEnter: { offset: 200 },
      atLeave: { offset: 200 },
      atActive: { offset: 0 }, 
      mapStyles: (styles) => ({
        transform: `translateY(${styles.offset}px)`,
      })
    };
    
    return (
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.switchWrapper}
          >
            <AnimatedRoute path='/' component={Home} {...routeProps} />
            <AnimatedRoute path='/trips' component={Trips} {...routeProps} />
            <AnimatedRoute path='/trip/:id' component={Trip} {...routeProps} />
            <AnimatedRoute path='/countries' component={Countries} {...routeProps} />
            <AnimatedRoute path='/regions' component={Regions} {...routeProps} />
            <AnimatedRoute path='/info' component={Info} {...routeProps} />
            <AnimatedRoute path='/country/:id' component={Country} {...routeProps} />
            <AnimatedRoute path='*' component={NotFound} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  trips: state.trips,
});

const mapDispatchToProps = dispatch => ({
  setStates: newState => dispatch(setMultipleStates(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
