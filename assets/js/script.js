// My Personal Tracker - Complete Integrated Application with ALL Features
const DRIVE_FOLDER_URL = "https://drive.google.com/drive/folders/1bhotIQBuNlXxfoJVXPY79oPd7X9GPucA?usp=sharing";

// Enhanced Fitness Facts Database
const FITNESS_FACTS = [
    "💪 Building muscle increases your resting metabolism, helping you burn more calories even at rest!",
    "🏃‍♂️ Regular exercise can improve your mood and reduce symptoms of anxiety and depression.",
    "🥦 Protein is essential for muscle repair. Aim for 1.6-2.2g per kg of body weight when building muscle.",
    "💧 Staying hydrated can improve exercise performance by up to 25%!",
    "🛌 Quality sleep is crucial for muscle recovery and growth. Aim for 7-9 hours per night.",
    "📈 Consistency beats intensity. Regular moderate exercise is better than occasional intense workouts.",
    "🍎 Eating protein-rich foods after workouts helps maximize muscle protein synthesis.",
    "🔥 HIIT workouts can burn calories for up to 24 hours after your workout (afterburn effect).",
    "🧘‍♂️ Stretching improves flexibility and can help prevent injuries during workouts.",
    "📊 Tracking your progress increases motivation and helps you stay accountable to your goals."
];

// Complete Workout and Food Suggestions Database
const WORKOUT_SUGGESTIONS = {
    "build muscle": [
        "💪 Strength Training: 3 sets of 8-12 reps for major muscle groups",
        "🏋️ Focus on compound exercises: Squats, Deadlifts, Bench Press",
        "📈 Progressive overload: Increase weight each week",
        "⏰ Adequate rest: 48 hours between working same muscle groups",
        "🍗 Ensure proper protein intake: 1.6-2.2g per kg of body weight",
        "🔥 Include both heavy and light days for optimal growth"
    ],
    "lose fat": [
        "⚡ HIIT Workouts: 20-30 minutes of high-intensity intervals",
        "🏃 Cardio: 30-45 minutes of moderate intensity",
        "🔄 Circuit training with minimal rest between exercises",
        "💪 Incorporate full-body movements for maximum calorie burn",
        "🏊 Include both cardio and strength training",
        "🔥 Focus on creating a consistent calorie deficit"
    ],
    "improve endurance": [
        "🏃‍♂️ Steady-state cardio: 45-60 minutes at moderate pace",
        "🎯 Interval running: 400m repeats with walking recovery",
        "🚴 Cycling or swimming for low-impact endurance",
        "📈 Gradually increase distance or time each week",
        "💪 Include strength training for muscular endurance",
        "🥤 Stay hydrated and fuel properly during long sessions"
    ],
    "general fitness": [
        "🔄 Full-body workouts 3-4 times per week",
        "💪 Mix of strength and cardio exercises",
        "🎯 Focus on functional movements",
        "📊 Track progress and gradually increase intensity",
        "🥗 Balanced nutrition with adequate protein",
        "💤 Ensure proper recovery and sleep"
    ]
};

const FOOD_SUGGESTIONS = {
    "highProtein": [
        "🍗 Grilled Chicken Breast: 30g protein per 100g",
        "🥛 Greek Yogurt: 20g protein per cup",
        "🥚 Eggs: 6g protein per egg",
        "🐟 Tuna: 25g protein per can",
        "🍶 Protein Shake: 25g protein per serving",
        "🥩 Lean Beef: 26g protein per 100g"
    ],
    "balancedMeals": [
        "🍗 Chicken with quinoa and steamed vegetables",
        "🐟 Salmon with sweet potato and broccoli",
        "🥩 Lean beef stir-fry with brown rice",
        "🧀 Tofu and vegetable curry with basmati rice",
        "🍤 Shrimp and avocado salad with whole grain bread",
        "🥗 Turkey and vegetable skewers with couscous"
    ],
    "healthySnacks": [
        "🍎 Apple slices with peanut butter",
        "🥛 Greek yogurt with berries",
        "🌰 Handful of almonds and walnuts",
        "🍫 Protein bar (check for low sugar)",
        "🥕 Vegetable sticks with hummus",
        "🍌 Banana with almond butter"
    ],
    "postWorkout": [
        "🍌 Banana with protein shake",
        "🥛 Chocolate milk",
        "🍗 Grilled chicken with sweet potato",
        "🥚 Scrambled eggs with whole grain toast",
        "🍶 Greek yogurt with honey and berries",
        "🐟 Tuna salad sandwich on whole grain"
    ]
};

// Application State
let currentUser = null;
let currentDay = 1;
let currentWeek = 1;
let currentEnergyLevel = 3;

// Cloud Storage Simulation (using localStorage as cloud simulation)
const CLOUD_STORAGE_KEY = 'fitnessTrackerUsers';

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    console.log('Current path:', path);
    
    if (path.includes('signup.html')) {
        console.log('Initializing signup page...');
        initializeSignupPage();
    } else if (path.includes('login.html') || path === '/' || path.endsWith('/')) {
        console.log('Initializing login page...');
        initializeLoginPage();
    } else {
        console.log('Initializing dashboard...');
        initializeDashboard();
    }
});

// Google Drive Functions
function openDriveFolder() {
    window.open(DRIVE_FOLDER_URL, '_blank');
}

// Cloud Storage Functions
function getCloudUsers() {
    try {
        const users = localStorage.getItem(CLOUD_STORAGE_KEY);
        return users ? JSON.parse(users) : {};
    } catch (error) {
        console.error('Error getting cloud users:', error);
        return {};
    }
}

