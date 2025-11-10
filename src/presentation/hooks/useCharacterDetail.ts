import { useEffect, useState } from "react";
import { CharacterService } from "../../data/services/character.service";
import { Character } from "../../domain/models/Character.model";
import { Transformation } from "../../domain/models/Transformation.model";

/**
 * Hook para manejar el detalle de un personaje y sus transformaciones
 *
 * Las transformaciones vienen incluidas en el objeto del personaje
 * desde el endpoint /characters/{id}
 */
export const useCharacterDetail = (characterId: number) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Obtener datos del personaje (incluye transformaciones)
        const characterData = await CharacterService.getCharacterById(
          characterId
        );
        setCharacter(characterData);

        // Las transformaciones ya vienen en el objeto del personaje
        setTransformations(characterData.transformations || []);
      } catch (err) {
        setError("Error al cargar detalles del personaje.");
        console.error("Error crítico:", err);
      } finally {
        setLoading(false);
      }
    };

    // Ejecutar la carga de datos solo si hay un characterId válido
    if (characterId) {
      fetchCharacterData();
    }
  }, [characterId]);

  return {
    character,
    transformations,
    loading,
    error,
  };
};
