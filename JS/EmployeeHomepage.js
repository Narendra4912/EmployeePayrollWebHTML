let employeePayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    employeePayrollList=getEmployeePayrollDataFromLocalStorage();
    document.querySelector('.emp-count').textContent=employeePayrollList.length;
    createInnerHtml();
})

const getEmployeePayrollDataFromLocalStorage = () =>{
    return localStorage.getItem("EmployeePayrollList")?JSON.parse(localStorage.getItem("EmployeePayrollList")):[];
}

const createInnerHtml = () =>{
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
    "<th>Start Date</th><th>Actions</th>";
    if(employeePayrollList.length == 0) return;
    let innerHtml=`${headerHtml}`;
    for(const employeePayrollData of employeePayrollList){
        innerHtml=`${innerHtml}
        <tr>
            <td>
                <img src="${employeePayrollData._profilePic}" alt="">
            </td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${employeePayrollData._department}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${employeePayrollData._startDate}</td>
            <td>
                <img id="${employeePayrollData.id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                <img id="${employeePayrollData.id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="update">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML=innerHtml;
}

const createEmployeePayrollJSON = () =>{
    let empPayrollListLocal = [
        {
            "id": 1,
            "_name": "Mark",
            "_gender": "male",
            "_department": [
              "Finance"
            ],
            "_salary": "500000",
            "_startDate": "14 Sept 2019",
            "_note": "All In One",
            "_profilePic": "../assets/profile-images/Ellipse -3.png"
          },
          {
            "id": 2,
            "_name": "Bill",
            "_gender": "male",
            "_department": [
              "Engineering", "Sales"
            ],
            "_salary": "500000",
            "_startDate": "29 Oct 2019",
            "_note": "Terrific Engineer",
            "_profilePic": "../assets/profile-images/Ellipse -8.png"
          }
    ]
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) =>{
    let deptHtml='';
    for(const dept of deptList){
        deptHtml=`${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}