function saveCloudUsers(users) {
    try {
        localStorage.setItem(CLOUD_STORAGE_KEY, JSON.stringify(users));
        console.log('Users saved to cloud:', Object.keys(users));
    } catch (error) {
        console.error('Error saving cloud users:', error);
    }
}

function saveUserToCloud(userData) {
    const users = getCloudUsers();
    users[userData.username] = userData;
    saveCloudUsers(users);
}

function getUserFromCloud(username) {
    const users = getCloudUsers();
    return users[username];
}

function updateUserInCloud(userData) {
    saveUserToCloud(userData);
}

// Signup Page Functions
function initializeSignupPage() {
    console.log('Setting up signup form...');
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        console.log('Signup form event listener added');
    } else {
        console.error('Signup form not found!');
    }
}

function handleSignup(event) {
    console.log('Signup form submitted');
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const goal = document.getElementById('goal').value;

    console.log('Form values:', { username, email, password, confirmPassword, weight, height, goal });

    // Validation
    if (!username || !email || !password || !confirmPassword || !weight || !height || !goal) {
        showAlert('Please fill in all fields!', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match!', 'error');
        return;
    }

    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long!', 'error');
        return;
    }

    if (weight <= 0 || height <= 0) {
        showAlert('Please enter valid weight and height values!', 'error');
        return;
    }

    // Check if user already exists
    const existingUser = getUserFromCloud(username);
    if (existingUser) {
        showAlert('Username already exists! Please choose a different one.', 'error');
        return;
    }

    // Create user data
    const userData = {
        username: username,
        email: email,
        password: password,
        weight: weight,
        height: height,
        goal: goal,
        startDate: new Date().toISOString(),
        initialWeight: weight,
        initialHeight: height,
        createdAt: new Date().toISOString()
    };

    // Initialize user progress
    const progressData = {
        workoutsCompleted: 0,
        mealsLogged: 0,
        activities: {},
        foodLog: {},
        measurements: [{
            date: new Date().toISOString(),
            weight: weight,
            bmi: calculateBMI(weight, height)
        }],
        achievements: [],
        goals: {},
        gallery: [],
        lastLogin: new Date().toISOString()
    };

    userData.progress = progressData;

    console.log('Creating user:', userData);

    // Save to cloud
    saveUserToCloud(userData);
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    showAlert('Account created successfully! Redirecting to dashboard...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Login Page Functions
function initializeLoginPage() {
    console.log('Initializing login page...');
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            // Verify user still exists in cloud
            const cloudUser = getUserFromCloud(user.username);
            if (cloudUser && cloudUser.password === user.password) {
                console.log('User already logged in, redirecting...');
                window.location.href = 'index.html';
                return;
            }
        } catch (error) {
            console.error('Error parsing saved user:', error);
        }
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        console.log('Login form event listener added');
    } else {
        console.error('Login form not found!');
    }
    
    startFactCarousel();
}

function startFactCarousel() {
    const facts = document.querySelectorAll('.fact');
    if (facts.length === 0) return;
    
    let currentFact = 0;
    setInterval(() => {
        facts[currentFact].classList.remove('active');
        currentFact = (currentFact + 1) % facts.length;
        facts[currentFact].classList.add('active');
    }, 5000);
}

function handleLogin(event) {
    event.preventDefault();
    console.log('Login form submitted');
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Login attempt for user:', username);

    if (!username || !password) {
        showAlert('Please enter both username and password!', 'error');
        return;
    }

    // Get user from cloud
    const user = getUserFromCloud(username);
    
    if (!user) {
        showAlert('User not found! Please check your username or sign up.', 'error');
        return;
    }

    if (user.password !== password) {
        showAlert('Incorrect password! Please try again.', 'error');
        return;
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    updateUserInCloud(user);
    
    // Set as current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    showAlert('Login successful! Redirecting to dashboard...', 'success');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function showAlert(message, type) {
    console.log('Showing alert:', message, type);
    
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.margin = '1rem 0';
    alertDiv.style.padding = '0.75rem 1rem';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        alertDiv.style.background = 'var(--success-color)';
        alertDiv.style.color = 'white';
    } else if (type === 'error') {
        alertDiv.style.background = 'var(--error-color)';
        alertDiv.style.color = 'white';
    } else {
        alertDiv.style.background = 'var(--warning-color)';
        alertDiv.style.color = 'white';
    }
    
    const form = document.querySelector('.login-form');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
    } else {
        // If no form found, append to body
        document.body.insertBefore(alertDiv, document.body.firstChild);
    }
}

// Dashboard Functions
function initializeDashboard() {
    console.log('Initializing dashboard...');
    
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
        console.log('No user found, redirecting to login...');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        currentUser = JSON.parse(savedUser);
        console.log('Current user:', currentUser.username);
    } catch (error) {
        console.error('Error parsing current user:', error);
        window.location.href = 'login.html';
        return;
    }
    
    // Verify user still exists in cloud
    const cloudUser = getUserFromCloud(currentUser.username);
    if (!cloudUser) {
        console.log('User not found in cloud, redirecting to login...');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
        return;
    }
    
    // Sync with cloud data
    currentUser = cloudUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    calculateCurrentDay();
    updateDashboard();
    initializeAllSections();
    showDailyFact();
    updateProgressTracker();
    
    console.log('Dashboard initialized successfully');
}

