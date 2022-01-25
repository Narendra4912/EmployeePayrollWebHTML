window.addEventListener('DOMContentLoaded',(event) =>{
    
    validateName();

    salaryValue();


    let date=document.querySelector('#Day')+" "+document.querySelector('#Month')+" "+document.querySelector('#Year');
    const dateError=document.querySelector('.date-error');
    
    try
    {
        (new EmployeePayrollData()).startDate=Date.parse(date);
        dateError.textContent="";
    }
    catch(e)
    {
        dateError.textContent=e;
    }
    

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