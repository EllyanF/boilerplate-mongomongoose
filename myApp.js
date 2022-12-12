require('dotenv').config();

const { query } = require('express');
let mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: [String]
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let Person = mongoose.model('Person', personSchema);

//--- Creates and Saves a person in database ---
const createAndSavePerson = function (done) {
  var somebody = new Person({
    name: "Ellyan Fernandes",
    age: 21,
    favoriteFoods: ['Pizza', 'Hamburguer', 'Ice Cream']
  });
  somebody.save((err, data) => {
    err ? console.error(err) : done(null, data);
  });
};

var manyPersons = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

//--- Creates many rows simultaneously ---
const createManyPeople = function (arrayOfPeople = manyPersons, done) {
  Person.create(arrayOfPeople, function (err, people) {
    err ? console.error(err) : done(null, data);
  });
};

const findPeopleByName = function (personName, done) {
  Person.find({ name: personName }, function (err, personFound) {
    err ? console.error(err) : done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, personFound) {
    err ? console.error(err) : done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, personFound) => {
    err ? console.error(err) : done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      err ? console.error(err) : done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    err ? console.error(err) : done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    err ? console.error(err) : done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    err ? console.error(err) : done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find(
    { favoriteFoods: foodToSearch }
  ).sort({ name: 'asc' }).limit(2).select({ age: 0 }).
    exec((err, data) => {
      err ? console.error(err) : done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
