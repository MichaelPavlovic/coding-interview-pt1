window.addEventListener("load", () => {

    const url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";
    const req = new XMLHttpRequest();

    req.open("GET", url);
    req.send();

    req.addEventListener("load", function(){
        if(req.status === 200 && req.readyState === 4){
            const res = JSON.parse(req.responseText);

            //console.log(res);

            //loop through each employee
            for(let i = 1; i <= Object.keys(res).length; i++){
                //check if the employee is featured
                let crown = "";
                if(res[i].employeeisfeatured === "1"){
                    crown = "👑"; //if they are featured add the crown emoji
                }

                let rolesArray = res[i].roles; //get an array of the employee's roles

                //console.log(rolesArray);

                //loop through each role in the roles array
                //add the roles to a variable to make it easier to display in the HTML
                let roles = "";
                rolesArray.forEach(role => {
                    roles += `<span class="role" style="background-color:${role.rolecolor};">${role.rolename}</span>`;
                });

                //add the info to the HTML
                document.getElementById("members").innerHTML += `
                    <div class="card">
                        <div class="card__container">
                            <p class="card__crown">${crown}</p>
                            <img src="http://sandbox.bittsdevelopment.com/code1/employeepics/${i}.jpg" alt="picture">
                            <p class="card__name">${res[i].employeefname} ${res[i].employeelname}</p>
                            <p class="card__bio">${res[i].employeebio}</p>
                            <div class="card__roles">${roles}</div>
                        </div>
                    </div>`;
            }
        }
    });
});