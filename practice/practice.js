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

// console.log(car); 

delete car.company;

// console.log(car);
// console.log(car.features);

const features = Object.values(car.features);
// console.log(features);

let text = "";
for (let [key, value] of Object.entries(car)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
        text += key + ": " + JSON.stringify(value) + "<br>";
    } else if (typeof value === 'function') {
        text += key + ": " + value.call(car) + "<br>";
    } else {
        text += key + ": " + value + "<br>";
    }
}
console.log(text);

function Car(company,name,model,colour,wheelDrive = "front") {
    this.company = company;
    this.name = name;
    this.model = model;
    this.colour = colour;
    this.wheelDrive = wheelDrive;
}

const car1 = new Car("Toyota","Corolla","2019","White");
console.log(car1);

Car.prototype.vin = "123456789";

function GetDate() {
    return new Date().getFullYear();
}