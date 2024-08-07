"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createThirdwebClient } from 'thirdweb';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import {
  FaWallet,
  FaUser,
  FaMapMarkerAlt,
  FaUpload,
  FaRuler,
  FaTicketAlt,
  FaLeaf,
  FaBus,
  FaBicycle,
  FaTimes
} from 'react-icons/fa';
import { IoMdTimer } from "react-icons/io";
import Logo from "./logo.svg";
import Image from 'next/image';
import "../globals.css";
import {
  ThirdwebProvider,
  ConnectButton,
} from "thirdweb/react";
import {
  createWallet,
  walletConnect,
  inAppWallet,
} from "thirdweb/wallets";

function Home(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ['places'],
  });

  const client = createThirdwebClient({
    clientId: '6dd25ec3a99444742b12f59d5f3e2bce',
  });

  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    walletConnect(),
    inAppWallet({
      auth: {
        options: [
          "email",
          "google",
          "apple",
          "facebook",
          "phone",
        ],
      },
    }),
  ];

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>('');   

  const [duration, setDuration] = useState<string>('');
  const   
 [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const calculateRoute = useCallback(async () => {
    if (!isLoaded || !originRef.current?.value || !destinationRef.current?.value) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin:   
 originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);   

      setDistance(results.routes[0].legs[0].distance?.text || '');
      setDuration(results.routes[0].legs[0].duration?.text || '');
    } catch (error)   
 {
      console.error("Error calculating route:", error);
    }
  }, [isLoaded]);

  const clearRoute = useCallback(() => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value   
 = '';
  }, []);

  const distanceInt = parseFloat(distance);
  const distanceNumber = distanceInt * 10;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude   
  
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  
  return (
    <div className="min-h-screen w-full flex items-center flex-col mx-auto animate-fadeIn bg-[#030308] text-[#b0b0cc] overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510] via-[#030308] to-[#020204] z-0"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#ff69b4] rounded-full mix-blend-screen filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#7b68ee] rounded-full mix-blend-screen filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00ced1] rounded-full mix-blend-screen filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#ffa500] rounded-full mix-blend-screen filter blur-xl animate-blob"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <header className="flex justify-between items-center bg-opacity-50 bg-[#0a0a20] backdrop-filter backdrop-blur-lg p-6 rounded-3xl shadow-2xl mb-10 sticky top-5 z-50 transition-all duration-300 ease-in-out hover:shadow-[#7b68ee]/10 w-[90vw] mx-auto border border-[#2a2a4a]/30">
          <div className="flex items-center gap-4">
            <Image src={Logo} className="h-12 w-auto transition-transform duration-300 ease-in-out hover:scale-105" alt="GreenStride Logo" />
            <h1 className="text-[#7b68ee] text-3xl font-bold tracking-wide">GreenStride</h1>
          </div>
          <div className="flex gap-5">
          <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={"dark"}
        connectModal={{ size: "wide" }}
      />
    </ThirdwebProvider>
            <button className="flex items-center text-[#b0b0cc] bg-[#1a1a3a] bg-opacity-50 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out hover:bg-[#7b68ee] hover:text-[#030308] font-medium text-sm gap-2.5 shadow-lg hover:shadow-[#7b68ee]/20">
              <FaUser /> Account
            </button>
          </div>
        </header>
        
        <main className="flex flex-col gap-16 py-10 w-[90vw] mx-auto">
          <section className="w-full bg-opacity-50 bg-[#0a0a20] backdrop-filter backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-[#2a2a4a]/30 transform hover:scale-[1.02] transition-all duration-300">
            <h1 className="text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7b68ee] to-[#00ced1] mb-6">Explore the Cosmos of Green Transport</h1>
            <p className="text-[#8080a0] mb-8 text-xl leading-relaxed max-w-3xl">Join us in creating a sustainable future that's as vast and beautiful as the universe itself. Together, we can reach for the stars while keeping our planet green.</p>
            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-3 text-[#ff69b4]">
                <FaLeaf className="text-2xl" />
                <span>Eco-friendly</span>
              </div>
              <div className="flex items-center gap-3 text-[#00ced1]">
                <FaBus className="text-2xl" />
                <span>Public Transit</span>
              </div>
              <div className="flex items-center gap-3 text-[#ffa500]">
                <FaBicycle className="text-2xl" />
                <span>Active Transport</span>
              </div>
            </div>
            <div className="w-full h-64 bg-gradient-to-r from-[#7b68ee] via-[#00ced1] to-[#ff69b4] rounded-2xl animate-pulse shadow-lg opacity-60"></div>
          </section>
          
          <div className="flex justify-between w-full items-stretch gap-10">
            <section className="w-1/2 mapbox bg-opacity-50 bg-[#0a0a20] backdrop-filter backdrop-blur-lg rounded-3xl p-10 shadow-2xl transition-all duration-300 hover:shadow-[#7b68ee]/20 border border-[#2a2a4a]/30">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7b68ee] to-[#00ced1]">Cosmic Map</h2>
              {isLoaded ? (
                <div className="flex flex-col h-[90%]">
                  <div className="flex-grow mb-4 rounded-xl overflow-hidden">
                  <GoogleMap
  center={userLocation || { lat: 48.8584, lng: 2.2945 }}
  zoom={15}
  mapContainerStyle={{ width: '100%', height: '100%', minHeight: '300px' }}
  options={{
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
  }}
  onLoad={(map) => setMap(map)}
>
  {userLocation && (
    <Marker
      position={userLocation}
      icon={{
        url: "https://www.onlygfx.com/wp-content/uploads/2022/03/neon-circle-3.png",
        scaledSize: new google.maps.Size(30, 30), // Adjust size
      }}
    />
  )}
  {directionsResponse && (
    <DirectionsRenderer directions={directionsResponse} />
  )}
</GoogleMap>

                  </div>
                  {distance && duration && (
                    <div className="flex justify-between text-[#8080a0] mt-4">
                      <span>Distance: {distance}</span>
                      <span>Duration: {duration}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-[#8080a0]">Loading map...</div>
              )}
            </section>

            <section className="w-1/2 bg-opacity-50 bg-[#0a0a20] backdrop-filter backdrop-blur-lg rounded-3xl p-10 shadow-2xl transition-all duration-300 hover:shadow-[#7b68ee]/20 border border-[#2a2a4a]/30">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#7b68ee] to-[#00ced1]">Chart Your Journey</h2>
              <div className="space-y-6">
                {isLoaded ? (
                  <Autocomplete className='relative z-10'>
                    <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-[#7b68ee]/20 group">
                      <label className="text-sm text-[#6060a0] mb-1 block group-focus-within:text-[#7b68ee]">Origin</label>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-[#7b68ee] mr-3" />
                        <input
                          type="text"
                          ref={originRef}
                          placeholder="Enter your launch point"
                          className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full"
                        />
                      </div>
                    </div>
                  </Autocomplete>
                ) : (
                  <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4">
                    <label className="text-sm text-[#6060a0] mb-1 block">Origin</label>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-[#7b68ee] mr-3" />
                      <input
                        type="text"
                        placeholder="Loading..."
                        disabled
                        className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full"
                      />
                    </div>
                  </div>
                )}

                {isLoaded ? (
                  <Autocomplete>
                    <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-[#7b68ee]/20 group">
                      <label className="text-sm text-[#6060a0] mb-1 block group-focus-within:text-[#7b68ee]">Destination</label>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-[#7b68ee] mr-3" />
                        <input
                          type="text"
                          ref={destinationRef}
                          placeholder="Enter your cosmic destination"
                          className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full"
                        />
                      </div>
                    </div>
                  </Autocomplete>
                ) : (
                  <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4">
                    <label className="text-sm text-[#6060a0] mb-1 block">Destination</label>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-[#7b68ee] mr-3" />
                      <input
                        type="text"
                        placeholder="Loading..."
                        disabled
                        className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    className="bg-gradient-to-r from-[#7b68ee] to-[#00ced1] text-[#030308] px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#7b68ee]/20"
                    onClick={calculateRoute}
                    disabled={!isLoaded}
                  >
                    Calculate Route
                  </button>
                  <button
                    className="bg-[#1a1a3a] bg-opacity-50 text-[#b0b0cc] px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-[#2a2a4a]"
                    onClick={clearRoute}
                    disabled={!isLoaded}
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-[#7b68ee]/20 group">
                  <label className="text-sm text-[#6060a0] mb-1 block group-focus-within:text-[#7b68ee]">Distance</label>
                  <div className="flex items-center">
                    <FaRuler className="text-[#7b68ee] mr-3" />
                    <div className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full" >{distance}</div>
                  </div>
                </div>
                <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-[#7b68ee]/20 group">
                  
                  <label className="text-sm text-[#6060a0] mb-1 block group-focus-within:text-[#7b68ee]">Duration</label>
                  <div className="flex items-center">
                    <IoMdTimer className="text-[#7b68ee] mr-3" />
                    <div className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full" >{duration}</div>
                  </div>
                </div>
                <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-[#7b68ee]/20 group">
                  
                  <label className="text-sm text-[#6060a0] mb-1 block group-focus-within:text-[#7b68ee]">Tokens</label>
                  <div className="flex items-center">
                    <IoMdTimer className="text-[#7b68ee] mr-3" />
                    <div className="bg-transparent outline-none text-base text-[#b0b0cc] placeholder-[#4040a0] w-full" >{distanceNumber}</div>
                  </div>
                </div>
                <div className="bg-[#1a1a3a] bg-opacity-50 rounded-xl p-4 transition-all duration-300 focus-within:shadow-lg focus-within:shadow-[#7b68ee]/20">
                  <label className="block text-sm font-medium mb-2 text-[#8080a0]">Upload Journey Log</label>
                  <input type="file" id="ticket-upload" className="hidden" />
                  <label htmlFor="ticket-upload" className="flex items-center justify-center bg-gradient-to-r from-[#7b68ee] to-[#00ced1] text-[#030308] px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-300 hover:from-[#8b78fe] hover:to-[#10ded1] shadow-md hover:shadow-lg">
                    <FaUpload className="mr-2" /> Choose File
                  </label>
                </div>
              </div>
              <button className="w-full mt-8 bg-gradient-to-r from-[#7b68ee] via-[#00ced1] to-[#ff69b4] text-[#030308] py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#7b68ee]/20 transform hover:-translate-y-1">
                Claim Your Green Reward
              </button>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;