function calculateCurrentDay() {
    if (!currentUser || !currentUser.startDate) {
        currentDay = 1;
        currentWeek = 1;
        return;
    }
    
    const startDate = new Date(currentUser.startDate);
    const today = new Date();
    
    // Reset time part for accurate day calculation
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = today - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    currentDay = Math.max(1, Math.min(28, daysDiff + 1));
    currentWeek = Math.ceil(currentDay / 7);
    
    console.log('Day calculation:', {
        startDate: startDate.toDateString(),
        today: today.toDateString(),
        daysDiff,
        currentDay,
        currentWeek
    });
}

function updateDashboard() {
    if (!currentUser) return;
    
    console.log('Updating dashboard for user:', currentUser.username);
    
    // Update welcome message
    const welcomeElement = document.getElementById('userWelcome');
    if (welcomeElement) {
        welcomeElement.textContent = `Welcome, ${currentUser.username}!`;
    }
    
    // Update current day
    const dayElement = document.getElementById('currentDay');
    if (dayElement) {
        dayElement.textContent = `Day ${currentDay}`;
    }
    
    // Update progress bar
    const progressElement = document.getElementById('journeyProgress');
    if (progressElement) {
        const progressPercent = (currentDay / 28) * 100;
        progressElement.style.width = `${progressPercent}%`;
    }
    
    // Update stats
    const progress = currentUser.progress || {};
    
    // Update weight
    const weightElement = document.getElementById('currentWeight');
    if (weightElement) {
        weightElement.textContent = `${currentUser.weight}kg`;
    }
    
    // Update BMI in dashboard
    const bmiElement = document.getElementById('currentBMI');
    const bmiStatusElement = document.getElementById('bmiStatus');
    if (bmiElement && bmiStatusElement) {
        const bmi = calculateBMI(currentUser.weight, currentUser.height);
        bmiElement.textContent = bmi.toFixed(1);
        
        const category = getBMICategory(bmi);
        bmiStatusElement.textContent = category;
        bmiStatusElement.className = 'bmi-status ' + getBMIClassName(bmi);
    }
    
    // Update workouts
    const workoutsElement = document.getElementById('totalWorkouts');
    if (workoutsElement) {
        const workoutCount = Object.values(progress.activities || {}).length;
        workoutsElement.textContent = workoutCount;
    }
    
    // Update consistency
    const consistencyElement = document.getElementById('consistencyScore');
    if (consistencyElement) {
        const consistency = calculateConsistencyScore(progress);
        consistencyElement.textContent = `${consistency}%`;
    }
    
    // Update BMI fields with user data
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    if (heightInput && weightInput) {
        heightInput.value = currentUser.height;
        weightInput.value = currentUser.weight;
    }
}

function getBMIClassName(bmi) {
    if (bmi < 18.5) return 'bmi-underweight';
    if (bmi < 25) return 'bmi-normal';
    if (bmi < 30) return 'bmi-overweight';
    return 'bmi-obese';
}

function calculateConsistencyScore(progress) {
    const totalPossible = currentDay * 2;
    const workoutCount = Object.values(progress.activities || {}).length;
    let mealCount = 0;
    Object.values(progress.foodLog || {}).forEach(day => {
        Object.values(day).forEach(meals => {
            mealCount += meals.length;
        });
    });
    const actualCompleted = workoutCount + mealCount;
    return Math.min(Math.round((actualCompleted / totalPossible) * 100), 100);
}

function showDailyFact() {
    const factElement = document.getElementById('dailyFact');
    if (factElement) {
        const today = new Date().getDate();
        const factIndex = today % FITNESS_FACTS.length;
        factElement.textContent = FITNESS_FACTS[factIndex];
    }
}

function updateProgressTracker() {
    const progressPercent = (currentDay / 28) * 100;
    const progressElement = document.getElementById('journeyProgress');
    if (progressElement) {
        progressElement.style.width = `${progressPercent}%`;
    }
}

// Initialize All Sections
function initializeAllSections() {
    initializeEventListeners();
    initializeExerciseTypes();
    generateActivityGrid();
    loadGallery();
    loadAllData();
}

