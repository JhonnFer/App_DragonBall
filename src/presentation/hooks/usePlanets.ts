import { useEffect, useState } from "react";
import { PlanetService } from "../../data/services/planet.service";
import { Planet } from "../../domain/models/Planet.model";

export const usePlanets = (initialPage: number = 1) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPlanets = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await PlanetService.getPlanets(pageNumber, 10);

      if (pageNumber === 1) {
        setPlanets(response.items);
      } else {
        setPlanets((prev) => [...prev, ...response.items]);
      }

      setHasMore(response.meta.currentPage < response.meta.totalPages);
    } catch (err) {
      setError("Error al cargar planetas. Intenta nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPlanets(nextPage);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchPlanets(1);
  };

  useEffect(() => {
    fetchPlanets(page);
  }, []);

  return {
    planets,
    loading,
    error,
    loadMore,
    refresh,
    hasMore,
  };
};
