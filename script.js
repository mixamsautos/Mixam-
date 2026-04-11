// script.js - Mixam's Autos
const cars = [
  {
    make: "Ford",
    model: "F-150 FX4 SuperCab 4WD",
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
• Trim: FX4 SuperCab 4WD
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
      "IMG_1663.jpeg", "IMG_1664.jpeg", "IMG_1665.jpeg", "IMG_1666.jpeg",
      "IMG_1667.jpeg", "IMG_1668.jpeg", "IMG_1669.jpeg", "IMG_1670.jpeg", "IMG_1671.jpeg"
    ]
  }
];

// Render cars to grid
function renderCars(carList) {
  const carGrid = document.getElementById('carGrid');
  if (!carGrid) return;
  carGrid.innerHTML = '';

  carList.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.year} ${car.model}" 
           onerror="this.src='https://via.placeholder.com/320x200?text=No+Image';">
      <div class="car-info">
        <h3>${car.year} ${car.model}</h3>
        <p class="price">${car.priceDisplay}</p>
        <div class="car-details">
          <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
          <span>${car.transmission}</span>
          <span>${car.color}</span>
        </div>
        <p class="car-desc">${car.desc.substring(0, 140)}...</p>
        <button class="btn btn-primary-small view-details" data-index="${index}">View Details</button>
      </div>
    `;
    carGrid.appendChild(card);
  });

  // View Details buttons
  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      showCarModal(carList[idx]);
    });
  });
}

// Modal with full details + contact buttons
function showCarModal(car) {
  let modal = document.getElementById('carModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'carModal';
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:2000;padding:15px;overflow-y:auto;`;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background:#fff;max-width:560px;width:100%;border-radius:16px;overflow:hidden;max-height:92vh;display:flex;flex-direction:column;">
      <div style="position:relative;">
        <img id="modalMainImg" src="${car.img}" style="width:100%;height:260px;object-fit:cover;">
        <button onclick="closeModal()" style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);color:#fff;border:none;width:40px;height:40px;border-radius:50%;font-size:24px;cursor:pointer;">×</button>
      </div>

      <div style="padding:20px;flex:1;overflow-y:auto;">
        <h2 style="margin:0 0 8px;">${car.year} ${car.model}</h2>
        <p style="font-size:28px;font-weight:700;color:#2563EB;margin:8px 0;">${car.priceDisplay}</p>
        
        <div style="display:flex;gap:16px;margin:16px 0;font-size:15px;color:#444;">
          <div><strong>${car.mileage.toLocaleString()} miles</strong></div>
          <div><strong>${car.transmission}</strong></div>
          <div><strong>${car.color}</strong></div>
        </div>

        <div style="white-space:pre-line;line-height:1.65;color:#333;margin-bottom:30px;">
          ${car.desc}
        </div>

        <!-- Contact Buttons -->
        <div style="display:flex;flex-direction:column;gap:12px;">
          <a href="https://wa.me/13512301881" target="_blank" 
             style="background:#25D366;color:white;padding:16px;border-radius:12px;text-align:center;font-weight:600;text-decoration:none;">
            💬 WhatsApp +1 (351) 230-1881
          </a>
          <a href="sms:+18167549276" target="_blank" 
             style="background:#007AFF;color:white;padding:16px;border-radius:12px;text-align:center;font-weight:600;text-decoration:none;">
            ✉️ Text +1 (816) 754-9276
          </a>
          <a href="mailto:mixam1autos@outlook.com?subject=Interest in 2010 Ford F-150 FX4 SuperCab 4WD" 
             style="background:#2563EB;color:white;padding:16px;border-radius:12px;text-align:center;font-weight:600;text-decoration:none;">
            📧 Email mixam1autos@outlook.com
          </a>
        </div>
      </div>
    </div>
  `;
}

function closeModal() {
  const modal = document.getElementById('carModal');
  if (modal) modal.remove();
}

// Switch image in modal (optional)
function switchModalImage(src) {
  const img = document.getElementById('modalMainImg');
  if (img) img.src = src;
}

// Sort function
function sortCars() {
  const value = document.getElementById('sortSelect').value;
  let sorted = [...cars];
  if (value === 'price-asc') sorted.sort((a,b) => a.price - b.price);
  else if (value === 'price-desc') sorted.sort((a,b) => b.price - a.price);
  else if (value === 'year-desc') sorted.sort((a,b) => b.year - a.year);
  renderCars(sorted);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', sortCars);
  renderCars(cars);   // Pre-render so it's ready when inventory shows
});
