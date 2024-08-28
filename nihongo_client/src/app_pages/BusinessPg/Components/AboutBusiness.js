import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect } from "react";

function AboutBusiness({ specificBusiness }) {
  const businessAddress = `${specificBusiness.building_numbers} ${specificBusiness.neighbourhood}, ${specificBusiness.city}, ${specificBusiness.prefecture.prefecture_name}, ${specificBusiness.postal_code}`;
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  console.log(process.env.NODE_ENV);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  console.log(apiKey)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey, // Use the environment variable for the API key
  });

  useEffect(() => {
    if (isLoaded && businessAddress) {
      geocodeAddress(businessAddress);
    }
  }, [isLoaded, businessAddress]);

  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setCoordinates({ lat: lat(), lng: lng() });
      } else {
        console.error("Geocoding failed:", status);
      }
    });
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div>
      <h1>Map</h1>
      {coordinates.lat !== null && coordinates.lng !== null ? (
        <GoogleMap 
          zoom={12} 
          center={coordinates} 
          mapContainerStyle={{ 
            height: "530px", 
            width: "97%",
            marginLeft: "10px",
            borderRadius: "24px"
           }}
        >
          <Marker position={coordinates} onClick={() => setShowInfoWindow(true)} />
          {showInfoWindow && (
            <InfoWindow position={coordinates} onCloseClick={() => setShowInfoWindow(false)}>
              <div>
                <h3>{specificBusiness.name}</h3>
                <p>{businessAddress}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <p>Loading Map...</p>
      )}
    </div>
  );
}

export default AboutBusiness;

