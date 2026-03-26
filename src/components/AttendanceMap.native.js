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
          <View style={styles.flagFoldPrimary} />
          <View style={styles.flagFoldSecondary} />
          <View style={styles.flagFoldTertiary} />
          <View style={styles.flagPin} />
        </View>
      </Marker>
      {currentLocation ? (
        <Marker anchor={{ x: 0.5, y: 0.5 }} coordinate={currentLocation} title="현재 위치">
          <View style={styles.currentLocationMarker}>
            <View style={styles.currentLocationHalo} />
            <View style={styles.currentLocationHaloInner} />
            <View style={styles.currentLocationDot} />
          </View>
        </Marker>
      ) : null}
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
    backgroundColor: "#2f7cff",
    borderRadius: 4,
    height: 16,
    position: "absolute",
    right: 0,
    top: 6,
    width: 24,
  },
  flagFoldPrimary: {
    backgroundColor: "#9fc4ff",
    borderRadius: 999,
    height: 3,
    position: "absolute",
    right: 5,
    top: 10,
    width: 12,
  },
  flagFoldSecondary: {
    backgroundColor: "#dce9ff",
    borderRadius: 999,
    height: 3,
    position: "absolute",
    right: 8,
    top: 15,
    width: 9,
  },
  flagFoldTertiary: {
    backgroundColor: "#9fc4ff",
    borderRadius: 999,
    height: 3,
    position: "absolute",
    right: 6,
    top: 20,
    width: 11,
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
  currentLocationMarker: {
    alignItems: "center",
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  currentLocationHalo: {
    backgroundColor: "rgba(77,159,255,0.18)",
    borderRadius: 999,
    height: 30,
    position: "absolute",
    width: 30,
  },
  currentLocationHaloInner: {
    backgroundColor: "rgba(77,159,255,0.28)",
    borderRadius: 999,
    height: 20,
    position: "absolute",
    width: 20,
  },
  currentLocationDot: {
    backgroundColor: "#1677ff",
    borderColor: "#ffffff",
    borderRadius: 999,
    borderWidth: 4,
    height: 12,
    width: 12,
  },
});
