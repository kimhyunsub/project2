import { StyleSheet, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

export default function AttendanceMap({
  companyLocation,
  companyName,
  companyRadiusMeters,
  currentLocation,
  style,
}) {
  return (
    <MapView
      showsUserLocation
      style={style}
      initialRegion={companyLocation}
      region={
        currentLocation
          ? {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }
          : companyLocation
      }
    >
      <Marker coordinate={companyLocation} title={companyName}>
        <View style={styles.flagMarker}>
          <View style={styles.flagPole} />
          <View style={styles.flag} />
          <View style={styles.flagDot} />
          <View style={styles.flagPin} />
        </View>
      </Marker>
      <Circle
        center={companyLocation}
        fillColor="rgba(20, 99, 255, 0.12)"
        radius={companyRadiusMeters}
        strokeColor="rgba(20, 99, 255, 0.45)"
        strokeWidth={2}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  flagMarker: {
    alignItems: "center",
    height: 56,
    justifyContent: "flex-end",
    width: 44,
  },
  flagPole: {
    backgroundColor: "#15315f",
    borderRadius: 999,
    height: 34,
    position: "absolute",
    top: 8,
    width: 4,
  },
  flag: {
    backgroundColor: "#1463ff",
    borderRadius: 4,
    height: 16,
    position: "absolute",
    right: 2,
    top: 6,
    width: 22,
  },
  flagDot: {
    backgroundColor: "#ffffff",
    borderRadius: 999,
    height: 5,
    position: "absolute",
    right: 11,
    top: 12,
    width: 5,
  },
  flagPin: {
    backgroundColor: "#ffffff",
    borderColor: "#1463ff",
    borderRadius: 999,
    borderWidth: 3,
    height: 14,
    marginBottom: 4,
    width: 14,
  },
});
