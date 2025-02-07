const car = {
    name: "Toyota",
    model: "Corolla",
    carFullName : function() {
        return this.name + " " + this.model;
    }
};

console.log(car.carFullName()); // Toyota Corolla