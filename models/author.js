var moment = require('moment');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name:  {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full first_name
AuthorSchema
.virtual('name')
.get(function() {
  return this.family_name + ' ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function() {
  //return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  var birth = this.date_of_birth ? moment(this.date_of_birth).format('MMMM Do, YYYY') : '';
  var death = this.date_of_death ? moment(this.date_of_death).format('MMMM Do, YYYY') : '';
  return birth + ' - ' + death;
});

// Virtual for author's urlencoded
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});

AuthorSchema
.virtual('date_of_birth_yyyy_mm_dd')
.get(function () {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

AuthorSchema
.virtual('date_of_death_yyyy_mm_dd')
.get(function () {
  return moment(this.date_of_death).format('YYYY-MM-DD');
});

// exporting model
module.exports = mongoose.model('Author', AuthorSchema);
