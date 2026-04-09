// script.js - Clean version with only the 2013 Ford F-150

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

Powerful and dependable full-size pickup with strong towing capability and premium comfort.

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

**Features**  
• Leather seats  
• ABS brakes  
• Airbags  

**History**  
• Clean title  
• No accidents reported  

**Finance**  
• Down payment: $1,499  
• Monthly payment: $406  

Strong, spacious and reliable pickup truck.`,
    img: "/IMG_1551.webp",   // Main image - first from your upload
    images: [
      "/IMG_1551.webp","/IMG_1552.webp","/IMG_1553.webp","/IMG_1555.webp","/IMG_1556.webp",
      "/IMG_1557.webp","/IMG_1558.webp","/IMG_1559.webp","/IMG_1560.webp","/IMG_1561.webp",
      "/IMG_1562.webp","/IMG_1563.webp","/IMG_1564.webp","/IMG_1565.webp","/IMG_1566.webp",
      "/IMG_1567.webp","/IMG_1568.webp","/IMG_1569.webp","/IMG_1570.webp","/IMG_1571.webp",
      "/IMG_1572.webp","/IMG_1573.webp"
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const carGrid = document.getElementById('carGrid');
  const modal = document.getElementById('carModal');
  const modalImg = document.getElementById('modalImg');
  const thumbnails = document.getElementById('thumbnails');
  const modalTitle = document.getElementById('modalTitle');
  const modalFullDesc = document.getElementById('modalFullDesc');
  const modalEmail = document.getElementById('modalEmail');
  const closeBtn = document.querySelector('.close');

  closeBtn.addEventListener('click', () => modal.style.display = 'none');

  function renderCars() {
    carGrid.innerHTML = '';

    cars.forEach((car, index) => {
      const card = document.createElement('div');
      card.className = 'car-card';
      card.innerHTML = `
        <img src="${car.img}" alt="${car.year} ${car.make} ${car.model}" onerror="this.src='https://via.placeholder.com/320x200?text=Car+Image';">
        <div class="car-info">
          <h3>${car.year} ${car.make} ${car.model}</h3>
          <p class="price">${car.priceDisplay}</p>
          <div class="car-details">
            <span>${car.mileage.toLocaleString()} miles</span>
            <span>${car.transmission}</span>
          </div>
          <button class="btn btn-primary view-details" data-index="${index}">View Details</button>
        </div>
      `;
      carGrid.appendChild(card);
    });

    document.querySelectorAll('.view-details').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const car = cars[index];

        modalTitle.textContent = `${car.year} ${car.make} ${car.model}`;
        modalImg.src = car.img;
        modalFullDesc.innerHTML = car.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');

        modalEmail.href = `mailto:mixam1autos@outlook.com?subject=Enquiry about ${car.year} ${car.make} ${car.model}`;

        thumbnails.innerHTML = '';
        car.images.forEach(src => {
          const img = document.createElement('img');
          img.src = src;
          img.onerror = () => img.src = 'https://via.placeholder.com/80x60?text=Photo';
          img.onclick = () => modalImg.src = src;
          thumbnails.appendChild(img);
        });

        modal.style.display = 'flex';
      });
    });
  }

  renderCars();
});
