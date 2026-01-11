export const cropKeys = [
    "Coconut", "Jasmine", "Pitchi", "Thaddai", "Vegetable",
    "Banana", "Mango", "Guava", "Lemon", "Amla",
    "Paddy", "Papaya", "Athipazham", "Kerenthi"
  ];
  
  export function calculateCropTotals(data) {
    const totals = {};
  
    cropKeys.forEach(crop => totals[crop] = 0);
  
    data.forEach(row => {
      cropKeys.forEach(crop => {
        totals[crop] += Number(row[crop] || 0);
      });
    });
  
    return Object.entries(totals).map(([crop, value]) => ({
      crop,
      value
    }));
  }
  