const monthYearDisplay = document.getElementById("month-year");
const daysGrid = document.getElementById("days-grid");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const months = [
  { name: "July 2024", days: 31, startDay: 0 },  // July starts on a Monday
  { name: "August 2024", days: 31, startDay: 3 },  // August starts on a Thursday
  { name: "September 2024", days: 30, startDay: 6 }  // September starts on a Sunday
];

let currentMonthIndex = 0;
let currentDay = 1;

// Placeholder image and list data for each day
const dayDetails = {
  "July": {
    "1": { image: "https://via.placeholder.com/200", list: ["Task 1", "Task 2", "Task 3"] },
    "2": { image: "https://via.placeholder.com/200", list: ["Event A", "Event B", "Event C"] },
    // Add details for more days
  },
  "August": {
    "1": { image: "https://via.placeholder.com/200", list: ["Event X", "Event Y", "Event Z"] },
    // Add details for more days
  },
  "September": {
    "1": { image: "https://via.placeholder.com/200", list: ["Meeting 1", "Meeting 2", "Meeting 3"] },
    // Add details for more days
  }
};

// Function to render the calendar
function renderCalendar() {
  const currentMonth = months[currentMonthIndex];
  monthYearDisplay.textContent = currentMonth.name;
  daysGrid.innerHTML = "";

  for (let i = 0; i < currentMonth.startDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty");
    daysGrid.appendChild(emptyDiv);
  }

  for (let day = 1; day <= currentMonth.days; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("day");
    
    dayDiv.addEventListener('click', () => showFullDate(day));
    daysGrid.appendChild(dayDiv);
  }
}

// Show the full date, image, and bullet-point list in a modal
function showFullDate(day) {
  currentDay = day;  // Set the current day for navigation
  const currentMonth = months[currentMonthIndex];
  const fullDate = `${currentMonth.name.split(' ')[0]} ${day}, ${currentMonth.name.split(' ')[1]}`;
  const startDayOfWeek = new Date(`${currentMonth.name} 1`).getDay();
  const weekday = weekdays[(startDayOfWeek + day - 1) % 7];
  
  document.getElementById("full-date").textContent = fullDate;
  document.getElementById("weekday").textContent = weekday;

  const details = dayDetails[currentMonth.name.split(' ')[0]][day] || { image: "", list: [] };
  document.getElementById("popup-image").src = details.image;
  const popupList = document.getElementById("popup-list");
  popupList.innerHTML = "";
  details.list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    popupList.appendChild(li);
  });

  document.getElementById("date-modal").style.display = "block";
}

// Close modal when clicking on the "x" button
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("date-modal").style.display = "none";
});

// Arrow navigation inside the modal
document.querySelector(".modal-left-arrow").addEventListener("click", () => {
  currentDay = (currentDay === 1) ? months[currentMonthIndex].days : currentDay - 1;
  showFullDate(currentDay);
});

document.querySelector(".modal-right-arrow").addEventListener("click", () => {
  currentDay = (currentDay === months[currentMonthIndex].days) ? 1 : currentDay + 1;
  showFullDate(currentDay);
});

// Month navigation arrows
document.querySelector(".left-arrow").addEventListener("click", () => {
  currentMonthIndex = (currentMonthIndex === 0) ? months.length - 1 : currentMonthIndex - 1;
  renderCalendar();
});

document.querySelector(".right-arrow").addEventListener("click", () => {
  currentMonthIndex = (currentMonthIndex === months.length - 1) ? 0 : currentMonthIndex + 1;
  renderCalendar();
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  const modal = document.getElementById("date-modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Initial calendar render
renderCalendar();


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

