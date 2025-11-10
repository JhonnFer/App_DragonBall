import { Transformation } from "./Transformation.model"

/**
 * Modelo de Personaje
 * Define la estructura de datos de un personaje de Dragon Ball
 */
export interface Character {
  id: number;
  name: string;
  ki: string;                    // Nivel de poder
  maxKi: string;                 // Poder máximo
  race: string;                  // Raza (Saiyan, Namekian, etc.)
  gender: string;                // Género
  description: string;           // Descripción del personaje
  image: string;                 // URL de la imagen
  affiliation: string;           // Afiliación (Z Fighter, etc.)
  deletedAt: string | null;
  transformations: Transformation[]; // Array de transformaciones
}

/**
 * Respuesta paginada de personajes
 */
export interface CharactersResponse {
  items: Character[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}