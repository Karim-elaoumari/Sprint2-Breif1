
//success alert 
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}
// success alert 


//reload
var count_tasks=11;
reloadTasks();
/*-------------------------------------------------------------------------------------------------------------------*/
function saveTask() {
    // Recuperer task attributes a partir les champs input
    var checked;
    if(form_bug.checked){
        checked = "Bug";
    }
    else if(form_feature.checked){
        checked = "Features";
    }
    if(form_title.value==''){
      modal_body.innerHTML+=`<div class="alert alert-danger" role="alert">
  Please fill out the format !!!
</div>`;
    }
    else{
    // Créez task object
    const temp_task = {title: form_title.value, type:checked, priority:form_options_priority.value,status:form_options_status.value, date:form_date.value, description:form_description.value,id:count_tasks};
    // Ajoutez object au Array
    tasks.push(temp_task);
    count_tasks++;
    reloadTasks();
    initTaskForm();
    dismis.click();
    liveToastBtn.click();
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/
function updateTask(input) {
    // GET TASK ATTRIBUTES FROM INPUTS
    
    var checked1;
    var correct_pos ;
   
    if(form_bug.checked){
        checked1 = "Bug";
    }
    else if(form_feature.checked){
        checked1 = "Features";
    }
    for(let x in tasks){
            if(input==tasks[x].id){
            correct_pos = x;
          }
        }
        // Créez task object
        const temp_task1 = {title: form_title.value, type:checked1, priority:form_options_priority.value,status:form_options_status.value, date:form_date.value, description:form_description.value,id:input};
        // Ajoutez object au Array
        tasks[correct_pos].title = temp_task1.title;
        tasks[correct_pos].type = temp_task1.type;
        tasks[correct_pos].priority = temp_task1.priority;
        tasks[correct_pos].status = temp_task1.status;
        tasks[correct_pos].date = temp_task1.date;
        tasks[correct_pos].description = temp_task1.description;
        tasks[correct_pos].id = temp_task1.id;
        // Refresh tasks
        reloadTasks();
        initTaskForm();
        // Fermer Modal form
        dismis.click();
  
}

/*-------------------------------------------------------------------------------------------------------------------*/
function deleteTask(input) {
  // Get index of task in the array
    for(let i=0;i<tasks.length;i++){
      
        if(input==tasks[i].id){
          // Remove task from array by index splice function
            tasks.splice(i,1);
            // refresh tasks
            reloadTasks();
        }
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/
function initTaskForm() {
    // Clear task form from data
    staticBackdrop.innerHTML =`
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Task</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="modal_body">
          <div class="mb-3 pt-2">
              <label for="exampleFormControlInput1" class="form-label">Title</label>
              <input type="text" class="form-control" id="form_title" placeholder="Enter card title"value minlength="3" maxlength="60" size="60" required>
          </div>
          <label for="exampleFormControlInput1" class="form-label">Type</label>
          <div class="form-check mt-2 ms-2">
            
            <input type="radio" class="form-check-input" id="form_bug" name="radio-stacked" required>
            <label class="form-check-label" for="validationFormCheck2">Bug</label>
          </div>
          <div class="form-check mb-4 ms-2">
            <input type="radio" class="form-check-input" id="form_feature" name="radio-stacked" required>
            <label class="form-check-label" for="validationFormCheck3">Feature</label>
          </div>
          <div class="col-md-4 w-100 mb-4">
              <label for="inputState" class="form-label">Priority</label>
              <select id="form_options_priority" class="form-select " required>
              <option selected>Please select</option>
              <option value="High">High</option>
              <option value="medium">medium</option>
              <option value="Low">Low</option>
              </select>
          </div>
        
          <div class="col-md-4 w-100 mb-4">
              <label for="inputState" class="form-label">Status</label>
              <select id="form_options_status" class="form-select " required>
                <option selected>Please select</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
          </div>
        
          <div class="md-form md-outline input-with-post-icon datepicker mb-4">
              <label for="inputState" class="form-label">Date</label>
              <input placeholder="Select date" type="date" id="form_date" class="form-control" required>
          </div>
          <div class="form-group mb-4">
              <label for="inputState" class="form-label">Description</label>
              <textarea class="form-control" id="form_description" rows="3" required></textarea>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary"  id="dismis" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onclick="saveTask()">Save</button>
      </div>
    </div>
  </div>`;
   
}
/*-------------------------------------------------------------------------------------------------------------------*/
function edit_task(clicked_id)
{
    // Initialisez task form
    initTaskForm();
    for(let i of tasks){
        if(i.id==clicked_id){
          // Ouvrir modal form
    var html = `
    
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="">Task Edit</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 pt-2">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="text" class="form-control" id="form_title" value="${i.title}" minlength="3" maxlength="60" size="60" required>
                </div>
                <label for="exampleFormControlInput1" class="form-label">Type</label>
                <div class="form-check mt-2 ms-2">
                  
                  <input type="radio" class="form-check-input" id="form_bug" name="radio-stacked"  required>
                  <label class="form-check-label" for="validationFormCheck2">Bug</label>
                </div>
                <div class="form-check mb-4 ms-2">
                  <input type="radio" class="form-check-input" id="form_feature" name="radio-stacked" required>
                  <label class="form-check-label" for="validationFormCheck3">Feature</label>
                </div>
                <div class="col-md-4 w-100 mb-4">
                    <label for="inputState" class="form-label">Priority</label>
                    <select id="form_options_priority" class="form-select " required>
                    <option selected>Please select</option>
                    <option value="High">High</option>
                    <option value="medium">medium</option>
                    <option value="Low">Low</option>
                    </select>
                </div>
              
                <div class="col-md-4 w-100 mb-4">
                    <label for="inputState" class="form-label">Status </label>
                    <select id="form_options_status" class="form-select " required>
                      <option selected>Please select</option>
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                </div>
              
                <div class="md-form md-outline input-with-post-icon datepicker mb-4">
                    <label for="inputState" class="form-label">Date</label>
                    <input placeholder="Select date" type="date" id="form_date" class="form-control" value="${i.date}"required>
                </div>
                <div class="form-group mb-4">
                    <label for="inputState" class="form-label">Description</label>
                    <textarea class="form-control" id="form_description" rows="3" required>${i.description}</textarea>
                  </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="${i.id}"  data-bs-dismiss="modal" onclick="deleteTask(this.id)">Delete</button>
              <button type="button" class="btn btn-primary" id="${i.id}" onclick="updateTask(this.id)">Edit</button>
              
            </div>
          </div>
        </div>`;

            staticBackdrop.innerHTML=html;
            if(i.type=="Bug"){
              form_bug.checked = true;
            }
            else {
              form_feature.checked =true;
            }
            form_options_status.value=i.status;
            form_options_priority.value=i.priority;
            document.getElementById("js_click").click();
        }
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/
function reloadTasks() {
    // Remove tasks elements
    to_do_tasks.innerHTML="";
    in_progress_tasks.innerHTML="";
    done_tasks.innerHTML="";
    let todoo=0;
    let doingg=0;
    let donee=0;

    // Set Task count
    
    for(let i in tasks){
        if(tasks[i].status=='To Do'){
            todoo++;
            var todo = document.getElementById("to_do_tasks");
            

            var new_button = `
                            <button class="border border-white  rounded text-start border-secondary mb-3 w-100 d-flex item"  onClick="edit_task(this.id)" style="background-color:#EDE7E7;" id="${tasks[i].id}">
								<div class="col-1 pt-2">
									<i class="fa fa-question-circle fs-3 text-green"></i> 
								</div>
								<div class="col-11 ps-1">
									<div class="fw-bold fs-5">${tasks[i].title}</div>
									<div class="">
										<div class="fw-fw-light text-muted">#${Number(tasks[i].id)+1} created in ${tasks[i].date}</div>
										<div class="" title="">${tasks[i].description.slice(0,40)+'...'}</div>
									</div>
									<div class="btn ps-0">
										<span class="btn-primary btn-sm p-0.2 ps-2 pe-2">${tasks[i].priority}</span>
										<span class="btn-secondary btn-sm p-0.2	ps-2 pe-2">Feature</span>
									</div>
								</div>
							</button>`;

            todo.innerHTML+=new_button;
            

        }
        else if(tasks[i].status=='In Progress'){
            doingg++;
            var doing = document.getElementById("in_progress_tasks");

            var new_button = `
                            <button class="border border-white  rounded text-start border-secondary mb-3 w-100 d-flex item" onClick="edit_task(this.id)" style="background-color:#EDE7E7" style="background-color:#EDE7E7;" draggable="true" id="${tasks[i].id}" >
								<div class="col-1 pt-2">
									<i class="spinner-border spinner-border-sm fs-2 text-green"></i> 
								</div>
								<div class="col-11 ps-1">
									<div class="fw-bold fs-5">${tasks[i].title}</div>
									<div class="">
										<div class="fw-fw-light text-muted">#${Number(tasks[i].id)+1} created in ${tasks[i].date}</div>
										<div class="" title="">${tasks[i].description.slice(0,50)+'...'}</div>
									</div>
									<div class="btn ps-0">
										<span class="btn-primary btn-sm p-0.2 ps-2 pe-2">${tasks[i].priority}</span>
										<span class="btn-secondary btn-sm p-0.2	ps-2 pe-2">${tasks[i].type}</span>
									</div>
								</div>
							</button>`;

            doing.innerHTML+=new_button;
        }
        else{
            var done = document.getElementById("done_tasks");

            var new_button = `
                            <button class="border border-white  rounded text-start border-secondary mb-3 w-100 d-flex item" onClick="edit_task(this.id)" style="background-color:#EDE7E7" style="background-color:#EDE7E7;" draggable="true"  id="${tasks[i].id}" >
								<div class="col-1 pt-2">
									<i class="fa fa-check-circle fs-3 text-green"></i> 
								</div>
								<div class="col-11 ps-1">
									<div class="fw-bold fs-5">${tasks[i].title}</div>
									<div class="">
										<div class="fw-fw-light text-muted">#${Number(tasks[i].id)+1} created in ${tasks[i].date}</div>
										<div class="" title="">${tasks[i].description.slice(0,50)+'...'}</div>
									</div>
									<div class="btn ps-0">
										<span class="btn-primary btn-sm p-0.2 ps-2 pe-2">${tasks[i].priority}</span>
										<span class="btn-secondary btn-sm p-0.2	ps-2 pe-2">${tasks[i].type}</span>
									</div>
								</div>
							</button>`;

            done.innerHTML+=new_button;
            donee++;
            

        }
            done_tasks_count.innerHTML=donee;
            in_progress_tasks_count.innerHTML=doingg;
            to_do_tasks_count.innerHTML=todoo;
            // drag_item();

    }
}
// function drag_item(){
//   let drag =null;
//   let items = document.querySelectorAll(".item");
//   let boses = document.querySelectorAll(".boxe");
//   items.forEach(item=>{
//     item.addEventListener('dragstart',function(){
      
      
//       drag =this.id;
//       item.style.opacity = '0.5';
//       console.log("evjide");

//     });
//     item.addEventListener('dragend',function(e){
//       e.preventDefault();
//       console.log("karim");
//       item.style.opacity = '1';
//       drag = null;

//     });
//     boses.forEach(boxe=>{
//       boxe.addEventListener('dragover', function(){
//         console.log("halloween");

//       });
//       boxe.addEventListener('dragleave', function(){
//         console.log("gaavvi");

//       });
//       boxe.addEventListener('drop', function(){
//         console.log("gaavvi");
        
        

//       });


//     });
//   });

// }