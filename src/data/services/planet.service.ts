import { apiClient } from "./api.config";
import { Planet, PlanetsResponse } from "../../domain/models/Planet.model";

/**
 * Servicio de Planetas
 */
export class PlanetService {
  /**
   * Obtener lista de planetas con paginación
   */
  static async getPlanets(
    page: number = 1,
    limit: number = 10
  ): Promise<PlanetsResponse> {
    try {
      const response = await apiClient.get<PlanetsResponse>("/planets", {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener planetas:", error);
      throw error;
    }
  }
}
