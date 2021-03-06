let employeePayrollList;

window.addEventListener("DOMContentLoaded", (event) => {
  employeePayrollList = getEmployeePayrollDataFromLocalStorage();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem("editEmp");
});

const getEmployeePayrollDataFromLocalStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

const createInnerHtml = () => {
  const headerHtml =
    "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>" +
    "<th>Start Date</th><th>Actions</th>";
  //if (employeePayrollList.length == 0) return;
  let innerHtml = `${headerHtml}`;
  for (const employeePayrollData of employeePayrollList) {
    console.log(employeePayrollData._id);
    innerHtml = `${innerHtml}
        <tr>
            <td>
                <img src="${employeePayrollData._profilePic}" alt="">
            </td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${employeePayrollData._department}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${stringifyDate(employeePayrollData._startDate)}</td>
            <td>
                <img id="${
                  employeePayrollData._id
                }" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img id="${
                  employeePayrollData._id
                }" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="update">
            </td>
        </tr>
        `;
  }
  document.querySelector("#display").innerHTML = innerHtml;
};

const createEmployeePayrollJSON = () => {
  let empPayrollListLocal = [
    {
      id: 1,
      _name: "Mark",
      _gender: "male",
      _department: ["Finance"],
      _salary: "500000",
      _startDate: "14 Sept 2019",
      _note: "All In One",
      _profilePic: "../assets/profile-images/Ellipse -3.png",
    },
    {
      id: 2,
      _name: "Bill",
      _gender: "male",
      _department: ["Engineering", "Sales"],
      _salary: "500000",
      _startDate: "29 Oct 2019",
      _note: "Terrific Engineer",
      _profilePic: "../assets/profile-images/Ellipse -8.png",
    },
  ];
  return empPayrollListLocal;
};

const getDeptHtml = (deptList) => {
  let deptHtml = "";
  for (const dept of deptList) {
    deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
  }
  return deptHtml;
};

const stringifyShowDate = (date) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const newDate = !date
    ? "undefined"
    : new Date(Date.parse(date)).toLocaleDateString("en-GB", options);
  return newDate;
};

const remove = (data) => {
  // if(data=1)
  //   let removeEmployeeData = employeePayrollList.find((empData) => empData._id == data);
  // else
    let removeEmployeeData = employeePayrollList.find((empData) => empData._id == data.id);

  if (!removeEmployeeData) return;
  const index = employeePayrollList
    .map((empData) => empData._id)
    .indexOf(removeEmployeeData._id);
  employeePayrollList.splice(index, 1);
  localStorage.setItem(
    "EmployeePayrollList",
    JSON.stringify(employeePayrollList)
  );
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
};

const update = (data) => {
  let updateEmployeeData = employeePayrollList.find(
    (empData) => empData._id == data.id
  );
  if (!updateEmployeeData) return;
  const index = employeePayrollList
    .map((empData) => empData._id)
    .indexOf(updateEmployeeData._id);
  employeePayrollList.splice(index, 1);
  localStorage.setItem("editEmp", JSON.stringify(updateEmployeeData));
  // console.log("********************");
  // console.log(data.id);
  // remove(data.id);
  window.location.replace(site_properties.addEmpPage);
};
