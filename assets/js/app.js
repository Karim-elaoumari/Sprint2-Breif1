
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
    staticBackdropLabel.innerHTML= "Add Task";
    modal_footer.innerHTML=`
              <button type="button" class="btn btn-secondary"  id="dismis" data-bs-dismiss="modal">Cancel</button>
              
              <button type="button" class="btn btn-primary" id="" onclick="saveTask();">Save</button>`;
}
/*-------------------------------------------------------------------------------------------------------------------*/
function edit_task(clicked_id)
{
    // Initialisez task form
    for(let i of tasks){
        if(i.id==clicked_id){
          // Ouvrir modal form
              staticBackdropLabel.innerHTML= "Edit Task";
              form_title.value=i.title;
              form_date.value=i.date;
              form_description.value = i.description;
              modal_footer.innerHTML=`
              <button type="button" class="btn btn-secondary"  id="dismis" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" id="${i.id}"  data-bs-dismiss="modal" onclick="deleteTask(this.id)">Delete</button>
              <button type="button" class="btn btn-primary" id="${i.id}" onclick="updateTask(this.id)">Edit</button>`;
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
                            <button class="border border-white  rounded text-start border-secondary mb-3 w-100 d-flex item" onClick="edit_task(this.id)" style="background-color:#EDE7E7" style="background-color:#EDE7E7;"  id="${tasks[i].id}" >
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
                            <button class="border border-white  rounded text-start border-secondary mb-3 w-100 d-flex item" onClick="edit_task(this.id)" style="background-color:#EDE7E7" style="background-color:#EDE7E7;"  id="${tasks[i].id}" >
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