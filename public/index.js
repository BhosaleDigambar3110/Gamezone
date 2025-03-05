document.addEventListener("DOMContentLoaded", function () {
    const dateField = document.getElementById('date-field');
    const calendarContainer = document.getElementById('calendar');
    const calendarDays = document.getElementById('calendar-days');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const calendarIcon = document.getElementById('calendar-icon');

    let currentDate = new Date();
    let selectedDate = null;

    function populateMonthYearSelectors() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthSelect.innerHTML = "";
        months.forEach((month, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        let currentYear = new Date().getFullYear();
        yearSelect.innerHTML = "";
        for (let i = currentYear - 10; i <= currentYear + 10; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    }

    function renderCalendar(date) {
        calendarDays.innerHTML = "";
        let month = date.getMonth();
        let year = date.getFullYear();

        monthSelect.value = month;
        yearSelect.value = year;

        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement('div');
            emptyDiv.style.visibility = "hidden";
            calendarDays.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.classList.add("calendar-day");

            if (selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year) {
                dayElement.classList.add('selected-date');
            }

            dayElement.addEventListener('click', function () {
                selectedDate = new Date(year, month, day);

                document.querySelector(".date-number").textContent = day;
                document.querySelector(".day-month:nth-child(1)").textContent = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
                document.querySelector(".day-month:nth-child(3)").textContent = selectedDate.toLocaleDateString('en-US', { month: 'long' });

                calendarContainer.style.display = 'none';
            });

            calendarDays.appendChild(dayElement);
        }
    }

    monthSelect.addEventListener('change', function () {
        currentDate.setMonth(parseInt(this.value));
        renderCalendar(currentDate);
    });

    yearSelect.addEventListener('change', function () {
        currentDate.setFullYear(parseInt(this.value));
        renderCalendar(currentDate);
    });

    function toggleCalendar(event) {
        calendarContainer.style.display = (calendarContainer.style.display === 'block') ? 'none' : 'block';
        event.stopPropagation();
    }

    dateField.addEventListener('click', toggleCalendar);
    if (calendarIcon) {
        calendarIcon.addEventListener('click', toggleCalendar);
    }

    document.addEventListener('click', function (event) {
        if (!calendarContainer.contains(event.target) && event.target !== dateField) {
            calendarContainer.style.display = 'none';
        }
    });

    calendarContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    populateMonthYearSelectors();
    renderCalendar(currentDate);
});
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const cardWidth = 320; // Card width (300px) + 10% visibility (20px)
let currentIndex = 0;

function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});