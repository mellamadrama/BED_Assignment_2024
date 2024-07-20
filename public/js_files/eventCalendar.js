document.addEventListener('DOMContentLoaded', () => {
    fetchEvents();
});
  
const fetchEvents = async () => {
    try {
        const response = await fetch('/events');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const events = await response.json();
        renderCalendar(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        document.getElementById('calendar').innerHTML = '<p class="text-red-500">Failed to load events. Please try again later.</p>';
    }
};

const renderCalendar = (events) => {
    const calendarEl = document.getElementById('calendar');

    // Assume we're rendering for the current month
    const today = new Date();
    const month = today.getMonth(); // Current month (0-based)
    const year = today.getFullYear(); // Current year

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = Math.ceil((daysInMonth + firstDayOfWeek) / 7) * 7;

    calendarEl.innerHTML = ''; // Clear previous content

    // Calendar grid header
    const header = document.createElement('div');
    header.className = 'grid grid-cols-7 gap-1 mb-4';
    header.innerHTML = `
        <div class="flex gap-20">
            <div class="font-bold text-center py-2">Sun</div>
            <div class="font-bold text-center py-2">Mon</div>
            <div class="font-bold text-center py-2">Tue</div>
            <div class="font-bold text-center py-2">Wed</div>
            <div class="font-bold text-center py-2">Thu</div>
            <div class="font-bold text-center py-2">Fri</div>
            <div class="font-bold text-center py-2">Sat</div>
        </div>
    `;
    calendarEl.appendChild(header);

    // Create calendar days
    const days = document.createElement('div');
    days.className = 'grid grid-cols-7 gap-20';

    // Add blank cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'border p-10'; // Adjust padding for spacing
        days.appendChild(emptyCell);
    }

    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'border p-4 text-center relative'; // Adjust padding and set relative positioning
        dayEl.innerHTML = `
            <div>${i}</div>
        `;

        // Add events to specific days
        const dayEvents = events.filter(event => new Date(event.date).getDate() === i);
        if (dayEvents.length > 0) {
        dayEl.classList.add('bg-green-100');
        const eventsList = document.createElement('ul');
        eventsList.className = 'absolute top-0 left-0 w-full bg-white border border-gray-200 rounded shadow-lg p-2 text-sm'; // Styling for events list
        dayEvents.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.className = 'text-gray-700 truncate'; // Ensure text does not overflow
            eventItem.textContent = event.name; // Display event name
            eventsList.appendChild(eventItem);
        });
        dayEl.appendChild(eventsList);
        }

        days.appendChild(dayEl);
    }

    // Add blank cells to complete the last week
    for (let i = daysInMonth + firstDayOfWeek; i < totalDays; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'border p-4'; // Adjust padding for spacing
        days.appendChild(emptyCell);
    }

    // Append the days container to the calendar element
    calendarEl.appendChild(days);
}
