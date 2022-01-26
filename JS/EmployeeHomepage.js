window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
})

const createInnerHtml = () =>{
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th>"+
    "<th>Start Date</th><th>Actions</th>";
    
    const innerHtml=`${headerHtml}
    <tr>
        <td>
            <img src="..//assets/profile-images//Ellipse -3.png" alt="">
        </td>
        <td>Narendra Pawar</td>
        <td>Male</td>
        <td>
            <div class="dept-label">HR</div>
            <div class="dept-label">Marketing</div>
        </td>
        <td>450000</td>
        <td>1 Jan 2022</td>
        <td>
            <img id="1" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="1" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="update">
        </td>
    </tr>
    `;
    document.querySelector('#display').innerHTML=innerHtml;
}