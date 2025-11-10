import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CharacterCard } from "../../components/CharacterCard";
import { ErrorState } from "../../components/ErrorState";
import { LoadingState } from "../../components/LoadingState";
import { Character } from "../../src/domain/models/Character.model";
import { useCharacters } from "../../src/presentation/hooks/useCharacters";
import { globalStyles, Colors } from "../../src/presentation/styles/globalStyles";

/**
 * Pantalla principal de personajes
 */
export default function CharactersScreen() {
  const [searchTerm, setSearchTerm] = useState("");

  const { characters, loading, error, loadMore, refresh, hasMore } = 
    useCharacters(searchTerm);

  if (loading && characters.length === 0 && searchTerm.length === 0) {
    return <LoadingState message="Cargando personajes..." />;
  }

  if (error && characters.length === 0) {
    return <ErrorState message={error} />;
  }

  const SearchInput = ({ value, onChangeText }: { value: string, onChangeText: (text: string) => void }) => (
    <View style={globalStyles.searchContainer}>
      <MaterialCommunityIcons 
        name="magnify" 
        size={24} 
        color={Colors.mutedText} 
        style={globalStyles.searchIcon} 
      />
      <TextInput
        style={globalStyles.searchInput}
        placeholder="Buscar personaje o raza..."
        placeholderTextColor={Colors.mutedText}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard character={item} />
  );

  const renderFooter = () => {
    if (!loading || searchTerm.length > 0 || !hasMore) return null; 
    
    return (
      <View style={globalStyles.footerLoader}>
        <Text style={{ color: Colors.mutedText }}>Cargando más personajes...</Text>
      </View>
    );
  };
  
  if (!loading && characters.length === 0 && searchTerm.length > 0) {
      return (
        <View style={globalStyles.container}>
            <SearchInput value={searchTerm} onChangeText={setSearchTerm} />
            <ErrorState message={`No se encontraron resultados para "${searchTerm}"`} />
        </View>
      );
  }

  return (
    <View style={globalStyles.container}>
      <SearchInput value={searchTerm} onChangeText={setSearchTerm} />

      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacter}
        
        onEndReached={searchTerm.length === 0 ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        
        refreshControl={
          <RefreshControl 
            refreshing={loading && searchTerm.length === 0}
            onRefresh={refresh} 
            tintColor={Colors.primary} 
          />
        }
        contentContainerStyle={globalStyles.listContent}
      />
    </View>
  );
}