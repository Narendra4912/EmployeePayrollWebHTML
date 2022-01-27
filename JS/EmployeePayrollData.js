class EmployeePayrollData {

  set id(id){
    this._id=id;
  }

  get id(){
    return this._id;
  }

  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  get profilePic() {
    return this._profilePic;
  }

  set name(name) {
    let nameRegex = RegExp("^[A-Z]{1}[A-Za-z]{2,}$");
    if (nameRegex.test(name)) this._name = name;
    else throw "Name is incorrect !!!";
  }

  get name() {
    return this._name;
  }

  set gender(gender) {
    this._gender = gender;
  }

  get gender() {
    return this._gender;
  }

  set department(department) {
    this._department = department;
  }

  get department() {
    return this._department;
  }

  set startDate(startDate) {
    console.log("Date setter " + startDate);
    const currentDate= new Date();
    if(startDate > currentDate){
      throw "Start date is a future date";
    }
    var diff=Math.abs(currentDate.getTime()- startDate.getTime());
    if(diff/(1000*60*60*24)>30){
      throw 'Start date is beyond 30 days';
    }
    this._startDate = startDate;
  }

  get startDate() {
    return this._startDate;
  }

  set salary(salary) {
    this._salary = salary;
  }

  get salary() {
    return this._salary;
  }

  set notes(notes) {
    this._notes = notes;
  }

  get notes() {
    return this._notes;
  }
}