function initializeEventListeners() {
    console.log('Initializing event listeners...');
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Form submissions
    const foodForm = document.getElementById('foodForm');
    const activityForm = document.getElementById('activityForm');
    
    if (foodForm) {
        foodForm.addEventListener('submit', handleFoodSubmit);
        console.log('Food form event listener added');
    }
    if (activityForm) {
        activityForm.addEventListener('submit', handleActivitySubmit);
        console.log('Activity form event listener added');
    }
    
    // BMI photo upload
    const bmiPhoto = document.getElementById('bmi-photo');
    if (bmiPhoto) {
        bmiPhoto.addEventListener('change', handleBmiPhotoUpload);
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// BMI Calculator Functions
function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (!height || !weight) {
        alert('Please enter both height and weight.');
        return;
    }
    
    const bmi = weight / (height * height);
    const category = getBMICategory(bmi);
    
    // Show result
    const resultElement = document.getElementById('bmi-result');
    const valueElement = document.getElementById('bmi-value');
    const categoryElement = document.getElementById('bmi-category');
    
    if (resultElement && valueElement && categoryElement) {
        valueElement.textContent = bmi.toFixed(1);
        categoryElement.textContent = category;
        resultElement.style.display = 'block';
        updateBMIMeter(bmi);
    }
    
    // Update user data
    if (currentUser) {
        currentUser.weight = weight;
        if (!currentUser.progress.measurements) {
            currentUser.progress.measurements = [];
        }
        currentUser.progress.measurements.push({
            date: new Date().toISOString(),
            weight: weight,
            bmi: bmi
        });
        
        // Save to cloud
        updateUserInCloud(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update dashboard
        updateDashboard();
    }
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function updateBMIMeter(bmi) {
    const needle = document.getElementById('bmi-needle');
    if (!needle) return;
    
    let position = 0;
    if (bmi < 18.5) position = (bmi / 18.5) * 25;
    else if (bmi < 25) position = 25 + ((bmi - 18.5) / 6.5) * 25;
    else if (bmi < 30) position = 50 + ((bmi - 25) / 5) * 25;
    else position = 75 + (Math.min((bmi - 30) / 10, 1) * 25);
    
    needle.style.left = `${position}%`;
}

function calculateBMI(weight, height) {
    return weight / ((height / 100) ** 2);
}

function handleBmiPhotoUpload(event) {
    // This function is no longer needed for file upload
    // Redirect to Google Drive instead
    openDriveFolder();
}
        
        // Add to gallery
        addToGallery('bmi', e.target.result, 'BMI Measurement');
    };
    reader.readAsDataURL(file);
}

// Goals and FITT Management
function updateGoal() {
    const goal = document.getElementById('specific').value;
    const frequency = document.getElementById('achievable').value;
    const frequencyElement = document.getElementById('frequency');
    
    if (frequencyElement) {
        frequencyElement.value = `${frequency} days/week`;
    }
    
    updateExerciseTypes(goal);
}

function initializeExerciseTypes() {
    const typesContainer = document.getElementById('exercise-types');
    if (!typesContainer) return;
    
    const exerciseTypes = [
        'Strength Training', 'Cardio', 'Bodyweight Exercises', 'Yoga',
        'Running', 'Cycling', 'Swimming', 'Sports', 'HIIT'
    ];
    
    typesContainer.innerHTML = exerciseTypes.map(type => `
        <label>
            <input type="checkbox" value="${type}"> ${type}
        </label>
    `).join('');
}

function updateExerciseTypes(goal) {
    const checkboxes = document.querySelectorAll('#exercise-types input');
    
    checkboxes.forEach(checkbox => {
        const type = checkbox.value.toLowerCase();
        let shouldShow = true;
        
        switch(goal) {
            case 'build muscle':
                shouldShow = ['strength training', 'bodyweight exercises', 'hiit'].includes(type);
                break;
            case 'lose fat':
                shouldShow = ['cardio', 'hiit', 'running', 'cycling', 'swimming'].includes(type);
                break;
            case 'improve endurance':
                shouldShow = ['cardio', 'running', 'cycling', 'swimming', 'sports'].includes(type);
                break;
        }
        
        checkbox.parentElement.style.display = shouldShow ? 'block' : 'none';
        if (!shouldShow) checkbox.checked = false;
    });
}

function saveGoals() {
    const goals = {
        specific: document.getElementById('specific').value,
        measurable: document.getElementById('measurable').value,
        achievable: document.getElementById('achievable').value,
        relevant: document.getElementById('relevant').value,
        fitt: {
            frequency: document.getElementById('frequency').value,
            intensity: document.getElementById('intensity').value,
            time: document.getElementById('time').value,
            type: Array.from(document.querySelectorAll('#exercise-types input:checked')).map(cb => cb.value)
        },
        date: new Date().toISOString()
    };
    
    // Save to user progress
    currentUser.progress.goals = goals;
    
    // Save to cloud
    updateUserInCloud(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    alert('Goals and FITT plan saved successfully!');
}

// Activity Log Management
function generateActivityGrid() {
    const grid = document.getElementById('activity-grid');
    if (!grid) return;
    
    const timeSlots = [
        '5AM-6AM', '6AM-7AM', '7AM-8AM', '8AM-9AM', '9AM-10AM', '10AM-11AM', '11AM-12PM',
        '12PM-1PM', '1PM-2PM', '2PM-3PM', '3PM-4PM', '4PM-5PM', '5PM-6PM', '6PM-7PM',
        '7PM-8PM', '8PM-9PM', '9PM-10PM'
    ];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    let gridHTML = '<div class="time-slot"></div>';
    
    // Day headers
    days.forEach(day => {
        gridHTML += `<div class="day-header">${getDayDate(day, currentWeek)}</div>`;
    });
    
    // Time slots and cells
    timeSlots.forEach(timeSlot => {
        gridHTML += `<div class="time-slot">${timeSlot}</div>`;
        days.forEach(day => {
            const timeKey = `${getDayDate(day, currentWeek)}-${timeSlot}`;
            gridHTML += `
                <div class="activity-cell" onclick="openActivityModal('${timeKey}')" 
                     id="cell-${timeKey.replace(/[/]/g, '-')}">
                </div>
            `;
        });
    });
    
    grid.innerHTML = gridHTML;
    updateWeekDisplay();
    loadActivitiesForWeek();
}

function getDayDate(day, week) {
    const startDate = new Date(currentUser.startDate);
    const dayOffset = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day);
    const weekOffset = (week - 1) * 7;
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + weekOffset + dayOffset);
    
    return targetDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

function changeWeek(direction) {
    currentWeek += direction;
    if (currentWeek < 1) currentWeek = 1;
    if (currentWeek > 4) currentWeek = 4;
    
    generateActivityGrid();
}

function updateWeekDisplay() {
    const weekElement = document.getElementById('current-week');
    if (weekElement) {
        weekElement.textContent = `Week ${currentWeek}`;
    }
}

function openActivityModal(timeSlot) {
    document.getElementById('activityTimeSlot').value = timeSlot;
    document.getElementById('activityModal').style.display = 'block';
    resetEnergyStars();
}

function closeActivityModal() {
    document.getElementById('activityModal').style.display = 'none';
    document.getElementById('activityForm').reset();
}

function setEnergy(level) {
    currentEnergyLevel = level;
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < level);
    });
    document.getElementById('activityEnergy').value = level;
}

