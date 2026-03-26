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
      <div style="position:absolute;left:20px;top:6px;width:24px;height:16px;background:linear-gradient(135deg,#2f7cff 0%,#0f62ff 100%);border-radius:4px 7px 7px 2px;box-shadow:0 10px 18px rgba(20,99,255,.28);"></div>
      <div style="position:absolute;left:20px;top:6px;width:0;height:0;border-top:8px solid transparent;border-bottom:8px solid transparent;border-right:10px solid #1d6fff;transform:translateX(24px);"></div>
      <div style="position:absolute;left:27px;top:10px;width:12px;height:2.8px;border-radius:999px;background:#9fc4ff;"></div>
      <div style="position:absolute;left:27px;top:15px;width:9px;height:2.8px;border-radius:999px;background:#dce9ff;"></div>
      <div style="position:absolute;left:27px;top:20px;width:11px;height:2.8px;border-radius:999px;background:#9fc4ff;"></div>
      <div style="position:absolute;left:15px;bottom:4px;width:14px;height:14px;border-radius:999px;background:#ffffff;border:3px solid #1463ff;box-shadow:0 8px 16px rgba(20,99,255,.24);"></div>
    </div>
  `,
  iconSize: [44, 56],
  iconAnchor: [22, 50],
});

const currentLocationIcon = new L.DivIcon({
  className: "current-location-marker",
  html: `
    <div style="position:relative;width:34px;height:34px;">
      <div style="position:absolute;inset:0;border-radius:999px;background:rgba(77,159,255,.18);"></div>
      <div style="position:absolute;left:5px;top:5px;width:24px;height:24px;border-radius:999px;background:rgba(77,159,255,.28);"></div>
      <div style="position:absolute;left:11px;top:11px;width:12px;height:12px;border-radius:999px;background:#1677ff;border:4px solid #ffffff;box-sizing:border-box;"></div>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
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
          <Marker
            icon={currentLocationIcon}
            position={[currentLocation.latitude, currentLocation.longitude]}
          >
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
