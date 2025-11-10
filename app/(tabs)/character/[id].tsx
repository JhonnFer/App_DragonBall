// app/character/[id].tsx

import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { Transformation } from "../../../src/domain/models/Transformation.model";
import { useCharacterDetail } from "../../../src/presentation/hooks/useCharacterDetail";
import { globalStyles } from "../../../src/presentation/styles/globalStyles";

/**
 * Pantalla de detalle de personaje
 */
export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // 1. Convertir el ID a número (NaN si es inválido o nulo)
  const characterId = id ? parseInt(id, 10) : NaN;

  // 2. 🟢 LLAMADA INCONDICIONAL AL HOOK
  // El Hook siempre se llama, pero internamente no hace la petición si characterId es NaN.
  const { character, transformations, loading, error } =
    useCharacterDetail(characterId);

  // 3. Early Returns (después del Hook)
  
  // Manejo de ID inválido o no proporcionado (antes de que el hook retorne resultados)
  if (isNaN(characterId) || !id) {
    return <ErrorState message="ID de personaje inválido o no proporcionado" />;
  }

  // Manejo de estados de carga
  if (loading) {
    return <LoadingState message={`Buscando a Dragon Ball Character #${characterId}...`} />;
  }
  
  // Manejo de errores de la API o personaje no encontrado (null)
  if (error || !character) {
    return <ErrorState message={error || "Personaje no encontrado."} />;
  }

  // Renderizar tarjeta de transformación
  const renderTransformation = ({ item }: { item: Transformation }) => (
    <View style={globalStyles.transformationCard}>
      <Image
        source={{ uri: item.image }}
        style={globalStyles.transformationImage}
        contentFit="contain"
      />
      <View style={globalStyles.transformationInfo}>
        <Text style={globalStyles.transformationName}>{item.name}</Text>
        <Text style={globalStyles.transformationKi}>Ki: {item.ki}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={globalStyles.detailContainer}>
      {/* Header con imagen y nombre */}
      <View style={globalStyles.detailHeader}>
        <Image
          source={{ uri: character.image }}
          style={globalStyles.detailImage}
          contentFit="contain"
          transition={300}
        />
        <Text style={globalStyles.detailName}>{character.name}</Text>
        <Text style={globalStyles.detailRace}>{character.race}</Text>
      </View>

      {/* Contenido principal */}
      <View style={globalStyles.detailContent}>
        {/* Información básica */}
        <Text style={globalStyles.sectionTitle}>Información</Text>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.infoLabel}>Género:</Text>
          <Text style={globalStyles.infoValue}>{character.gender}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.infoLabel}>Ki Base:</Text>
          <Text style={globalStyles.infoValue}>{character.ki}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.infoLabel}>Ki Máximo:</Text>
          <Text style={globalStyles.infoValue}>{character.maxKi}</Text>
        </View>

        <View style={globalStyles.infoRow}>
          <Text style={globalStyles.infoLabel}>Afiliación:</Text>
          <Text style={globalStyles.infoValue}>{character.affiliation}</Text>
        </View>

        {/* Descripción */}
        <Text style={globalStyles.sectionTitle}>Descripción</Text>
        <Text style={globalStyles.description}>{character.description}</Text>

        {/* Transformaciones */}
        {transformations.length > 0 && (
          <>
            <Text style={globalStyles.sectionTitle}>
              Transformaciones ({transformations.length})
            </Text>
            <FlatList
              data={transformations}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderTransformation}
              scrollEnabled={false}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}