let carsData = []; // Global storage for cars

document.addEventListener('DOMContentLoaded', () => {
    fetchCars();
});

async function fetchCars() {
    try {
        const response = await fetch('/api/cars');
        carsData = await response.json(); // Store fetched data
        displayCars(carsData);
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

function findCarById() {
    const searchId = parseInt(document.getElementById('searchId').value);
    const car = carsData.find(car => car.id === searchId);
    const resultDiv = document.getElementById('searchResult');
    
    if (car) {
        resultDiv.innerHTML = `
            <div class="car-details">
                <h3>Found Car:</h3>
                <p>Make: ${car.make}</p>
                <p>Model: ${car.model}</p>
                <p>KM: ${car.km}</p>
                <p>Color: ${car.color}</p>
                <p>Location: ${car.location}</p>
                <p>Value: R${car.value}</p>
            </div>`;
    } else {
        resultDiv.innerHTML = '<p>No car found with that ID</p>';
    }
}