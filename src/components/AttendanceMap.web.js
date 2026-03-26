import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import L from "leaflet";
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const companyIcon = new L.DivIcon({
  className: "company-marker",
  html: `
    <div style="position:relative;width:44px;height:56px;">
      <div style="position:absolute;left:20px;top:8px;width:4px;height:34px;border-radius:999px;background:#15315f;box-shadow:0 6px 14px rgba(21,49,95,.22);"></div>
      <div style="position:absolute;left:20px;top:6px;width:0;height:0;border-left:0 solid transparent;border-right:18px solid transparent;border-top:0 solid transparent;border-bottom:12px solid #1463ff;"></div>
      <div style="position:absolute;left:20px;top:6px;width:22px;height:16px;background:linear-gradient(135deg,#1a73ff 0%,#0d4fd3 100%);border-radius:4px 6px 6px 2px;box-shadow:0 10px 18px rgba(20,99,255,.28);"></div>
      <div style="position:absolute;left:26px;top:12px;width:5px;height:5px;border-radius:999px;background:rgba(255,255,255,.92);"></div>
      <div style="position:absolute;left:15px;bottom:4px;width:14px;height:14px;border-radius:999px;background:#ffffff;border:3px solid #1463ff;box-shadow:0 8px 16px rgba(20,99,255,.24);"></div>
    </div>
  `,
  iconSize: [44, 56],
  iconAnchor: [22, 50],
});

function MapViewport({ companyLocation, currentLocation }) {
  const map = useMap();

  useEffect(() => {
    if (currentLocation) {
      map.setView([currentLocation.latitude, currentLocation.longitude], 15);
      return;
    }

    map.setView([companyLocation.latitude, companyLocation.longitude], 15);
  }, [companyLocation.latitude, companyLocation.longitude, currentLocation, map]);

  return null;
}

export default function AttendanceMap({
  companyLocation,
  companyName,
  companyRadiusMeters,
  currentLocation,
  style,
}) {
  return (
    <View style={[styles.wrapper, style]}>
      <MapContainer
        center={[companyLocation.latitude, companyLocation.longitude]}
        scrollWheelZoom
        style={styles.map}
        zoom={15}
      >
        <MapViewport companyLocation={companyLocation} currentLocation={currentLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={[companyLocation.latitude, companyLocation.longitude]}
          fillColor="rgba(20, 99, 255, 0.12)"
          pathOptions={{ color: "rgba(20, 99, 255, 0.55)", weight: 2 }}
          radius={companyRadiusMeters}
        />
        <Marker
          icon={companyIcon}
          position={[companyLocation.latitude, companyLocation.longitude]}
        >
          <Popup>
            {companyName}
            <br />
            허용 반경 {companyRadiusMeters}m
          </Popup>
        </Marker>
        {currentLocation ? (
          <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
            <Popup>현재 위치</Popup>
          </Marker>
        ) : null}
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#dfe7f4",
    padding: 16,
  },
  map: {
    borderRadius: 24,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    zIndex: 1,
  },
});
