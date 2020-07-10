const infoParser = (body) => {
    const diary = {
        name: '',
        fdcId: '',
        calories: '',
        carb: '',
        fat: '',
        protein: '',
        sugar: '',
        fiber: '',
        vitaminA: '',
        vitaminB6: '',
        vitaminB12: '',
        vitaminC: '',
        vitaminD: '',
        vitaminE: '',
        vitaminK: '',
        Calcium: '',
        Iron: '',
        Magnesium: '',
        Potassium: '',
        Sodium: '',
        Zinc: '',
        Copper: '',
        Selenium: '',
    };
    diary.name = body.description;
    diary.fdcId = body.fdcId.toString();
    diary.calories = body.foodNutrients
        .find((item) => item.nutrient.name === 'Energy')
        .amount.toString();
    diary.carb = body.foodNutrients
        .find((item) => item.nutrient.name === 'Carbohydrate, by difference')
        .amount.toString();
    diary.fat = body.foodNutrients
        .find((item) => item.nutrient.name === 'Total lipid (fat)')
        .amount.toString();
    diary.protein = body.foodNutrients
        .find((item) => item.nutrient.name === 'Protein')
        .amount.toString();
    const suger = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Sugars, total including NLEA'
    );
    if (suger) diary.sugar = suger.amount.toString();
    const fiber = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Fiber, total dietary'
    );
    if (fiber) diary.fiber = fiber.amount.toString();
    const vA = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin A, RAE'
    );
    if (vA) {
        diary.vitaminA = vA.amount.toString();
    }
    const b6 = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin B-6'
    );
    if (b6) {
        diary.vitaminB6 = b6.amount.toString();
    }
    const b12 = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin B-12'
    );
    if (b12) {
        diary.vitaminB12 = b12.amount.toString();
    }
    const vC = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin C, total ascorbic acid'
    );
    if (vC) {
        diary.vitaminC = vC.amount.toString();
    }
    const vD = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin D (D2 + D3)'
    );
    if (vD) diary.vitaminD = vD.amount.toString();
    const vE = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin E (alpha-tocopherol)'
    );
    if (vE) diary.vitaminE = vE.amount.toString();
    const vK = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Vitamin K (phylloquinone)'
    );
    if (vK) diary.vitaminK = vK.amount.toString();
    const ca = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Calcium, Ca'
    );
    if (ca) diary.Calcium = ca.amount.toString();
    const fe = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Iron, Fe'
    );
    if (fe) diary.Iron = fe.amount.toString();
    const mg = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Magnesium, Mg'
    );
    if (mg) diary.Magnesium = mg.amount.toString();
    const k = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Potassium, K'
    );
    if (k) diary.Potassium = k.amount.toString();
    const na = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Sodium, Na'
    );
    if (na) diary.Sodium = na.amount.toString();
    const zn = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Zinc, Zn'
    );
    if (zn) diary.Zinc = zn.amount.toString();
    const cu = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Copper, Cu'
    );
    if (cu) diary.Copper = cu.amount.toString();
    const se = body.foodNutrients.find(
        (item) => item.nutrient.name === 'Selenium, Se'
    );
    if (se) diary.Selenium = se.amount.toString();

    return diary;
};

module.exports = infoParser;
