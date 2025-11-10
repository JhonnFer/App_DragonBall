// src/presentation/hooks/useCharacters.ts

import { useEffect, useState, useMemo } from "react"; // 🛑 Importamos useMemo
import { CharacterService } from "../../data/services/character.service";
import { Character } from "../../domain/models/Character.model";
import normalizeString from "../../../utils/normalizacion";
/**
 * Hook personalizado para manejar la lista de personajes y filtros
 *
 * @param searchTerm - El término de búsqueda ingresado por el usuario.
 * @param initialPage - Página inicial a cargar (por defecto 1).
 */
export const useCharacters = (searchTerm: string = "", initialPage: number = 1) => { // 🛑 Acepta searchTerm
  // Mantiene todos los personajes cargados de la API (para filtrar sobre ellos)
  const [allLoadedCharacters, setAllLoadedCharacters] = useState<Character[]>([]); 
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);

  /**
   * Función para cargar personajes
   */
  const fetchCharacters = async (pageNumber: number) => {
    // Si ya estamos cargando o no hay más páginas (y no es refresh), salimos.
    if (loading && pageNumber > 1) return;
    
    // 🛑 Buena Práctica: Limpiar error y establecer carga 🛑
    setLoading(true);
    setError(null);

    try {
      const limit = 10; // Límite de ítems por página (usado en tu implementación original)
      const response = await CharacterService.getCharacters(pageNumber, limit);

      if (pageNumber === 1) {
        // Si es la primera página o un refresh, reemplazamos la lista completa
        setAllLoadedCharacters(response.items); 
      } else {
        // Agregar más personajes (paginación)
        // 🛑 BUENA PRÁCTICA: Usar un Set o filter para evitar duplicados si la API no garantiza unicidad
        const newCharacters = response.items.filter(
            (newItem) => !allLoadedCharacters.some((existingItem) => existingItem.id === newItem.id)
        );
        setAllLoadedCharacters((prev) => [...prev, ...newCharacters]);
      }

      // Verificar si hay más páginas
      setHasMore(response.meta.currentPage < response.meta.totalPages);
      setPage(pageNumber); // Actualizamos la página si la llamada fue exitosa
      
    } catch (err) {
      // 🛑 Buena Práctica: Gestión de errores con mensaje claro 🛑
      console.error('Error al obtener personajes:', err); 
      setError("Error al cargar personajes. Intenta nuevamente.");
      setHasMore(false); // Detenemos la paginación si hay un error
      
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cargar más personajes (siguiente página)
   */
  const loadMore = () => {
    // Si la búsqueda está activa, deshabilitamos la paginación para mantener el filtro sobre los datos cargados.
    if (searchTerm.trim().length > 0) return; 

    if (!loading && hasMore) {
      const nextPage = page + 1;
      // No llamamos a fetchCharacters(nextPage) aquí para evitar doble llamada,
      // la lógica de incremento está controlada por el estado 'page'.
      fetchCharacters(nextPage);
    }
  };

  /**
   * Recargar personajes (pull to refresh)
   */
  const refresh = () => {
    // Reseteamos el estado de paginación para recargar la página 1
    setAllLoadedCharacters([]);
    setPage(1);
    setHasMore(true);
    fetchCharacters(1);
  };
  
  // Cargar personajes al montar el componente.
  useEffect(() => {
    // Aseguramos que la primera carga se haga al iniciar o si la página se reseteó a 1
    fetchCharacters(page);
    
    // Si la página se reseteó a 1 por 'refresh', useEffect se activa y llama a fetchCharacters(1).
  }, [page]); // 🛑 Dependencia: El efecto se dispara cuando la página cambia (solo en loadMore) 🛑

  
  // 🛑 LÓGICA DE FILTRADO con useMemo 🛑
  // Esta función solo se recalcula si allLoadedCharacters o searchTerm cambian.
const filteredCharacters = useMemo(() => {
    if (!searchTerm || searchTerm.trim() === "") {
      return allLoadedCharacters;
    }

    const normalizedTerm = normalizeString(searchTerm);

    return allLoadedCharacters.filter(character => {
      // Normalización en la propiedad de datos
      const normalizedName = normalizeString(character.name);
      const normalizedRace = normalizeString(character.race);

      // Aplicación de filtro robusto
      return (
        // 1. Nombre comienza con el término normalizado (búsqueda estricta)
        normalizedName.startsWith(normalizedTerm) || 
        // 2. Raza contiene el término normalizado (búsqueda flexible)
        normalizedRace.includes(normalizedTerm)
      );
    });
}, [searchTerm, allLoadedCharacters]);
  return {
    characters: filteredCharacters, // 🛑 Devolvemos los personajes filtrados 🛑
    loading,
    error,
    loadMore,
    refresh,
    hasMore,
  };
};