class Vehicle {
    constructor(make, model, km, color, location, value) {
        this.id = null;
        this.make = make;
        this.model = model;
        this.km = parseInt(km) || 0;
        this.color = color;
        this.location = location;
        this.value = parseFloat(value) || 0;
    }

    validate() {
        if (!this.make || !this.model) {
            throw new Error('Make and model are required');
        }
        if (this.km < 0) {
            throw new Error('KM cannot be negative');
        }
        if (this.value < 0) {
            throw new Error('Value cannot be negative');
        }
        return true;
    }

    // toString() {
    //     return `Vehicle(${this.make} ${this.model}, ${this.km}km, R${this.value})`;
    // }
}

module.exports = Vehicle;