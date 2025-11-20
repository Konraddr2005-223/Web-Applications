// 1. Pobieramy elementy DOM
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');


let totalSeconds = 0;
let intervalId = null; 

function startTimer() {
    // Zapobiegamy wielokrotnemu uruchomieniu
    if (intervalId !== null) {
        return;
    }

   
    intervalId = setInterval(updateTime, 1000);
}


function stopTimer() {
    clearInterval(intervalId); // Zatrzymujemy interwał
    intervalId = null; // Resetujemy ID, by móc znowu uruchomić stoper
}

function resetTimer() {
    stopTimer(); // Zatrzymujemy stoper
    totalSeconds = 0; // Resetujemy czas
    updateDisplay(); // Aktualizujemy wyświetlacz
}


function updateTime() {
    totalSeconds++;
    updateDisplay();
}


function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
        timeDisplay.textContent = `${minutes}min ${seconds}s`;
    } else {
        timeDisplay.textContent = `${seconds}s`;
    }
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);


updateDisplay();


const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const numberChars = '0123456789'; // Zakładamy, że cyfry są zawsze

// 2. Pobieramy elementy DOM
const minLengthInput = document.getElementById('min-length');
const maxLengthInput = document.getElementById('max-length');
const includeUppercaseInput = document.getElementById('include-uppercase');
const includeSpecialInput = document.getElementById('include-special');
const generateBtn = document.getElementById('generate-btn');


function generatePassword() {
    
    const minLength = parseInt(minLengthInput.value);
    const maxLength = parseInt(maxLengthInput.value);
    const includeUppercase = includeUppercaseInput.checked;
    const includeSpecial = includeSpecialInput.checked;

   
    if (minLength > maxLength) {
        alert("Minimalna długość nie może być większa niż maksymalna!");
        return;
    }

   
    const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    // Budujemy pulę znaków do losowania
    let charPool = lowercaseChars + numberChars; 
    if (includeUppercase) {
        charPool += uppercaseChars; 
    }
    if (includeSpecial) {
        charPool += specialChars;
    }

    // Generujemy hasło
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    // Wyświetlamy hasło w alercie 
    alert("Twoje nowe hasło: " + password);
}

// 4. Dodajemy Event Listener do przycisku
generateBtn.addEventListener('click', generatePassword);



const filterInput = document.getElementById('filter-input');
const sortSelect = document.getElementById('sort-select');
const productsTbody = document.getElementById('products-tbody');


let originalProducts = [];


function renderTable(products) {
    
    productsTbody.innerHTML = "";

    
    products.forEach(product => {
       
        const row = document.createElement('tr'); 

        
        const cellImage = document.createElement('td'); 
        const img = document.createElement('img'); 
        img.src = product.thumbnail; 
        img.alt = product.title;
        img.style.width = '100px'; 
        cellImage.appendChild(img); 

        
        const cellTitle = document.createElement('td');
        cellTitle.textContent = product.title;

        
        const cellDescription = document.createElement('td');
        cellDescription.textContent = product.description;

        // Dodajemy komórki do wiersza
        row.appendChild(cellImage);
        row.appendChild(cellTitle);
        row.appendChild(cellDescription);

        // Dodajemy wiersz do tbody
        productsTbody.appendChild(row);
    });
}

// 3. Funkcja do pobierania danych
async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products'); 
        const data = await response.json();
        
        
        originalProducts = data.products.slice(0, 30);
        
        // Wyświetlamy dane w tabeli
        renderTable(originalProducts);
        
    } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        productsTbody.innerHTML = `<tr><td colspan="3">Błąd ładowania danych.</td></tr>`;
    }
}

// 4. Funkcja do filtrowania i sortowania
function handleFilterAndSort() {
    let filteredProducts = [...originalProducts]; 
    const filterValue = filterInput.value.toLowerCase();
    const sortValue = sortSelect.value;

    if (filterValue.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(filterValue) ||
            product.description.toLowerCase().includes(filterValue)
        );
    }

    if (sortValue === 'asc') { 
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'desc') { // [zgodnie z 48]
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
 

  
    renderTable(filteredProducts);
}


filterInput.addEventListener('input', handleFilterAndSort);
sortSelect.addEventListener('change', handleFilterAndSort);


fetchProducts();