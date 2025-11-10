import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Character } from "../src/domain/models/Character.model";
import { globalStyles } from "../src/presentation/styles/globalStyles";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <TouchableOpacity
      style={globalStyles.characterCard}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: character.image }}
        style={globalStyles.characterImage}
        contentFit="contain"
        transition={300}
      />

      <View style={globalStyles.characterInfo}>
        <Text style={globalStyles.characterName} numberOfLines={1}>
          {character.name}
        </Text>
        <Text style={globalStyles.characterRace}>
          {character.race} • {character.gender}
        </Text>
        <Text style={globalStyles.characterKi}>Ki: {character.ki}</Text>
      </View>
    </TouchableOpacity>
  );
};
