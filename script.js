// script.js - Full working version with your MINI Cooper added

const cars = [
  // You can add your previous example cars back here if you want them
  // {
  //   make: "Toyota",
  //   model: "Camry",
  //   year: 2022,
  //   price: 24500,
  //   mileage: 18000,
  //   desc: "One owner, excellent condition, full service history.",
  //   img: "images/toyota-camry-2022.jpg"
  // },
  // ... more old cars ...

  {
    make: "MINI",
    model: "Cooper",
    year: 2010,
    price: 3989,              // number for sorting/filtering
    priceDisplay: "£3,989",   // formatted string for display
    mileage: 83386,
    mileageUnit: "miles",
    color: "Silver",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "1.6L",
    hp: 122,
    mpg: 42,
    body: "Hatchback",
    doors: 3,
    seats: 4,
    desc: `Clean and reliable automatic hatchback with a smooth drive and great fuel economy. Perfect for city use or as a first car, with a stylish MINI design and comfortable interior.

Key Details
• Price: £3,989
• Mileage: 83,386 miles
• Exterior colour: Silver
• Fuel type: Petrol
• Gearbox: Automatic
• Drivetrain: Front-wheel drive
• Engine: 1.6L Petrol
• Horsepower: 122 hp
• MPG: 42 MPG (combined)
• ULEZ compliant: Yes

Vehicle Overview
• Make: MINI
• Model: Cooper
• Year: 2010
• Variant: 1.6 Cooper (122bhp) Hatchback Auto
• Body type: Hatchback
• Insurance group: 17
• Doors: 3
• Seats: 4

Fuel Economy
• Fuel tank size: 40 L
• City: 32 MPG
• Highway: 55 MPG

Features / Options
• Air conditioning
• Alloy wheels
• Bluetooth
• Smoker package

History
• Passed MOT
• Valid from 05 December 2025 to 07 December 2026
• No insurance write-offs
• No theft record
• Not imported or exported
• Not scrapped

Finance Option Available
• Deposit: £700
• Monthly payment: £180
• Term: 20 months

A solid, economical MINI with good performance and low running costs.

🚚 Delivery available
📩 Message to reserve or arrange viewing. 🚗`,
    img: "images/2010-mini-cooper-silver.jpg"  // ← make sure this file exists in your images/ folder
  }

  // Add more real cars here in the same format when ready
];

const carGrid = document.getElementById('carGrid');
const sortSelect = document.getElementById('sortSelect');

// Function to render cars
function renderCars(carList) {
  carGrid.innerHTML = ''; // Clear existing cards

  if (carList.length === 0) {
    carGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align:center; padding:3rem; color:#666;">No cars found.</p>';
    return;
  }

  carList.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.make} ${car.model} ${car.year} ${car.color || ''}">
      <div class="car-info">
        <h3>${car.make} ${car.model} ${car.year}</h3>
        <p class="price">${car.priceDisplay || '£' + car.price.toLocaleString()}</p>
        <div class="car-details">
          <span>${car.mileage.toLocaleString()} ${car.mileageUnit || 'miles'}</span>
          <span>${car.transmission || 'N/A'} • ${car.fuel || 'N/A'}</span>
          <span>${car.color || 'N/A'}</span>
        </div>
        <p class="car-desc">${car.desc.substring(0, 120)}...</p> <!-- short preview -->
        <div class="btn-group">
          <button class="btn btn-primary view-details" data-index="${index}">View Details</button>
          <a href="https://wa.me/1234567890?text=Interested%20in%20${encodeURIComponent(car.make + ' ' + car.model + ' ' + car.year + ' - ' + car.priceDisplay)}" 
             class="btn btn-secondary" target="_blank">Contact</a>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });
}

// Sort function
function sortCars() {
  const value = sortSelect.value;
  let sorted = [...cars];

  if (value === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (value === 'year-desc') {
    sorted.sort((a, b) => b.year - a.year);
  }

  renderCars(sorted);
}

// Initial render
renderCars(cars);

// Listen for sort change
sortSelect.addEventListener('change', sortCars);
