// --- Get ALL Elements for MAIN Calculator ---
const weightInput = document.getElementById('weight');
const weightUnit = document.getElementById('weightUnit');
const heightInput = document.getElementById('height');
const heightUnit = document.getElementById('heightUnit');
const heightCmGroup = document.getElementById('heightCmGroup');
const heightFtInGroup = document.getElementById('heightFtInGroup');
const heightFtInput = document.getElementById('heightFt');
const heightInInput = document.getElementById('heightIn');
const ageInput = document.getElementById('age');
const genderInputs = document.getElementsByName('gender');
const activityLevel = document.getElementById('activityLevel');
const calculateBtn = document.getElementById('calculateBtn');

// Result Divs
const resultDiv = document.getElementById('result');
const bmrResultDiv = document.getElementById('bmrResult');
const tdeeResultDiv = document.getElementById('tdeeResult');
const goalsResultDiv = document.getElementById('goalsResult');

// --- DYNAMIC UI: Toggle Height Inputs based on Unit Selection ---
heightUnit.addEventListener('change', () => {
    if (heightUnit.value === 'cm') {
        heightCmGroup.style.display = 'block';
        heightFtInGroup.style.display = 'none';
    } else {
        heightCmGroup.style.display = 'none';
        heightFtInGroup.style.display = 'flex';
    }
});

// --- EVENT LISTENER 1: For the Main Dashboard Calculation ---
calculateBtn.addEventListener('click', () => {
    // --- 1. GET AND CONVERT INPUTS to METRIC ---
    let weightInKg = parseFloat(weightInput.value);
    if (weightUnit.value === 'lbs') {
        weightInKg = weightInKg * 0.453592;
    }

    let heightInCm = 0;
    if (heightUnit.value === 'cm') {
        heightInCm = parseFloat(heightInput.value);
    } else {
        const feet = parseFloat(heightFtInput.value) || 0;
        const inches = parseFloat(heightInInput.value) || 0;
        heightInCm = (feet * 12 + inches) * 2.54;
    }
    
    const age = parseInt(ageInput.value);
    let gender = '';
    for (const input of genderInputs) {
        if (input.checked) {
            gender = input.value;
            break;
        }
    }
    
    // --- 2. VALIDATE ALL INPUTS ---
    if (isNaN(weightInKg) || isNaN(heightInCm) || isNaN(age) || !gender || weightInKg <= 0 || heightInCm <= 0 || age <= 0) {
        resultDiv.innerHTML = 'Please fill in all fields with valid numbers.';
        bmrResultDiv.innerHTML = '';
        tdeeResultDiv.innerHTML = '';
        goalsResultDiv.innerHTML = '';
        return;
    }

    // --- 3. PERFORM ALL CALCULATIONS ---
    // BMI Calculation
    const heightInMeters = heightInCm / 100;
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const bmiRounded = bmi.toFixed(2);

    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr = 0;
    if (gender === 'male') {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
    } else {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
    }
    const bmrRounded = Math.round(bmr);

    // TDEE Calculation
    const activityMultiplier = parseFloat(activityLevel.value);
    const tdee = bmr * activityMultiplier;
    const tdeeRounded = Math.round(tdee);

    // Goal-Based Calorie Calculation
    const caloriesForLoss = tdeeRounded - 500;
    const caloriesForGain = tdeeRounded + 300;

    // --- 4. DISPLAY RESULTS ---
    // Display BMI
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi <= 24.9) bmiCategory = 'Normal weight';
    else if (bmi <= 29.9) bmiCategory = 'Overweight';
    else bmiCategory = 'Obesity';
    resultDiv.innerHTML = `<h4>Body Mass Index (BMI)</h4><p>${bmiRounded}</p><p class="category">${bmiCategory}</p>`;
    
    // Display BMR
    bmrResultDiv.innerHTML = `<h4>Basal Metabolic Rate (BMR)</h4><p>${bmrRounded}</p><p class="category">Calories burned at rest</p>`;

    // Display TDEE
    tdeeResultDiv.innerHTML = `<h4>Total Daily Energy Expenditure (TDEE)</h4><p>${tdeeRounded}</p><p class="category">Total calories burned daily</p>`;

    // Display Goals and Suggestions
    let goalsHTML = '<h4>Daily Calorie Goals</h4>';
    if (bmi >= 25) { // Suggest weight loss
        goalsHTML += `<p class="goal-suggestion"><strong>Suggestion:</strong> Aim for weight loss.</p>`;
    } else if (bmi < 18.5) { // Suggest weight gain
        goalsHTML += `<p class="goal-suggestion"><strong>Suggestion:</strong> Aim for weight gain.</p>`;
    } else { // Suggest maintenance
        goalsHTML += `<p class="goal-suggestion"><strong>Suggestion:</strong> Aim for weight maintenance.</p>`;
    }
    goalsHTML += `<ul>
                    <li><strong>Weight Loss:</strong> ${caloriesForLoss} kcal/day</li>
                    <li><strong>Maintain Weight:</strong> ${tdeeRounded} kcal/day</li>
                    <li><strong>Weight Gain:</strong> ${caloriesForGain} kcal/day</li>
                  </ul>`;
    goalsResultDiv.innerHTML = goalsHTML;
});


// --- The Optional BFP Calculator's code remains the same ---
// (Paste the code for the BFP Event Listener here)
