let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let eventsData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});

const fetchEvents = async () => {
    try {
        const response = await fetch('/events', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        eventsData = events; // Store events globally
        renderCalendar(eventsData, currentMonth, currentYear);
    } catch (error) {
        console.error('Error fetching events:', error);
        document.getElementById('calendar').innerHTML = '<p class="text-red-500">Failed to load events. Please try again later.</p>';
    }
};

const renderCalendar = (events, month, year) => {
    const calendarEl = document.getElementById('calendar');
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Update the month display
    document.getElementById('current-month').textContent = `${monthNames[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7;

    calendarEl.innerHTML = ''; // Clear previous content

    // Calendar grid header
    const header = document.createElement('div');
    header.className = 'grid grid-cols-7 gap-2 mb-4';
    header.innerHTML = `
        <div class="font-bold text-center py-2">Sun</div>
        <div class="font-bold text-center py-2">Mon</div>
        <div class="font-bold text-center py-2">Tue</div>
        <div class="font-bold text-center py-2">Wed</div>
        <div class="font-bold text-center py-2">Thu</div>
        <div class="font-bold text-center py-2">Fri</div>
        <div class="font-bold text-center py-2">Sat</div>
    `;
    calendarEl.appendChild(header);

    // Create calendar days
    const days = document.createElement('div');
    days.className = 'grid grid-cols-7 gap-2';

    // Add blank cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'border p-2'; // Reduced padding
        days.appendChild(emptyCell);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'border p-2 text-center relative cursor-pointer'; // Adjusted padding and set relative positioning
        dayEl.innerHTML = `<div>${i}</div>`;

        // Add events to specific days
        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === i && eventDate.getMonth() === month && eventDate.getFullYear() === year;
        });
        if (dayEvents.length > 0) {
            dayEl.classList.add('bg-[#baab76]');
        }

        dayEl.addEventListener('click', () => updateEventDetails(i, dayEvents));

        days.appendChild(dayEl);
    }

    // Add blank cells to complete the last week
    for (let i = daysInMonth + firstDayOfWeek; i < totalDays; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'border p-2'; // Reduced padding
        days.appendChild(emptyCell);
    }

    // Append the days container to the calendar element
    calendarEl.appendChild(days);
}

const updateEventDetails = (day, events) => {
    const eventListEl = document.getElementById('event-list');
    eventListEl.innerHTML = ''; // Clear previous content

    if (events.length === 0) {
        eventListEl.innerHTML = '<p>No events for this day.</p>';
    } else {
        events.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.className = 'p-2 border-t bg-[#908660] rounded-lg';
            eventItem.innerHTML = `
                <h3 class="text-lg font-bold">${event.name}</h3>
                <p>${event.description}</p>
                <p class="text-sm text-black-600">${new Date(event.date).toLocaleString()}</p>
            `;
            eventListEl.appendChild(eventItem);
        });
    }
}

// Event listeners for the next and previous month buttons
document.getElementById('next-month').addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(eventsData, currentMonth, currentYear);
});

document.getElementById('prev-month').addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(eventsData, currentMonth, currentYear);
});
