window.addEventListener('DOMContentLoaded',(event) =>{
    
    salaryValue();


    // let date=document.querySelector('#Day')+" "+document.querySelector('#Month')+" "+document.querySelector('#Year');
    // const dateError=document.querySelector('.date-error');
    
    // try
    // {
    //     (new EmployeePayrollData()).startDate=Date.parse(date);
    //     dateError.textContent="";
    // }
    // catch(e)
    // {
    //     dateError.textContent=e;
    // }
    

})

function validateName()
{
    const name=document.querySelector('#name');
    const textError=document.querySelector('.text-error');
    name.addEventListener('input',function(){
        try{
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent=e;
        }
    })
}

function salaryValue() {
    const salary = document.querySelector("#salary");
    const salaryOutput = document.querySelector(".salary-output");
    salary.addEventListener("input", function () {
      salaryOutput.textContent = salary.value;
    });
  }


const save = () =>{
    try{
        let EmployeePayrollData=createEmployeeData();
    }
    catch(e)
    {
        return;
    }
}

const createEmployeeData = () =>{
    let employeePayrollData=new EmployeePayrollData();
    try{
        employeePayrollData.name=getInputValueByID('#name');
    }
    catch(e)
    {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValue('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValue('[name=gender]').pop();
    employeePayrollData.department=getSelectedValue('[name=department]');
    employeePayrollData.salary=getInputValueByID('#salary');
    let date=getInputValueByID('#day')+" "+getInputValueByID('#month')+" "+getInputValueByID('#year');
    try
    {
        employeePayrollData.startDate=Date.parse(date);
        dateError.textContent="";
    }
    catch(e)
    {
        dateError.textContent=e;
    }
    //employeePayrollData.startDate=Date.parse(date);
    employeePayrollData.notes=getInputValueByID('#notes');

    alert(JSON.stringify(employeePayrollData).toString());
    return employeePayrollData;
}


const getSelectedValue = (propertyValue) =>{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    for(let item of allItems)
    {
        if(item.checked)
            selItems.push(item.value);
    }
    return selItems;
}

const getInputValueByID = (id) =>{
    let value=document.querySelector(id).value;
    return value;
}

const setTextValue = (id, message) =>{
    const textError=document.querySelector(id);
    textError.textContent=message;
}

const resetForm = () =>{
    setValue('#name',"");
    unsetSelectedValue('[name=profile]');
    unsetSelectedValue('[name=gender]');
    unsetSelectedValue('[name=department]');
    setValue('#salary',"");
    setValue('#notes',"");
    setValue('#day',"Day");
    setValue('#month',"Month");
    setValue('#year',"Year");
}

const unsetSelectedValue = (propertyValue) =>{
    let allItems=document.querySelectorAll(propertyValue);
    for(let item of allItems){
        item.checked=false;
    }
}

const setValue = (id, value) =>{
    const element=document.querySelector(id);
    element.value=value;
}
    