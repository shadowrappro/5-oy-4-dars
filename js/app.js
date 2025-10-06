import { toast } from "./toast.js";

const elCarContainer = document.getElementById("carsContainer")
const elCarsTemplate = document.getElementById("carsTemplate")
const elLoader = document.getElementById("skeletonContainer")
const elErrorDiv = document.getElementById("errorDiv")
let token;

function init() {
    elLoader.classList.remove("hidden")
    fetch("https://json-api.uz/api/project/fn44/cars")
    .then((res)=> res.json())
    .then((res)=> {
        getUI(res.data)
    })
    .catch((error) => {
        console.log(error.message);
        elErrorDiv.classList.remove("hidden")
    })
    .finally(() => {
        elLoader.classList.add("hidden")
    })
}

init()


function getUI(obj) {
    elCarContainer.innerHTML = "";
    obj.forEach(element => {
        const clone = elCarsTemplate.content.cloneNode(true);
        const elTitle = clone.querySelector(".carsName")
        const elTrim = clone.querySelector(".trim")
        const elGeneration = clone.querySelector(".generation")
        const elYear = clone.querySelector(".year")
        const elColor = clone.querySelector(".color")
        const elColorName = clone.querySelector(".colorName")
        const elCategory = clone.querySelector(".category")
        const elDoorCount = clone.querySelector(".doorCount")
        const elSeatCount = clone.querySelector(".seatCount")
        const elMaxSpeed = clone.querySelector(".maxSpeed")
        const elAcceleration = clone.querySelector(".acceleration")
        const elEngine = clone.querySelector(".engine")
        const elHorsepower = clone.querySelector(".horsepower")
        const elFuelType = clone.querySelector(".fuelType")
        const elCity = clone.querySelector(".city")
        const elHighway = clone.querySelector(".highway")
        const elCombined = clone.querySelector(".combined")
        const elCountry = clone.querySelector(".country")
        const elID = clone.querySelector(".id")
        const elCarDescription = clone.querySelector(".carDescription")
        const elDeleteButton = clone.querySelector(".js-delete")
        const elEditButton = clone.querySelector(".js-edit")


        elTitle.innerText = element.name;
        elTrim.innerText = element.trim;
        elGeneration.innerText = element.generation;
        elYear.innerText = element.year;
        elColor.innerText = "";
        elColor.style.backgroundColor = element.color;
        elColorName.innerText = element.colorName;
        elCategory.innerText = element.category;
        elDoorCount.innerText = element.doorCount;
        elSeatCount.innerText = element.seatCount;
        elMaxSpeed.innerText = element.maxSpeed;
        elAcceleration.innerText = element.acceleration;
        elEngine.innerText = element.engine;
        elHorsepower.innerText = element.horsepower;
        elFuelType.innerText = element.fuelType;
        if (element.fuelConsumption) {
           const { city, highway, combined } = element.fuelConsumption;
           elCity.innerText = city;
           elHighway.innerText = highway;
           elCombined.innerText = combined;
        }

        elCountry.innerText = element.country;
        elCarDescription.innerText = element.description;
        
        elID.innerText = element.id;
        elDeleteButton.id = element.id
        elEditButton.id = element.id;

        elCarContainer.append(clone)
    });
}

function deleteCar(id) {
    fetch(`https://json-api.uz/api/project/fn44/cars/${id}`, {
        method: "DELETE",
    })
    .then((res)=> {
        return res.text()
    })
    .then((res)=> {
        toast(res)
        init()
    })
}


// CRUD
elCarContainer.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("js-delete")) {
        if (confirm("Rostdan ham ushbu modelni o'chirmoqchimisiz?")) {
            evt.target.innerText = "O'chirilmoqda..."
            deleteCar(evt.target.id);
        }
    }
})