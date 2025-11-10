import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { CharacterCard } from "../../components/CharacterCard";
import { ErrorState } from "../../components/ErrorState";
import { LoadingState } from "../../components/LoadingState";
import { Character } from "../../src/domain/models/Character.model";
import { useCharacters } from "../../src/presentation/hooks/useCharacters";
import { globalStyles } from "../../src/presentation/styles/globalStyles";

/**
 * Pantalla principal de personajes
 */
export default function CharactersScreen() {
  const { characters, loading, error, loadMore, refresh } = useCharacters();

  // Estado de carga inicial
  if (loading && characters.length === 0) {
    return <LoadingState message="Cargando personajes..." />;
  }

  // Estado de error
  if (error && characters.length === 0) {
    return <ErrorState message={error} />;
  }

  // Renderizar cada personaje
  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard character={item} />
  );

  // Footer de la lista
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={globalStyles.footerLoader}>
        <Text>Cargando más personajes...</Text>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        contentContainerStyle={globalStyles.listContent}
      />
    </View>
  );
}
