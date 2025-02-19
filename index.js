window.onload = function () {
    var addBtn = document.getElementById("add-btn");
    addBtn.onclick = function () {
        Swal.fire({
            title: 'New Student',
            showConfirmButton: false,
            html:
                `
             <form id="student-form">
                <div id="form-group">
                   <label>Student Name</label>
                   <input required="true" id="Student-name" name="student-name" type="text" placeholder="sachin kumar yadav"></input>
                </div>
                 <div id="form-group">
                   <label>Class</label>
                   <input required="true" id="class" name="class" type="number" placeholder="4"></input>
                </div>
                 <div id="form-group">
                   <label>Roll</label>
                   <input required="true" id="roll" name="roll" type="number" placeholder="12"></input>
                </div>
                <button id="submit-btn">Submit</button>
             </form>
            `
        });

        // Add students
        var studentForm = document.getElementById("student-form");
        studentForm.onsubmit = function (e) {
            e.preventDefault();
            var name = document.getElementById("Student-name");
            var studentClass = document.getElementById("class");
            var roll = document.getElementById("roll");


            var student = {
                name: name.value,
                class: studentClass.value,
                roll: roll.value
            }

            var data = localStorage.getItem("student");
            if (data == null) {
                // store first time is not available
                localStorage.setItem("student", JSON.stringify([student]))
                Swal.fire({
                    icon: 'success',
                    title: 'New Data Added'
                }).then(function () {
                    // Reload page
                    window.location = location.href
                })

            }
            else {
                // Second time already data  
                var oldData = JSON.parse(data);
                oldData.push(student);
                var allData = JSON.stringify(oldData);
                localStorage.setItem("student", allData);
                Swal.fire({
                    icon: 'success',
                    title: 'New Data Added'
                }).then(function () {
                    // Reload page
                    window.location = location.href
                })
            }
        }
    }
    // Show Students
    var students = localStorage.getItem("student");
    if (students != null) {
        var original = JSON.parse(students);
        for (var i = 0; i < original.length; i++) {


            var tr = document.createElement("tr");

            //sn 
            var snTd = document.createElement("td")
            snTd.innerHTML = (i + 1);

            //name
            var nameTd = document.createElement("td");
            nameTd.innerHTML = original[i].name;

            //class
            var classTd = document.createElement("td");
            classTd.innerHTML = original[i].class;

            //roll
            var rollTd = document.createElement("td")
            rollTd.innerHTML = original[i].roll;

            //setup action 
            var actionTd = document.createElement("td");
            var actionDiv = document.createElement("div");

            var editBtn = document.createElement("button");
            editBtn.id = "edit-btn";
            editBtn.setAttribute("row-index", i)
            editBtn.innerHTML = '<i class="ri-image-edit-line"></i>';

            var deleteBtn = document.createElement("button");
            deleteBtn.id = "delete-btn";
            deleteBtn.value = i;
            deleteBtn.innerHTML = '<i class="ri-delete-bin-7-line"></i>';

            actionDiv.append(editBtn);
            actionDiv.append(deleteBtn);
            actionTd.append(actionDiv);

            //set td inside tr
            tr.append(snTd);
            tr.append(nameTd);
            tr.append(classTd);
            tr.append(rollTd);
            tr.append(actionTd);

            //set tr inside table
            var studentTable = document.getElementById("student-table");
            studentTable.append(tr);

            //converting localstorage string in array of object
            var tmp = JSON.parse(students);

            // Delete student
            deleteBtn.onclick = function () {
                var index = this.value;
                tmp.splice(index, 1);
                localStorage.setItem("student", JSON.stringify(tmp));
                window.location = location.href;                //"http://google.com" page ko redirect kar sakte hai
            }

            //edit Student
            editBtn.onclick = function () {
                var index = this.getAttribute("row-index");
                var editTableStudent = tmp[index]

                Swal.fire({
                    title: 'Edit Student',
                    showConfirmButton: false,
                    html:
                        `
                     <form id="edit-student-form">
                        <div id="form-group">
                           <label>Student Name</label>
                           <input value="${editTableStudent.name}" required="true" id="Student-name" name="student-name" type="text" placeholder="sachin kumar yadav"></input>
                        </div>
                         <div id="form-group">
                           <label>Class</label>
                           <input value="${editTableStudent.class}" required="true" id="class" name="class" type="number" placeholder="4"></input>
                        </div>
                         <div id="form-group">
                           <label>Roll</label>
                           <input value="${editTableStudent.roll}" required="true" id="roll" name="roll" type="number" placeholder="12"></input>
                        </div>
                        <button id="save-btn">Save</button>
                     </form>
                    `
                });

                //save student after editing
                var form = document.getElementById("edit-student-form");
                form.onsubmit = function (e) {
                    e.preventDefault();
                    var name = document.getElementById("Student-name").value;
                    var studentClass = document.getElementById("class").value;
                    var roll = document.getElementById("roll").value;

                    var newStudent = {
                        name: name,
                        class: studentClass,
                        roll: roll
                    }

                    // Replace old data with new data
                    tmp[index] = newStudent;
                    localStorage.setItem("student", JSON.stringify(tmp));

                    Swal.fire({
                        icon: 'success',
                        title: 'student Record saved'
                    }).then(function () { //callback function
                        window.location = location.href;
                    })
                }
            }
        }

    }

    // Print 
    var printBtn=document.getElementById("print-btn");
    printBtn.onclick=function(){
       window.print()
    }

}