function resetEnergyStars() {
    currentEnergyLevel = 3;
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < 3);
    });
    document.getElementById('activityEnergy').value = 3;
}

function handleActivitySubmit(event) {
    event.preventDefault();
    
    const timeSlot = document.getElementById('activityTimeSlot').value;
    const activityData = {
        type: document.getElementById('activityType').value,
        details: document.getElementById('activityDetails').value,
        energy: document.getElementById('activityEnergy').value,
        timestamp: new Date().toISOString()
    };
    
    // Handle photo upload
    const photoFile = document.getElementById('activityPhoto').files[0];
    if (photoFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            activityData.photo = e.target.result;
            saveActivityData(timeSlot, activityData);
        };
        reader.readAsDataURL(photoFile);
    } else {
        saveActivityData(timeSlot, activityData);
    }
    
    closeActivityModal();
}

function saveActivityData(timeSlot, activityData) {
    if (!currentUser.progress.activities) {
        currentUser.progress.activities = {};
    }
    
    currentUser.progress.activities[timeSlot] = activityData;
    
    // Save to cloud
    updateUserInCloud(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateActivityCell(timeSlot, activityData);
    
    // Add to gallery if there's a photo
    if (activityData.photo) {
        addToGallery('workout', activityData.photo, `Workout: ${activityData.type}`);
    }
    
    // Update dashboard
    updateDashboard();
}

function updateActivityCell(timeSlot, activityData) {
    const cell = document.getElementById(`cell-${timeSlot.replace(/[/]/g, '-')}`);
    if (cell) {
        cell.innerHTML = `
            <div class="activity-entry activity-${activityData.type}">
                <strong>${activityData.type}</strong>
                ${activityData.details ? `<br>${activityData.details}` : ''}
                <br>Energy: ${'★'.repeat(activityData.energy)}
            </div>
        `;
    }
}

function loadActivitiesForWeek() {
    const progress = currentUser.progress || {};
    const activities = progress.activities || {};
    
    Object.keys(activities).forEach(timeSlot => {
        updateActivityCell(timeSlot, activities[timeSlot]);
    });
}

// Food Log Management
function openFoodModal(mealType) {
    document.getElementById('currentMeal').value = mealType;
    document.getElementById('foodModal').style.display = 'block';
}

function closeFoodModal() {
    document.getElementById('foodModal').style.display = 'none';
    document.getElementById('foodForm').reset();
}

function handleFoodSubmit(event) {
    event.preventDefault();
    
    const mealType = document.getElementById('currentMeal').value;
    const foodData = {
        name: document.getElementById('foodName').value,
        quantity: document.getElementById('foodQuantity').value,
        protein: parseFloat(document.getElementById('foodProtein').value),
        carbs: parseFloat(document.getElementById('foodCarbs').value),
        fat: parseFloat(document.getElementById('foodFat').value),
        calories: parseFloat(document.getElementById('foodCalories').value),
        timestamp: new Date().toISOString()
    };
    
    // Photo upload removed - just save the food data directly
    saveFoodData(mealType, foodData);
    closeFoodModal();
}

function saveFoodData(mealType, foodData) {
    const date = document.getElementById('food-date').value;
    
    if (!currentUser.progress.foodLog) {
        currentUser.progress.foodLog = {};
    }
    
    if (!currentUser.progress.foodLog[date]) {
        currentUser.progress.foodLog[date] = {};
    }
    if (!currentUser.progress.foodLog[date][mealType]) {
        currentUser.progress.foodLog[date][mealType] = [];
    }
    
    currentUser.progress.foodLog[date][mealType].push(foodData);
    
    // Save to cloud
    updateUserInCloud(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update display
    loadFoodLog();
    updateMacronutrientTracker(date);
    
    // Gallery addition for food photos removed
    
    // Update dashboard
    updateDashboard();
}

function loadFoodLog() {
    const date = document.getElementById('food-date').value;
    const progress = currentUser.progress || {};
    const foodLog = progress.foodLog || {};
    const dailyLog = foodLog[date] || {};
    
    // Clear all meal entries
    document.querySelectorAll('.meal-entries').forEach(container => {
        container.innerHTML = '';
    });
    
    // Populate meal entries
    Object.keys(dailyLog).forEach(mealType => {
        const container = document.querySelector(`[data-meal="${mealType}"] .meal-entries`);
        if (container) {
            dailyLog[mealType].forEach(food => {
                const entry = document.createElement('div');
                entry.className = 'meal-entry';
                entry.innerHTML = `
                    <strong>${food.name}</strong> (${food.quantity})<br>
                    Protein: ${food.protein}g | Carbs: ${food.carbs}g | Fat: ${food.fat}g<br>
                    Calories: ${food.calories}
                `;
                container.appendChild(entry);
            });
        }
    });
    
    updateMacronutrientTracker(date);
}

function updateMacronutrientTracker(date) {
    const progress = currentUser.progress || {};
    const foodLog = progress.foodLog || {};
    const dailyLog = foodLog[date] || {};
    
    let totalProtein = 0;
    let totalCalories = 0;
    
    Object.values(dailyLog).forEach(meal => {
        meal.forEach(food => {
            totalProtein += food.protein;
            totalCalories += food.calories;
        });
    });
    
    // Update display
    const proteinCurrent = document.getElementById('protein-current');
    const caloriesCurrent = document.getElementById('calories-current');
    const proteinBar = document.getElementById('protein-bar');
    const caloriesBar = document.getElementById('calories-bar');
    
    if (proteinCurrent) proteinCurrent.textContent = totalProtein;
    if (caloriesCurrent) caloriesCurrent.textContent = totalCalories;
    
    // Update progress bars
    const proteinTarget = 140;
    const caloriesTarget = 2000;
    
    if (proteinBar) proteinBar.style.width = `${Math.min((totalProtein / proteinTarget) * 100, 100)}%`;
    if (caloriesBar) caloriesBar.style.width = `${Math.min((totalCalories / caloriesTarget) * 100, 100)}%`;
}

// Gallery Management
function addToGallery(type, photoData, description) {
    if (!currentUser.progress.gallery) {
        currentUser.progress.gallery = [];
    }
    
    currentUser.progress.gallery.push({
        type: type,
        photo: photoData,
        description: description,
        date: new Date().toISOString(),
        week: currentWeek
    });
    
    // Save to cloud
    updateUserInCloud(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    loadGallery();
}

function loadGallery() {
    const progress = currentUser.progress || {};
    const gallery = progress.gallery || [];
    const grid = document.getElementById('gallery-grid');
    
    if (!grid) return;
    
    grid.innerHTML = gallery.map((item, index) => `
        <div class="gallery-item" data-type="${item.type}" data-week="${item.week}">
            <img src="${item.photo}" alt="${item.description}">
            <div class="gallery-info">
                <strong>${item.description}</strong>
                <p>Week ${item.week} • ${new Date(item.date).toLocaleDateString()}</p>
            </div>
        </div>
    `).join('');
}

function filterGallery() {
    const typeFilter = document.getElementById('gallery-filter').value;
    const weekFilter = document.getElementById('week-filter').value;
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        const itemType = item.getAttribute('data-type');
        const itemWeek = item.getAttribute('data-week');
        
        const typeMatch = typeFilter === 'all' || itemType === typeFilter;
        const weekMatch = weekFilter === 'all' || itemWeek === weekFilter;
        
        item.style.display = typeMatch && weekMatch ? 'block' : 'none';
    });
}

// AI FitCoach Chat - COMPLETE IMPLEMENTATION
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow) {
        chatWindow.classList.toggle('active');
    }
}

