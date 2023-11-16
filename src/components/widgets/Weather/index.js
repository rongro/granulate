import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { device } from '../../../styles/device';
import { getWeather } from '../../../api/weather';

const Wrapper = styled.div`
    width: 120px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 20px;
    top: 20px;
    background: skyblue;
    border-radius: 5px;

    @media ${device.mobile} {
        right: calc(50vw - 60px);
    }
`;

const Temperature = styled.div`
    font-size: 36px;
    color: #fff;
    font-weight: bold;
`;

const Image = styled.img`
    width: 64px;
`;

export default function Weather() {
    const [currentLocation, setCurrentLocation] = useState(null);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    // console.log(position.coords);
                },
                error => {
                    console.error(`Failed to get location. Error: '${error}'.`);
                }
            );
        }
        else {
          console.error('Geolocation API is not supported!');
        }
    };

    useEffect(getCurrentLocation, []);

    const getWeatherDetails = useCallback(() => {
        return getWeather(currentLocation);
    }, [currentLocation]);

    const { temperature, icon } = getWeatherDetails();
    
    return (<Wrapper>
                <Temperature>{temperature}&deg;</Temperature>
                <Image src={icon} />
            </Wrapper>
    );
}
