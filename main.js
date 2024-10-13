let carData = [];

async function fetchCarData() {
    try {
        const response = await fetch('cars.json');
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }
        carData = await response.json();
        displayCars(carData);
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}
function displayCars(cars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = ''; 
    cars.forEach(car => {
        const carItem = document.createElement('div');
        carItem.className = 'car-item';
        const carImageURL = `images/car${car.id}.jpg`;

        const carImage = document.createElement('img');
        carImage.src = carImageURL;
        carImage.alt = `${car.make} ${car.model}`;

        const carTitle = document.createElement('h3');
        carTitle.textContent = `${car.make} ${car.model}`;

        const carYear = document.createElement('p');
        carYear.textContent = `Year: ${car.year}`;

        const carPrice = document.createElement('p');
        carPrice.className = 'price';
        carPrice.textContent = `$${car.price}`;

        const carColor = document.createElement('p');
        carColor.textContent = `Color: ${car.color}`;

        const buyNowButton = document.createElement('button');
        buyNowButton.textContent = 'Buy Now';
        buyNowButton.className = 'buy-now-button';
        buyNowButton.addEventListener('click', () => showPaymentOptions(car));

        carItem.appendChild(carImage);
        carItem.appendChild(carTitle);
        carItem.appendChild(carYear);
        carItem.appendChild(carPrice);
        carItem.appendChild(carColor);
        carItem.appendChild(buyNowButton);

        carList.appendChild(carItem);
    });
}

function showPaymentOptions(car) {
    const modal = document.getElementById('payment-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.innerHTML = `
        <h3>Select Payment Method</h3>
        <p>Price: $${car.price}</p>
        <div>
            <input type="radio" name="payment-method" value="UPI" id="upi" checked>
            <label for="upi">UPI</label><br>
            <input type="radio" name="payment-method" value="Cash" id="cash">
            <label for="cash">Cash</label><br>
            <input type="radio" name="payment-method" value="Credit Card" id="creditcard">
            <label for="creditcard">Credit Card</label><br>
        </div>
        <button onclick="confirmPurchase('${car.make}', '${car.model}')">Confirm Payment</button>
        <button onclick="closeModal()">Cancel</button>
    `;

    modal.style.display = 'block';
}

function confirmPurchase(make, model) {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const thankYouMessage = `Thank you for buying the ${make} ${model}! Have a great ride!`;

    document.getElementById('car-list').innerHTML = `<p class="thank-you-message">${thankYouMessage}</p>`;
    closeModal();
}

// Function to close the modal
function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Fetch the car data when the page loads
fetchCarData();

function applyFilters() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const year = document.getElementById('year').value;
    const color = document.getElementById('color').value;
    const make = document.getElementById('make').value;
    const filteredCars = carData.filter(car => {
        return car.price >= minPrice &&
               car.price <= maxPrice &&
               (year === '' || car.year == year) &&
               (color === '' || car.color.toLowerCase() === color.toLowerCase()) &&
               (make === '' || car.make === make);
    });
displayCars(filteredCars);
}

document.getElementById('apply-filters').addEventListener('click', applyFilters);
fetchCarData();

let partsData = [
    { id: 1, name: 'Engine', price: 500, cost: 450, image: 'part1.jpg' },
    { id: 2, name: 'Transmission', price: 700, cost: 600, image: 'part2.jpg' },
    { id: 3, name: 'Brakes', price: 150, cost: 120, image: 'part3.jpg' },
    { id: 4, name: 'Suspension', price: 300, cost: 250, image: 'part4.jpg' },
    { id: 5, name: 'Steering Wheel', price: 100, cost: 80, image: 'part5.jpg' }
];
function displayParts() {
    const partsList = document.getElementById('parts-list');
    partsList.innerHTML = '';
    partsData.forEach(part => {
        const partItem = document.createElement('div');
        partItem.className = 'part-item';

        const partImageURL = `images/${part.image}`;

        const partImage = document.createElement('img');
        partImage.src = partImageURL;
        partImage.alt = part.name;

        const partName = document.createElement('h3');
        partName.textContent = part.name;

        const partPrice = document.createElement('p');
        partPrice.textContent = `Price: $${part.price}`;

        const partCost = document.createElement('p');
        partCost.textContent = `Cost: $${part.cost}`;

        const buyNowButton = document.createElement('button');
        buyNowButton.textContent = 'Buy Now';
        buyNowButton.className = 'buy-now-button';
        buyNowButton.addEventListener('click', () => showPaymentOptionsForPart(part));

        partItem.appendChild(partImage);
        partItem.appendChild(partName);
        partItem.appendChild(partPrice);
        partItem.appendChild(partCost);
        partItem.appendChild(buyNowButton);  
      
        partsList.appendChild(partItem);
    });
}

function showPaymentOptionsForPart(part) {
    const modal = document.getElementById('payment-modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <h3>Select Payment Method </h3>
        <p>Price: $${part.price}</p>
        <div>
            <input type="radio" name="payment-method" value="UPI" id="upi" checked>
            <label for="upi">UPI</label><br>
            <input type="radio" name="payment-method" value="Cash" id="cash">
            <label for="cash">Cash</label><br>
            <input type="radio" name="payment-method" value="Credit Card" id="creditcard">
            <label for="creditcard">Credit Card</label><br>
        </div>
        <button onclick="confirmPartPurchase('${part.name}')">Confirm Payment</button>
        <button onclick="closeModal()">Cancel</button>
    `;

    modal.style.display = 'block';
}

function confirmPartPurchase(partName) {
    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const thankYouMessage = `Thank you for purchasing the ${partName}!`;

    document.getElementById('parts-list').innerHTML = `<p class="thank-you-message">${thankYouMessage}</p>`;
    closeModal();
}

function navigate(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function setActiveLink(linkId) {
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(linkId).classList.add('active');
}

function navigate(sectionId) {
    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
        console.error(`No section found with ID: ${sectionId}`);
        return;
    }

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    targetSection.classList.add('active');
}

document.getElementById('home-link').addEventListener('click', () => {
    navigate('home-section');
    setActiveLink('home-link');
});

document.getElementById('cars-link').addEventListener('click', () => {
    navigate('cars-section');
    setActiveLink('cars-link');
});

document.getElementById('parts-link').addEventListener('click', () => {
    navigate('parts-section');
    setActiveLink('parts-link');
    displayParts(); 
});

document.getElementById('contact-link').addEventListener('click', () => {
    navigate('contact-section');
    setActiveLink('contact-link');
});