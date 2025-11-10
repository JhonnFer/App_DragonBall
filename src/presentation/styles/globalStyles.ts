import { StyleSheet } from "react-native";

/**
 * Paleta de colores de la aplicación
 */
export const Colors = {
  primary: "#FF6B00",       // Naranja Dragon Ball
  secondary: "#FFD700",     // Dorado
  background: "#1A1A2E",    // Fondo oscuro
  cardBackground: "#16213E",// Fondo de tarjetas
  text: "#FFFFFF",          // Texto principal
  textSecondary: "#B8B8B8", // Texto secundario
  success: "#4CAF50",       // Verde
  error: "#F44336",         // Rojo
  border: "#2E2E48",        // Bordes
};

/**
 * Estilos globales de la aplicación
 */
export const globalStyles = StyleSheet.create({
  // === CONTENEDORES ===
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  // = TARJETAS DE PERSONAJES =
  characterCard: {
    flexDirection: "row",
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: Colors.border,
  },

  characterInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  characterName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },

  characterRace: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 2,
  },

  characterKi: {
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // =TARJETAS DE PLANETAS =
  planetCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  planetImage: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.border,
  },

  planetInfo: {
    padding: 16,
  },

  planetName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },

  planetDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  planetStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.border,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
  },

  statusDestroyed: {
    backgroundColor: Colors.error,
  },

  statusActive: {
    backgroundColor: Colors.success,
  },

  // = DETALLE DE PERSONAJE =
  detailContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  detailHeader: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: Colors.cardBackground,
  },

  detailImage: {
    width: 200,
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: Colors.primary,
    backgroundColor: Colors.border,
  },

  detailName: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },

  detailRace: {
    fontSize: 18,
    color: Colors.secondary,
  },

  detailContent: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  infoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "500",
  },

  infoValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "bold",
  },

  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginTop: 8,
  },

  // === TRANSFORMACIONES ===
  transformationCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  transformationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.border,
  },

  transformationInfo: {
    flex: 1,
    marginLeft: 12,
  },

  transformationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },

  transformationKi: {
    fontSize: 14,
    color: Colors.secondary,
  },

  // = ESTADOS =
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },

  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: "center",
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  // = FOOTER DE CARGA =
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },

  listContent: {
    padding: 16,
  },

  // = TABS =
  tabBarStyle: {
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 60,
  },
});
