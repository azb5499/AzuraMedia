document.addEventListener('DOMContentLoaded', () => {
    fetchCars();
});

async function fetchCars() {
    try {
        const response = await fetch('/api/cars');  // Updated endpoint
        const cars = await response.json();
        displayCars(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
    }
}

function displayCars(cars) {
    const tableBody = document.querySelector('#vehiclesTable tbody');
    tableBody.innerHTML = cars.map(car => `
        <tr>
            <td>${car.id}</td>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${car.km}</td>
            <td>${car.color}</td>
            <td>${car.location}</td>
            <td>R${car.value}</td>
        </tr>
    `).join('');
}