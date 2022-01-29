let isUpdate = false;
let employeePayrollObject;

window.addEventListener("DOMContentLoaded", (event) => {
  salaryValue();
  checkForUpdate();
});

const checkForUpdate = () => {
  const updateEmployeeData = localStorage.getItem("editEmp");
  isUpdate = updateEmployeeData ? true : false;
  if (!isUpdate) return;
  employeePayrollObject = JSON.parse(updateEmployeeData);
  setForm();
};

const save = (event) => {
  //event.preventDefault();
  //event.stopPropagation();
  try {
    //setEmployeePayrollObject();
    // let employeePayrollData = createEmployeeData();
    let employeePayrollData = setEmployeePayrollObject();
    createAndUpdateStorage(employeePayrollData);
    resetForm();
    window.location.replace(site_properties.homepage);
  } catch (e) {
    return;
  }
};

const setEmployeePayrollObject = () => {
  let employeePayrollData = new EmployeePayrollData();
  if (isUpdate) {
    employeePayrollData.id = employeePayrollObject._id;
  } else {
    employeePayrollData.id = createNewEmpId();
  }
  try {
    employeePayrollData.name = getInputValueByID("#name");
  } catch (e) {
    setTextValue(".text-error", e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValue("[name=profile]").pop();
  employeePayrollData.gender = getSelectedValue("[name=gender]").pop();
  employeePayrollData.department = getSelectedValue("[name=department]");
  employeePayrollData.salary = getInputValueByID("#salary");
  try {
    let date =
      getInputValueByID("#day") +
      " " +
      getInputValueByID("#month") +
      " " +
      getInputValueByID("#year");
    employeePayrollData.startDate = new Date(Date.parse(date));
  } catch (e) {
    setTextValue(".date-error", e);
    throw e;
  }

  employeePayrollData.notes = getInputValueByID("#notes");

  //alert(employeePayrollData.name + " is added");
  return employeePayrollData;
};

const createEmployeeData = (id) => {
  let localId;
  let employeePayrollData = new EmployeePayrollData();
  if (!id) {
    localId = createNewEmpId();
  } else {
    localId = id;
  }
  employeePayrollData._id=localId;
  // employeePayrollData = setEmployeePayrollData(employeePayrollData);
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
};

const setEmployeePayrollData = (employeePayrollData) => {
  //let employeePayrollData = new EmployeePayrollData();
  //employeePayrollData._id = employeePayrollData._id;
  // try {
  //   employeePayrollData._name = employeePayrollObject.name;
  // } catch (e) {
  //   setTextValue(".text-error", e);
  //   throw e;
  // }
  // employeePayrollData._profilePic = employeePayrollObject.profilePic;
  // employeePayrollData._gender = employeePayrollObject.gender;
  // employeePayrollData._department = employeePayrollObject.department;
  // employeePayrollData._salary = employeePayrollObject.salary;
  // try {
  //   employeePayrollData._startDate = new Date(
  //     Date.parse(employeePayrollObject.startDate)
  //   );
  // } catch (e) {
  //   setTextValue(".date-error", e);
  //   throw e;
  // }

  // employeePayrollData._notes = employeePayrollObject.notes;

  try {
    employeePayrollData.name = getInputValueByID("#name");
  } catch (e) {
    setTextValue(".text-error", e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValue("[name=profile]").pop();
  employeePayrollData.gender = getSelectedValue("[name=gender]").pop();
  employeePayrollData.department = getSelectedValue("[name=department]");
  employeePayrollData.salary = getInputValueByID("#salary");
  try {
    let date =
      getInputValueByID("#day") +
      " " +
      getInputValueByID("#month") +
      " " +
      getInputValueByID("#year");
    employeePayrollData.startDate = new Date(Date.parse(date));
  } catch (e) {
    setTextValue(".date-error", e);
    throw e;
  }

  employeePayrollData.notes = getInputValueByID("#notes");
  alert(employeePayrollData.toString());
  return employeePayrollData;
};

function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(
    localStorage.getItem("EmployeePayrollList")
  );

  if (employeePayrollList != undefined) {
    let employeePayrollData;
    if(isUpdate)
      employeePayrollData =employeePayrollList.find(empData => empData._id=employeePayrollObject._id);
    
    if(!employeePayrollData)
      employeePayrollList.push(createEmployeeData());
    else  
    {
      const index=employeePayrollList
                    .map(empData=>empData._id)
                    .indexOf(employeePayrollData._id);
      employeePayrollList.splice(index,1,createEmployeeData(employeePayrollData._id));
    }
  } else {
    employeePayrollList = [employeePayrollData];
  }
  //alert(employeePayrollList.toString());
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
}

function validateName() {
  const name = document.querySelector("#name");
  const textError = document.querySelector(".text-error");
  name.addEventListener("input", function () {
    try {
      new EmployeePayrollData().name = name.value;
      textError.textContent = "";
    } catch (e) {
      textError.textContent = e;
    }
  });
}

function salaryValue() {
  const salary = document.querySelector("#salary");
  const salaryOutput = document.querySelector(".salary-output");
  salary.addEventListener("input", function () {
    salaryOutput.textContent = salary.value;
  });
}

const getSelectedValue = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  for (let item of allItems) {
    if (item.checked) selItems.push(item.value);
  }
  return selItems;
};

const getInputValueByID = (id) => {
  let value = document.querySelector(id).value;
  return value;
};

const setTextValue = (id, message) => {
  const textError = document.querySelector(id);
  textError.textContent = message;
};

const setForm = () => {
  setValue("#name", employeePayrollObject._name);
  setSelectedValue("[name=profile]", employeePayrollObject._profilePic);
  setSelectedValue("[name=gender]", employeePayrollObject._gender);
  setSelectedValue("[name=department]", employeePayrollObject._department);
  setValue("#salary", employeePayrollObject._salary);
  setTextValue(".salary-output", employeePayrollObject._salary);
  setValue("#notes", employeePayrollObject._notes);
  let date = stringifyDate(employeePayrollObject._startDate).split(" ");
  setValue("#day", date[0]);
  setValue("#month", date[1]);
  setValue("#year", date[2]);
};

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
};

const setSelectedValue = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach((item) => {
    if (Array.isArray(value)) {
      if (value.includes(item.value)) item.checked = true;
    } else if (item.value == value) item.checked = true;
  });
};

const stringifyShowDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const newDate = !date
    ? "undefined"
    : new Date(Date.parse(date)).toLocaleDateString("en-GB", options);
  return newDate;
};

const createNewEmpId = () => {
  let empId = localStorage.getItem("empId");
  empId = !empId ? 1 : (parseInt(empId) + 1).toString();
  localStorage.setItem("empId", empId);
  return empId;
};

const resetForm = () => {
  setValue("#name", "");
  unsetSelectedValue("[name=profile]");
  unsetSelectedValue("[name=gender]");
  unsetSelectedValue("[name=department]");
  setValue("#salary", "");
  setTextValue(".salary-output", 400000);
  setValue("#notes", "");
  setValue("#day", "Day");
  setValue("#month", "Month");
  setValue("#year", "Year");
};

const unsetSelectedValue = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  for (let item of allItems) {
    item.checked = false;
  }
};
