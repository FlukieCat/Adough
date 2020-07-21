const caloriesCal = (gender, age, height, weight, activeLevel) => {
    let calories = 0;
    if (gender === 'female')
        calories = 10 * weight + 6.25 * height - 5 * age - 161;
    if (gender === 'male') calories = 10 * weight + 6.25 * height - 5 * age + 5;
    if (activeLevel === 'Little to no exercise') calories = calories * 1.2;
    if (activeLevel === 'Light exercise') calories = calories * 1.375;
    if (activeLevel === 'Moderate exercise') calories = calories * 1.55;
    if (activeLevel === 'Heavy exercise') calories = calories * 1.725;
    if (activeLevel === 'Athlete') calories = calories * 1.9;
    return Math.round(calories);
};

module.exports = caloriesCal;
