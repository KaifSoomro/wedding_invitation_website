// Design storage service for saving/loading designs

const DESIGNS_KEY = "wedding_designs";

export const designStorage = {
  // Save a design
  saveDesign: (designName, shapes, backgroundImage) => {
    try {
      const designs = designStorage.getAllDesigns();
      const newDesign = {
        id: Date.now(),
        name: designName,
        shapes: shapes,
        backgroundImage: backgroundImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      designs.push(newDesign);
      localStorage.setItem(DESIGNS_KEY, JSON.stringify(designs));
      return newDesign;
    } catch (error) {
      console.error("Error saving design:", error);
      throw error;
    }
  },

  // Update an existing design
  updateDesign: (designId, shapes, backgroundImage) => {
    try {
      const designs = designStorage.getAllDesigns();
      const index = designs.findIndex((d) => d.id === designId);

      if (index !== -1) {
        designs[index].shapes = shapes;
        designs[index].backgroundImage = backgroundImage;
        designs[index].updatedAt = new Date().toISOString();
        localStorage.setItem(DESIGNS_KEY, JSON.stringify(designs));
        return designs[index];
      }
      return null;
    } catch (error) {
      console.error("Error updating design:", error);
      throw error;
    }
  },

  // Get all saved designs
  getAllDesigns: () => {
    try {
      const data = localStorage.getItem(DESIGNS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading designs:", error);
      return [];
    }
  },

  // Get a specific design by ID
  getDesign: (designId) => {
    try {
      const designs = designStorage.getAllDesigns();
      return designs.find((d) => d.id === designId) || null;
    } catch (error) {
      console.error("Error retrieving design:", error);
      return null;
    }
  },

  // Delete a design
  deleteDesign: (designId) => {
    try {
      const designs = designStorage.getAllDesigns();
      const filtered = designs.filter((d) => d.id !== designId);
      localStorage.setItem(DESIGNS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Error deleting design:", error);
      throw error;
    }
  },

  // Export designs as JSON
  exportDesigns: () => {
    try {
      const designs = designStorage.getAllDesigns();
      const dataStr = JSON.stringify(designs, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `wedding-designs-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting designs:", error);
      throw error;
    }
  },

  // Import designs from JSON
  importDesigns: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedDesigns = JSON.parse(e.target.result);
          if (Array.isArray(importedDesigns)) {
            const currentDesigns = designStorage.getAllDesigns();
            const merged = [...currentDesigns, ...importedDesigns];
            localStorage.setItem(DESIGNS_KEY, JSON.stringify(merged));
            resolve(importedDesigns.length);
          } else {
            reject(new Error("Invalid design file format"));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  },
};
