window.addEventListener("DOMContentLoaded", (event) => {
  salaryValue();
});

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

const save = () => {
  try {
    // console.log("in save");
    let employeePayrollData = createEmployeeData();
    createAndUpdateStorage(employeePayrollData);
  } catch (e) {
    return;
  }
};

const createEmployeeData = () => {
  let employeePayrollData = new EmployeePayrollData();
  try {
    // console.log("in create");
    employeePayrollData.name = getInputValueByID("#name");
  } catch (e) {
    setTextValue(".text-error", e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValue("[name=profile]").pop();
  employeePayrollData.gender = getSelectedValue("[name=gender]").pop();
  employeePayrollData.department = getSelectedValue("[name=department]");
  employeePayrollData.salary = getInputValueByID("#salary");
  try{
    let date =
    getInputValueByID("#day") +
    " " +
    getInputValueByID("#month") +
    " " +
    getInputValueByID("#year");
    employeePayrollData.startDate = new Date(Date.parse(date));
  }
  catch(e)
  {
    setTextValue('.date-error',e);
    throw e;
  }
  
  employeePayrollData.notes = getInputValueByID("#notes");

  alert(employeePayrollData.name+" is added");
  return employeePayrollData;
};

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

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else
    {
        employeePayrollList = [employeePayrollData];
    }
    //alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
