// script.js - Mixam's Autos
const cars = [
  {
    make: "Ford",
    model: "F-150",
    year: 2010,
    price: 7500,
    priceDisplay: "$7,500",
    mileage: 92707,
    mileageUnit: "miles",
    color: "Red",
    fuel: "Flex Fuel",
    transmission: "Automatic",
    engine: "5.4L V8",
    hp: 320,
    body: "Pickup Truck",
    drivetrain: "4WD",
    desc: `Strong and dependable 4WD pickup with powerful V8 engine ✔️ Great for work, towing, or daily driving with solid performance.

Key Details
• Price: $7,500
• Mileage: 92,707 miles
• Drivetrain: 4WD
• Engine: 320 hp 5.4L V8 Flex Fuel
• Transmission: Automatic
• Fuel type: Flex Fuel
• Exterior color: Red
• Interior color: Black

Vehicle Overview
• Make: Ford
• Model: F-150
• Year: 2010
• Trim: FX4
• Body type: Pickup Truck
• Cabin: Extended Cab
• Mileage: 92,707 mi
• Stock number: 1ftfx1ev9afb76530

Fuel Economy
• Combined MPG: 16 MPG
• City MPG: 14 MPG
• Highway MPG: 18 MPG

Features / Options
• Alloy wheels
• 4WD capability
• Strong V8 performance
• Spacious extended cab

History
• Clean title ✔️
• 0 accidents reported ✔️
• 4 previous owners

Finance Option Available
• Down payment: $750
• Estimated monthly payment: $174

Reliable truck with strong engine and proven durability.`,
    img: "IMG_1663.jpeg",
    images: [
      "IMG_1663.jpeg",
      "IMG_1664.jpeg",
      "IMG_1665.jpeg",
      "IMG_1666.jpeg",
      "IMG_1667.jpeg",
      "IMG_1668.jpeg",
      "IMG_1669.jpeg",
      "IMG_1670.jpeg",
      "IMG_1671.jpeg"
    ]
  }
];

// Render cars
function renderCars(carList) {
  const carGrid = document.getElementById('carGrid');
  carGrid.innerHTML = '';

  carList.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.year} ${car.make} ${car.model}" 
           onerror="this.src='https://via.placeholder.com/320x200?text=No+Image+Available';">
      <div class="car-info">
        <h3>${car.year} ${car.make} ${car.model}</h3>
        <p class="price">${car.priceDisplay}</p>
        <div class="car-details">
          <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
          <span>${car.transmission}</span>
          <span>${car.color}</span>
        </div>
        <p class="car-desc">${car.desc.substring(0, 140)}...</p>
        <div class="btn-group">
          <button class="btn btn-primary-small view-details" data-index="${index}">View Details</button>
        </div>
      </div>
    `;
    carGrid.appendChild(card);
  });

  // Add click listeners for View Details
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-index'));
      showCarModal(carList[idx]);
    });
  });
}

// Show modal with full details + working contact buttons
function showCarModal(car) {
  let modal = document.getElementById('carModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'carModal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
      background: rgba(0,0,0,0.85); display: flex; align-items: center; 
      justify-content: center; z-index: 1000; padding: 20px; overflow-y: auto;
    `;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background: white; max-width: 580px; width: 100%; border-radius: 16px; overflow: hidden; max-height: 92vh; display: flex; flex-direction: column;">
      <!-- Image gallery -->
      <div style="position: relative;">
        <img id="modalMainImage" src="${car.img}" style="width: 100%; height: 280px; object-fit: cover;">
        <button onclick="closeModal()" style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: white; border: none; width: 36px; height: 36px; border-radius: 50%; font-size: 20px;">×</button>
      </div>

      <!-- Thumbnails -->
      <div style="display: flex; gap: 8px; padding: 12px; overflow-x: auto; background: #f8f9fa;">
        ${car.images.map((img, i) => `
          <img src="${img}" onclick="switchModalImage(this.src)" 
               style="width: 80px; height: 60px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid ${i===0 ? '#2563EB' : 'transparent'};">
        `).join('')}
      </div>

      <div style="padding: 20px; flex: 1; overflow-y: auto;">
        <h2 style="margin-bottom: 8px;">${car.year} ${car.make} ${car.model}</h2>
        <p style="font-size: 28px; font-weight: 700; color: #2563EB; margin: 8px 0;">${car.priceDisplay}</p>
        
        <div style="display: flex; gap: 20px; margin: 16px 0; font-size: 15px; color: #555;">
          <div><strong>${car.mileage.toLocaleString()} miles</strong></div>
          <div><strong>${car.transmission}</strong></div>
          <div><strong>${car.drivetrain}</strong></div>
        </div>

        <div style="white-space: pre-line; line-height: 1.6; margin-bottom: 30px; color: #333;">
          ${car.desc.replace(/\n/g, '<br>')}
        </div>

        <!-- Contact Buttons -->
        <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
          <a href="https://wa.me/13512301881" target="_blank" 
             style="background: #25D366; color: white; padding: 16px; border-radius: 12px; text-align: center; font-weight: 600; text-decoration: none;">
            💬 WhatsApp +1 (351) 230-1881
          </a>
          
          <a href="sms:+18167549276" target="_blank" 
             style="background: #007AFF; color: white; padding: 16px; border-radius: 12px; text-align: center; font-weight: 600; text-decoration: none;">
            ✉️ Text +1 (816) 754-9276
          </a>
          
          <a href="mailto:mixam1autos@outlook.com?subject=Interest in 2010 Ford F-150 FX4" 
             style="background: #2563EB; color: white; padding: 16px; border-radius: 12px; text-align: center; font-weight: 600; text-decoration: none;">
            📧 Email mixam1autos@outlook.com
          </a>
        </div>
      </div>
    </div>
  `;
}

// Close modal
function closeModal() {
  const modal = document.getElementById('carModal');
  if (modal) modal.remove();
}

// Switch main image in modal
function switchModalImage(src) {
  const mainImg = document.getElementById('modalMainImage');
  if (mainImg) mainImg.src = src;
}

// Sort function
function sortCars() {
  const value = document.getElementById('sortSelect').value;
  let sorted = [...cars];

  if (value === 'price-asc') sorted.sort((a, b) => a.price - b.price);
  else if (value === 'price-desc') sorted.sort((a, b) => b.price - a.price);
  else if (value === 'year-desc') sorted.sort((a, b) => b.year - a.year);

  renderCars(sorted);
}

// Initial render (but inventory is hidden until Browse is clicked)
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', sortCars);
  
  // Render cars so they are ready when user clicks Browse Inventory
  renderCars(cars);
});
