import React, { useEffect, useState } from 'react';

import { StatusBar, Dimensions } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import styled from 'styled-components/native';

import Header from '../components/Header';
import Hero from '../components/Hero';
import Movies from '../components/Movies';
import { getLocation, getCountry } from '../utils/Location';
import ProfileContext from "../context/ProfileContext";


const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const Poster = styled.ImageBackground`
  width: 100%;
  height: ${(Dimensions.get('window').height * 81) / 100}px;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
`;

const Home = (props) => {

  const [movies, setMovies] = useState([]);
  const [nationalMovies, setNationalMovies] = useState([]);
  const [position, setPosition] = useState(null);


  useEffect(() => {
    const location = getLocation().then((info) => {
      setPosition(info);
    }).catch(() => {
      setPosition(null);
    });

  }, []);

  useEffect(() => {
    const getNationalMovies = async () => {
      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const country = await getCountry({ lat, lng });

        const filterMovies = movies.filter((item, index) => {
          return item.Country.indexOf(country) !== -1;
        });
        setNationalMovies(filterMovies);
      }
    };

    getNationalMovies();


  }, [position]);


  useEffect(() => {
    const data = require('../assets/Movies.json');
    setMovies(data);

  }, []);



  return (
    <ProfileContext.Consumer>
      {({ user, changeUser }) => {

        let movieToResume = [];

        if (user) {
          const data = require("../assets/moviesToResume.json");
          movieToResume = data[user];
        }

        return (
          <>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <Container>
              <Poster source={require('../assets/poster.jpg')}>
                <Gradient
                  locations={[0, 0.2, 0.6, 0.93]}
                  colors={[
                    'rgba(0,0,0,0.5)',
                    'rgba(0,0,0,0.0)',
                    'rgba(0,0,0,0.0)',
                    'rgba(0,0,0,1)',
                  ]}>
                  <Header />
                  <Hero />
                </Gradient>
              </Poster>
              <Movies label={`Continuar assistindo ${user}`} data={movieToResume} />
              <Movies label="Nacionais" data={nationalMovies} />
              <Movies label="Recomendados" data={movies} />
              <Movies label="Top 10" data={movies} />
            </Container>
          </>
        )
      }}

    </ProfileContext.Consumer>
  );
};

export default Home;
