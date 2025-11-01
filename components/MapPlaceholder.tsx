import React from 'react';

interface MapPlaceholderProps {
  location: { latitude: number; longitude: number; } | null;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ location }) => {
  if (!location) {
    return <div className="text-center text-gray-400">Location not provided.</div>;
  }

  const { latitude, longitude } = location;
  // Using OpenStreetMap static image API as a placeholder
  const mapUrl = `https://render.openstreetmap.org/cgi-bin/export?bbox=${longitude-0.005},${latitude-0.005},${longitude+0.005},${latitude+0.005}&scale=5000&layer=mapnik`;

  return (
    <div>
      <img src={mapUrl} alt="Map showing issue location" className="w-full h-48 object-cover rounded-lg border border-gray-600" />
      <p className="text-xs text-gray-400 mt-2 text-center">
        Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}
      </p>
    </div>
  );
};

export default MapPlaceholder;
