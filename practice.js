const car = {
    name: "Toyota",
    model: "Corolla",
    carFullName : function() {
        return this.name + " " + this.model;
    },
    company : "Toyota",
    features : {
        engine : "1300cc",
        color : "white",
        fuel : "petrol"
    }
};

console.log(car); 

delete car.company;

console.log(car);
console.log(car.features);

