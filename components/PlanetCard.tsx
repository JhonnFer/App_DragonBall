import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { Planet } from "../src/domain/models/Planet.model";
import { globalStyles } from "../src/presentation/styles/globalStyles";

interface PlanetCardProps {
  planet: Planet;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  return (
    <View style={globalStyles.planetCard}>
      <Image
        source={{ uri: planet.image }}
        style={globalStyles.planetImage}
        contentFit="cover"
        transition={300}
      />

      <View style={globalStyles.planetInfo}>
        <Text style={globalStyles.planetName}>{planet.name}</Text>
        <Text style={globalStyles.planetDescription} numberOfLines={3}>
          {planet.description}
        </Text>

        <View style={globalStyles.planetStatus}>
          <View
            style={[
              globalStyles.statusBadge,
              planet.isDestroyed
                ? globalStyles.statusDestroyed
                : globalStyles.statusActive,
            ]}
          >
            <Text style={globalStyles.statusText}>
              {planet.isDestroyed ? "Destruido" : "Activo"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
