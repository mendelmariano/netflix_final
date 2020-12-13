import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoder";


export const getCountry = ({ lat, lng }) => {


    return new Promise((resolve, reject) => {
        Geocoder.geocodePosition(
            { lat, lng }
        ).then((location) => {
            location.forEach(function(value) {
                if(value.countryCode !== null){
                    resolve(value.countryCode);
                }
              });
            
        }).catch((error) => {
            reject(error);
        });
    });
};

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        const onReceiveLocation = (geolocation) => {
            resolve(geolocation);
        };

        Geolocation.getCurrentPosition(onReceiveLocation, (error) => {
            reject(error);
        });

    });

};
