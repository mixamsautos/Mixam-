// script.js - Mixam's Autos (UK Pricing)
const cars = [
  {
    make: "Ford",
    model: "F-150 FX4 SuperCab 4WD",
    year: 2010,
    price: 7500,                    // number used for sorting
    priceDisplay: "£7,500",         // displayed with £ symbol
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
• Price: £7,500
• Mileage: 92,707 miles
• Drivetrain: 4WD
• Engine: 320 hp 5.4L V8 Flex Fuel
• Transmission: Automatic
• Fuel type: Flex Fuel
• Exterior colour: Red
• Interior colour: Black

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
• Deposit: £750
• Estimated monthly payment: £174

Reliable truck with strong engine and proven durability.`,
    img: "IMG_1663.jpeg",
    images: [
      "IMG_1663.jpeg", "IMG_1664.jpeg", "IMG_1665.jpeg", "IMG_1666.jpeg",
      "IMG_1667.jpeg", "IMG_1668.jpeg", "IMG_1669.jpeg", "IMG_1670.jpeg", "IMG_1671.jpeg"
    ]
  }
];

let currentCar = null;
let currentImageIndex = 0;

// Render inventory grid
function renderCars(carList) {
  const carGrid = document.getElementById('carGrid');
  if (!carGrid) return;
  carGrid.innerHTML = '';

  carList.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <img src="${car.img}" alt="${car.year} ${car.model}" onerror="this.src='https://via.placeholder.com/320x200?text=No+Image';">
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

  document.querySelectorAll('.view-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'));
      currentCar = carList[idx];
      currentImageIndex = 0;
      showCarModal();
    });
  });
}

// Clean modal with UK £ and swipeable gallery
function showCarModal() {
  if (!currentCar) return;

  let modal = document.getElementById('carModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'carModal';
    modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:2000;padding:10px;`;
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background:#fff;width:100%;max-width:620px;border-radius:16px;overflow:hidden;max-height:96vh;display:flex;flex-direction:column;">
      
      <!-- Main Image -->
      <div style="position:relative;height:280px;background:#000;">
        <img id="modalMainImg" src="${currentCar.images[currentImageIndex]}" style="width:100%;height:100%;object-fit:cover;">
        
        <!-- Counter -->
        <div id="imageCounter" style="position:absolute;top:16px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.75);color:white;padding:6px 16px;border-radius:20px;font-size:15px;font-weight:600;">
          ${currentImageIndex + 1} / ${currentCar.images.length}
        </div>
        
        <button onclick="prevImage()" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);color:white;border:none;width:44px;height:44px;border-radius:50%;font-size:28px;">‹</button>
        <button onclick="nextImage()" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);color:white;border:none;width:44px;height:44px;border-radius:50%;font-size:28px;">›</button>
      </div>

      <!-- Thumbnails -->
      <div style="display:flex;gap:8px;padding:12px;overflow-x:auto;background:#f8f9fa;border-bottom:1px solid #eee;">
        ${currentCar.images.map((src, i) => `
          <img src="${src}" onclick="goToImage(${i})" 
               style="width:78px;height:58px;object-fit:cover;border-radius:8px;cursor:pointer;border:3px solid ${i === currentImageIndex ? '#2563EB' : '#ddd'};">
        `).join('')}
      </div>

      <!-- Content -->
      <div style="padding:20px 20px 30px;flex:1;overflow-y:auto;">
        <h2 style="font-size:26px;line-height:1.2;margin:0 0 12px;">${currentCar.year} ${currentCar.model}</h2>
        <p style="font-size:32px;font-weight:700;color:#2563EB;margin:8px 0;">${currentCar.priceDisplay}</p>
        
        <div style="display:flex;gap:20px;margin:16px 0 24px;font-size:15.5px;color:#444;">
          <div><strong>${currentCar.mileage.toLocaleString()} miles</strong></div>
          <div><strong>${currentCar.transmission}</strong></div>
          <div><strong>${currentCar.color}</strong></div>
        </div>

        <p style="line-height:1.65;color:#333;margin-bottom:28px;">
          Strong and dependable 4WD pickup with powerful V8 engine ✔️ Great for work, towing, or daily driving with solid performance.
        </p>

        <div style="margin-bottom:24px;">
          <strong>Key Details</strong><br><br>
          • Price: ${currentCar.priceDisplay}<br>
          • Mileage: ${currentCar.mileage.toLocaleString()} miles<br>
          • Drivetrain: 4WD<br>
          • Engine: 320 hp 5.4L V8 Flex Fuel<br>
          • Transmission: Automatic
        </div>

        <!-- Contact Buttons -->
        <div style="display:flex;flex-direction:column;gap:14px;"
          <a href="sms:+18167549276" target="_blank" style="background:#007AFF;color:white;padding:16px;border-radius:12px;text-align:center;font-weight:600;text-decoration:none;">✉️ Text +1 (816) 754-9276</a>
          <a href="mailto:mixam1autos@outlook.com?subject=Interest in 2010 Ford F-150 FX4 SuperCab 4WD" style="background:#2563EB;color:white;padding:16px;border-radius:12px;text-align:center;font-weight:600;text-decoration:none;">📧 Email mixam1autos@outlook.com</a>
        </div>
      </div>

      <button onclick="closeModal()" style="margin:0 20px 20px;background:#eee;color:#333;border:none;padding:14px;border-radius:999px;font-size:16px;">Close</button>
    </div>
  `;

  addSwipeSupport();
}

function addSwipeSupport() {
  const container = document.getElementById('modalMainImg');
  if (!container) return;
  let startX = 0;
  container.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  container.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (diff > 60) nextImage();
    else if (diff < -60) prevImage();
  });
}

function prevImage() {
  if (!currentCar) return;
  currentImageIndex = (currentImageIndex - 1 + currentCar.images.length) % currentCar.images.length;
  updateModalImage();
}

function nextImage() {
  if (!currentCar) return;
  currentImageIndex = (currentImageIndex + 1) % currentCar.images.length;
  updateModalImage();
}

function goToImage(index) {
  currentImageIndex = index;
  updateModalImage();
}

function updateModalImage() {
  const img = document.getElementById('modalMainImg');
  const counter = document.getElementById('imageCounter');
  if (img) img.src = currentCar.images[currentImageIndex];
  if (counter) counter.textContent = `${currentImageIndex + 1} / ${currentCar.images.length}`;
}

function closeModal() {
  const modal = document.getElementById('carModal');
  if (modal) modal.remove();
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
  renderCars(cars);
});