function askSuggestion(type) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    
    // Add user message
    let userMessage = '';
    switch(type) {
        case 'food':
            userMessage = 'Any suggestions for food today?';
            break;
        case 'workout':
            userMessage = 'What\'s a good workout for me today?';
            break;
        case 'protein':
            userMessage = 'How am I doing on protein today?';
            break;
        case 'progress':
            userMessage = 'How is my progress looking?';
            break;
    }
    
    addMessage(userMessage, 'user');
    
    // Generate AI response
    setTimeout(() => {
        const response = generateAIResponse(type);
        addMessage(response, 'bot');
    }, 1000);
}

function generateAIResponse(type) {
    const progress = currentUser.progress || {};
    const foodLog = progress.foodLog || {};
    const today = new Date().toISOString().split('T')[0];
    const todayLog = foodLog[today] || {};
    
    let totalProtein = 0;
    let totalCalories = 0;
    Object.values(todayLog).forEach(meal => {
        meal.forEach(food => {
            totalProtein += food.protein;
            totalCalories += food.calories;
        });
    });
    
    const workoutCount = Object.values(progress.activities || {}).length;
    const consistency = calculateConsistencyScore(progress);
    
    switch(type) {
        case 'food':
            if (totalProtein < 50) {
                const suggestions = FOOD_SUGGESTIONS.highProtein;
                return `Based on your intake today, you're low on protein (${totalProtein}g). You need ${140 - totalProtein}g more. I suggest:\n\n${suggestions.slice(0, 3).join('\n• ')}`;
            } else if (totalProtein < 100) {
                const suggestions = FOOD_SUGGESTIONS.balancedMeals;
                return `Good protein intake today (${totalProtein}g)! For your next meal, consider:\n\n${suggestions.slice(0, 2).join('\n• ')}`;
            } else {
                const suggestions = FOOD_SUGGESTIONS.healthySnacks;
                return `Excellent protein intake (${totalProtein}g)! You're meeting your needs. For healthy snacks:\n\n${suggestions.slice(0, 3).join('\n• ')}`;
            }
            
        case 'workout':
            const goals = progress.goals || {};
            const goal = goals.specific || currentUser.goal || 'general fitness';
            const workoutType = goal.includes('muscle') ? 'build muscle' : 
                              goal.includes('fat') ? 'lose fat' :
                              goal.includes('endurance') ? 'improve endurance' : 'general fitness';
            
            const suggestions = WORKOUT_SUGGESTIONS[workoutType] || WORKOUT_SUGGESTIONS['general fitness'];
            return `For your goal of ${goal}, here's a great workout plan:\n\n${suggestions.join('\n• ')}`;
            
        case 'protein':
            const targetProtein = 140;
            const percentage = Math.round((totalProtein / targetProtein) * 100);
            
            if (percentage < 50) {
                return `📊 Protein Check:\n• Current: ${totalProtein}g\n• Target: ${targetProtein}g\n• Progress: ${percentage}%\n\nYou need ${targetProtein - totalProtein}g more protein today. Focus on high-protein foods like chicken, fish, eggs, or a protein shake.`;
            } else if (percentage < 80) {
                return `📊 Protein Check:\n• Current: ${totalProtein}g\n• Target: ${targetProtein}g\n• Progress: ${percentage}%\n\nGood progress! You're on track. Consider a protein-rich snack to reach your goal.`;
            } else {
                return `📊 Protein Check:\n• Current: ${totalProtein}g\n• Target: ${targetProtein}g\n• Progress: ${percentage}%\n\nExcellent! You're meeting your protein needs for muscle recovery and growth.`;
            }
            
        case 'progress':
            let progressMessage = `📈 Progress Analysis (Day ${currentDay}/28):\n\n`;
            progressMessage += `• Workouts Completed: ${workoutCount}\n`;
            progressMessage += `• Consistency Score: ${consistency}%\n`;
            progressMessage += `• Meals Logged Today: ${Object.values(todayLog).reduce((acc, meal) => acc + meal.length, 0)}\n\n`;
            
            if (consistency >= 80) {
                progressMessage += "🎉 Outstanding progress! Your consistency is excellent. Keep up the great work!";
            } else if (consistency >= 60) {
                progressMessage += "👍 Good progress! You're building solid habits. Try to be a bit more consistent.";
            } else {
                progressMessage += "💪 You're getting started! Focus on building one consistent habit at a time.";
            }
            
            return progressMessage;
            
        default:
            return "I'm here to help with your fitness journey! Ask me about food, workouts, protein intake, or your progress.";
    }
}

function addMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Summary and Reporting Functions
function showSummaryModal() {
    generateSummaryContent();
    const modal = document.getElementById('summaryModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeSummaryModal() {
    const modal = document.getElementById('summaryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function generateSummaryContent() {
    const progress = currentUser.progress || {};
    const content = document.getElementById('summaryContent');
    
    if (!content) return;
    
    const workoutCount = Object.values(progress.activities || {}).length;
    let mealCount = 0;
    Object.values(progress.foodLog || {}).forEach(day => {
        Object.values(day).forEach(meals => {
            mealCount += meals.length;
        });
    });
    
    content.innerHTML = `
        <div class="summary-section">
            <h3>📊 Journey Overview</h3>
            <div class="summary-stats">
                <div class="summary-stat">
                    <h4>${currentDay}/28</h4>
                    <p>Days Completed</p>
                </div>
                <div class="summary-stat">
                    <h4>${workoutCount}</h4>
                    <p>Workouts</p>
                </div>
                <div class="summary-stat">
                    <h4>${mealCount}</h4>
                    <p>Meals Logged</p>
                </div>
                <div class="summary-stat">
                    <h4>${calculateConsistencyScore(progress)}%</h4>
                    <p>Consistency</p>
                </div>
            </div>
        </div>
        
        <div class="summary-section">
            <h3>🎯 Goal Progress</h3>
            <p><strong>Current Goal:</strong> ${currentUser.goal || 'Not set'}</p>
            <p><strong>Weight Measurements:</strong> ${progress.measurements ? progress.measurements.length : 0} records</p>
            <p><strong>Photos in Gallery:</strong> ${progress.gallery ? progress.gallery.length : 0} items</p>
        </div>
        
        <div class="summary-section">
            <h3>🏆 Achievements</h3>
            <p>${(progress.achievements && progress.achievements.length > 0) ? 
                `You've earned ${progress.achievements.length} achievements!` : 
                'Keep going! Your achievements will appear here soon! 🚀'}</p>
        </div>
        
        <div class="summary-section">
            <h3>📈 Progress Insights</h3>
            <p>You are ${currentDay} days into your 28-day journey.</p>
            <p>That's ${Math.round((currentDay / 28) * 100)}% of the way there!</p>
            <p>Only ${28 - currentDay} days left to reach your goals.</p>
        </div>
    `;
}

function downloadSummary() {
    const progress = currentUser.progress || {};
    const workoutCount = Object.values(progress.activities || {}).length;
    let mealCount = 0;
    Object.values(progress.foodLog || {}).forEach(day => {
        Object.values(day).forEach(meals => {
            mealCount += meals.length;
        });
    });
    
    const summary = `
MY PERSONAL TRACKER - 28 DAY JOURNEY SUMMARY
Created by Paul Andrei C. Timpog
PhilSCA-NAAP BAB-Palmayo Campus

USER INFORMATION:
- Username: ${currentUser.username}
- Current Day: ${currentDay} of 28
- Primary Goal: ${currentUser.goal}

PROGRESS STATISTICS:
- Workouts Completed: ${workoutCount}
- Meals Logged: ${mealCount}
- Consistency Score: ${calculateConsistencyScore(progress)}%
- Weight Measurements: ${progress.measurements ? progress.measurements.length : 0}
- Photos in Gallery: ${progress.gallery ? progress.gallery.length : 0}

GOAL PROGRESS:
You are ${currentDay} days into your 28-day journey.
That's ${Math.round((currentDay / 28) * 100)}% complete!
Only ${28 - currentDay} days remaining.

RECOMMENDATIONS:
1. ${workoutCount < currentDay ? 'Try to be more consistent with workouts' : 'Great job with workout consistency!'}
2. ${mealCount < currentDay ? 'Remember to log your meals daily' : 'Excellent meal tracking!'}
3. ${calculateConsistencyScore(progress) < 70 ? 'Focus on maintaining daily habits' : 'Outstanding consistency!'}

"The only bad workout is the one that didn't happen."

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Summary_${currentUser.username}_Day${currentDay}.txt`;
    a.click();
}

function generateFullReport() {
    const progress = currentUser.progress || {};
    const workoutCount = Object.values(progress.activities || {}).length;
    let mealCount = 0;
    Object.values(progress.foodLog || {}).forEach(day => {
        Object.values(day).forEach(meals => {
            mealCount += meals.length;
        });
    });
    
    const report = `
MY PERSONAL TRACKER - COMPREHENSIVE 28-DAY REPORT
Created by: Paul Andrei C. Timpog
PhilSCA-NAAP BAB-Palmayo Campus

PERSONAL INFORMATION:
- Username: ${currentUser.username}
- Height: ${currentUser.height} cm
- Initial Weight: ${currentUser.initialWeight} kg
- Current Weight: ${currentUser.weight} kg
- Primary Goal: ${currentUser.goal}
- Start Date: ${new Date(currentUser.startDate).toLocaleDateString()}

JOURNEY PROGRESS:
- Current Day: ${currentDay} of 28 (${Math.round((currentDay / 28) * 100)}% Complete)
- Workouts Completed: ${workoutCount}
- Meals Logged: ${mealCount}
- Consistency Score: ${calculateConsistencyScore(progress)}%
- Days Remaining: ${28 - currentDay}

DETAILED STATISTICS:
- Weight Measurements: ${progress.measurements ? progress.measurements.length : 0}
- Activity Entries: ${workoutCount}
- Food Entries: ${mealCount}
- Photo Evidence: ${progress.gallery ? progress.gallery.length : 0}

WEIGHT HISTORY:
${progress.measurements ? progress.measurements.map((m, i) => 
    `Day ${i + 1}: ${m.weight} kg (BMI: ${m.bmi ? m.bmi.toFixed(1) : 'N/A'})`
).join('\n') : 'No weight measurements recorded'}

GOAL ANALYSIS:
${getGoalAnalysis(progress)}

RECOMMENDATIONS FOR REMAINING ${28 - currentDay} DAYS:
1. ${getWorkoutRecommendation(workoutCount)}
2. ${getNutritionRecommendation(mealCount)}
3. ${getConsistencyRecommendation(calculateConsistencyScore(progress))}

FINAL WORDS OF ENCOURAGEMENT:
"Success is not final, failure is not fatal: it is the courage to continue that counts."
- Winston Churchill

You've already completed ${currentDay} days of your journey. 
That's ${currentDay} days of showing up for yourself!
Keep up the amazing work for the final ${28 - currentDay} days.

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FullReport_${currentUser.username}_Day${currentDay}.txt`;
    a.click();
}

function getGoalAnalysis(progress) {
    const consistency = calculateConsistencyScore(progress);
    
    if (consistency >= 80) {
        return "Outstanding consistency! You're on track to achieve your goals.";
    } else if (consistency >= 60) {
        return "Good progress! With a little more consistency, you'll reach your goals.";
    } else {
        return "Focus on building consistent habits. Small daily actions lead to big results.";
    }
}

function getWorkoutRecommendation(workoutCount) {
    const expectedWorkouts = Math.floor(currentDay / 2);
    if (workoutCount >= expectedWorkouts) {
        return "Maintain your excellent workout frequency";
    } else {
        return `Aim for ${expectedWorkouts - workoutCount} more workouts this week`;
    }
}

function getNutritionRecommendation(mealCount) {
    const expectedMeals = currentDay * 2;
    if (mealCount >= expectedMeals * 0.8) {
        return "Great job tracking nutrition! Continue being mindful of your food choices";
    } else {
        return "Try to be more consistent with meal logging to better understand your nutrition";
    }
}

function getConsistencyRecommendation(consistency) {
    if (consistency >= 80) {
        return "Your consistency is exemplary! Keep up the fantastic work";
    } else if (consistency >= 60) {
        return "Good consistency! Try to maintain your daily habits more regularly";
    } else {
        return "Focus on building one consistent habit at a time. Start small and build up";
    }
}

// Google Drive Integration
function saveToGoogleDrive() {
    const progress = currentUser.progress || {};
    
    const allData = {
        user: currentUser,
        progress: progress,
        exportDate: new Date().toISOString(),
        day: currentDay,
        system: 'My Personal Tracker by Paul Andrei C. Timpog'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MyPersonalTracker_${currentUser.username}_Day${currentDay}.json`;
    a.click();
    
    alert(`📁 Your data has been downloaded!\n\nTo save to Google Drive:\n1. Open your Google Drive: ${DRIVE_FOLDER_URL}\n2. Drag the downloaded file into the folder\n3. Your data is now safely stored in the cloud!`);
}

// Export all data
function exportAllData() {
    const progress = currentUser.progress || {};
    
    const allData = {
        user: currentUser,
        progress: progress,
        exportDate: new Date().toISOString(),
        system: 'My Personal Tracker by Paul Andrei C. Timpog'
    };
    
    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `MyPersonalTracker_Backup_${currentUser.username}.json`;
    link.click();
    
    alert('✅ All your data has been exported! You can import this file later to restore your progress.');
}

// Photo download function
function downloadPhoto(type, dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${type}_Evidence_${currentUser.username}_${new Date().toISOString().split('T')[0]}.jpg`;
    a.click();
    
    alert('Photo downloaded! You can now upload it to your Google Drive folder.');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Initialize data loading
function loadAllData() {
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}
