import { apiClient } from "./api.config";
import {
  Character,
  CharactersResponse,
} from "../../domain/models/Character.model";

/**
 * Servicio de Personajes
 * Maneja todas las peticiones relacionadas con personajes
 */
export class CharacterService {
  /**
   * ENDPOINT 1: Obtener lista de personajes con paginación
   * GET /characters?page={page}&limit={limit}
   */
  static async getCharacters(
    page: number = 1,
    limit: number = 10
  ): Promise<CharactersResponse> {
    try {
      const response = await apiClient.get<CharactersResponse>("/characters", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener personajes:", error);
      throw error;
    }
  }

  /**
   * ENDPOINT 2: Obtener un personaje por ID
   * GET /characters/{id}
   *
   * Retorna toda la información del personaje, incluyendo:
   * - Datos básicos (nombre, ki, raza, etc.)
   * - Transformaciones (array de transformaciones)
   * - Planeta de origen
   */
  static async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await apiClient.get<Character>(`/characters/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener personaje ${id}:`, error);
      throw error;
    }
  }
}
