// script.js - Clean USA version with only the 2013 Ford F-150

const cars = [
  {
    make: "Ford",
    model: "F-150",
    year: 2013,
    price: 16700,
    priceDisplay: "$16,700",
    mileage: 122835,
    mileageUnit: "miles",
    color: "Blue",
    fuel: "Gasoline",
    transmission: "Automatic",
    engine: "3.5L V6",
    hp: 365,
    mpg: 18,
    body: "Pickup Truck",
    doors: 4,
    seats: 5,
    desc: `**2013 Ford F-150 Lariat SuperCrew 4WD – $16,700**

Powerful and dependable full-size pickup with strong towing capability and premium comfort ✔️ Perfect for work, travel or daily driving.

**Key Details**  
• Price: $16,700  
• Mileage: 122,835 miles  
• Exterior colour: Blue  
• Interior colour: Gray  
• Fuel type: Gasoline  
• Transmission: 6-Speed Automatic  
• Drivetrain: Four-Wheel Drive  
• Engine: 3.5L V6  
• Horsepower: 365 hp  
• EPA Estimated: 15 City / 21 Highway MPG (18 Combined)  

**Vehicle Overview**  
• Make: Ford  
• Model: F-150  
• Year: 2013  
• Trim: Lariat SuperCrew  
• Body type: Pickup Truck  
• Doors: 4  
• Cabin size: Crew Cab  

**Features / Options**  
• Leather seats  
• ABS brakes  
• Curtain airbags  
• Front side airbags  
• Driver airbag  
• Passenger airbag  

**Measurements**  
• Front legroom: 41 in  
• Back legroom: 43 in  
• Cargo bed length: 67 in  

**History**  
• Clean title ✔️  
• 0 accidents reported ✔️  
• 4 previous owners ✔️  

**Warranty**  
• 3 months warranty included ✔️  

**Finance Option Available**  
• Down payment: $1,499  
• Monthly payment: $406  

Strong, spacious and reliable pickup truck.`,
    img: "/IMG_1551.webp",
    images: [
      "/IMG_1551.webp","/IMG_1552.webp","/IMG_1553.webp","/IMG_1555.webp","/IMG_1556.webp",
      "/IMG_1557.webp","/IMG_1558.webp","/IMG_1559.webp","/IMG_1560.webp","/IMG_1561.webp",
      "/IMG_1562.webp","/IMG_1563.webp","/IMG_1564.webp","/IMG_1565.webp","/IMG_1566.webp",
      "/IMG_1567.webp","/IMG_1568.webp","/IMG_1569.webp","/IMG_1570.webp","/IMG_1571.webp",
      "/IMG_1572.webp","/IMG_1573.webp"
    ]
  }
];

// Render function
document.addEventListener('DOMContentLoaded', () => {
  const carGrid = document.getElementById('carGrid');
  const sortSelect = document.getElementById('sortSelect');
  const modal = document.getElementById('carModal');
  const modalImg = document.getElementById('modalImg');
  const thumbnails = document.getElementById('thumbnails');
  const modalTitle = document.getElementById('modalTitle');
  const modalFullDesc = document.getElementById('modalFullDesc');
  const modalEmail = document.getElementById('modalEmail');
  const closeBtn = document.querySelector('.close');

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  function renderCars(carList) {
    carGrid.innerHTML = '';

    carList.forEach((car, index) => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <img src="${car.img}" alt="${car.year} ${car.make} ${car.model}">
        <div class="car-info">
          <h3>${car.year} ${car.make} ${car.model}</h3>
          <p class="price">${car.priceDisplay}</p>
          <div class="car-details">
            <span>${car.mileage.toLocaleString()} ${car.mileageUnit}</span>
            <span>${car.transmission} • ${car.fuel}</span>
            <span>${car.color}</span>
          </div>
          <p class="car-desc">${car.desc.substring(0, 140)}...</p>
          <div class="btn-group">
            <button class="btn btn-primary view-details" data-index="${index}">View Details</button>
            <a href="mailto:mixam1autos@outlook.com?subject=Enquiry about ${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model)}" 
               class="btn btn-secondary" target="_blank">Contact</a>
          </div>
        </div>
      `;
      carGrid.appendChild(card);
    });

    // Attach click listeners for View Details
    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const car = carList[index];

        modalTitle.textContent = `${car.year} ${car.make} ${car.model}`;
        modalImg.src = car.img;
        modalFullDesc.innerHTML = car.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

        modalEmail.href = `mailto:mixam1autos@outlook.com?subject=Enquiry about ${encodeURIComponent(car.year + ' ' + car.make + ' ' + car.model)}`;

        thumbnails.innerHTML = '';
        car.images.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.onclick = () => modalImg.src = src;
          thumbnails.appendChild(img);
        });

        modal.style.display = 'flex';
      });
    });
  }

  function sortCars() {
    let sorted = [...cars];
    const value = sortSelect.value;
    if (value === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (value === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (value === 'year-desc') sorted.sort((a, b) => b.year - a.year);
    renderCars(sorted);
  }

  // Initial render
  renderCars(cars);
  sortSelect.addEventListener('change', sortCars);
});
