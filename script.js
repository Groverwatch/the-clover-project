// GLOBAL VARIABLES
    // Defining variables that will be used in the future. 
    var html = "";
    var planners = [];
    var tasks = [];
    var checkboxes = [];
    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// OBJECT CONSTRUCTOR
    // this is a template for the tasks added through the task input in the main section.
    function Task(taskName, plannerName, dueDate, noOfSteps, description) {
        this.taskName = taskName;
        this.plannerName = plannerName;
        this.dueDate = dueDate;
        this.noOfSteps = noOfSteps;
        this.description = description;
    }

// LOCAL STORAGE
    // As of this version, this website is using localStorage, these functions are there to get the storage from previous uses into the current tasks / planner arrays.  
    function loadPlanners() {
        var plannerStorage = JSON.parse(localStorage.plannerStorage);

        if (plannerStorage === null) {
            planners = [];
        }

        else {
            planners = plannerStorage;
        }
    }

    function loadTasks() {
        var taskStorage = JSON.parse(localStorage.taskStorage);

        if (taskStorage === null) {
            tasks = [];
        }

        else {
            tasks = taskStorage;
        }
    }
   
// THE PLANNER SECTION IN THE SIDEBAR.
    // The function displayPlanners() is used to display a planner list with the use of D.GEBI and for loops. 
    function displayPlanners() {   
        loadPlanners();
        html = "";
        planners[0] = "";

        for (i = 1; i < planners.length; i++) {
            html += `<tr>
                        <td style="width: 0.1%;">
                            <input type="checkbox" id="checkbox_${i}" value="${planners[i]}" onclick="sortTasks(this)" checked>
                        </td>
                        <td>
                            <p value=${i} onclick="deletePlanners(this)"> ${planners[i]} </p>
                        </td>
                    </tr>`;

            document.getElementById("plannerSection").innerHTML = html;
        } 
    }

    // On enter, the input on the sidebar is used to enter a new planner into the system, the input's value is pushed into the array and is stored in the localStorage.
    function addPlanners() {
        if (event.key == 'Enter') {
            var plannerInput = document.getElementById("plannerInput");
            planners.push(plannerInput.value);  
    
            localStorage.setItem('plannerStorage', JSON.stringify(planners)); 
            plannerInput.value = "";
        }
    
        displayPlanners(); 
    }

    function deletePlanners(idNumber) {
        var html = "";
    
        planners.splice(idNumber.value , 1);
        localStorage.setItem('plannerStorage', JSON.stringify(planners)); 
        displayPlanners();
        console.log(tasks); 
        
        document.getElementById("taskSidebar").innerHTML = html;
    }

// THE TASK SECTION IN THE MAIN..
    // The function displayTasks() is used to display a task list in the "main section" with the use of D.GEBI and for loops. 
    function displayTasks() {
        document.getElementById("taskSection").innerHTML = "";
        html = "";
        loadTasks();  
        
        html += `<table id="table"> `
        for (i = 0; i < tasks.length; i++) {
            html += 
                `<tr value="task${i}" id='${i}' class="show" onclick="displayTaskSideBar(this), swap('taskSidebar', 'nothing')">
                    <td> <button id="delete${i}" value="${i}" onclick="deleteTask(this)"> </button>
                    <td> <h4> ${tasks[i].taskName} </h4> <p> ${tasks[i].plannerName} ${tasks[i].dueDate} ${tasks[i].noOfSteps} ${tasks[i].description} </p> </td>
                </tr>`;
        }
        html += `</table>`;

        document.getElementById("taskSection").innerHTML = html;
    }

    // This function adds a new task by pressing the button enter, the only data that is entered into the array is the content written and an empty planner. 
    function addTasks(content) {    
        if (event.key == 'Enter') {
            var content = document.getElementById(content);
            
            tasks.push(new Task(content.value, planners[0], "", "", ""));
            localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
            
            content.value = "";
        }
    
        displayTasks(); 
    }
    
    // With the click of the button, the task is deleted from the interface and storage. 
    function deleteTask(idNumber) {
        var html = "";
    
        tasks.splice(idNumber.value , 1);
        localStorage.setItem('taskStorage', JSON.stringify(tasks)); 
        displayTasks();
        
        document.getElementById("taskSidebar").innerHTML = html;
    }

    // displayTaskSideBar() is a function that is used when the user clicks on a task name. When you click the task, A pop up reveals from the side and shows a space for adding details such as steps, descriptions or the selected planner. 
    function displayTaskSideBar(idNumber) {
        var html = "";

        for (i = 0; i < tasks.length; i++) {    
            html = `<div class="task-sidebar">
                        <p style="font-weight: 900; font-size: 20px;"> ${tasks[idNumber.id].taskName} </p>
                        <p> <img src="images/planner.png" style="width:15px;"> Date: ${tasks[idNumber.id].dueDate} </p>
                        <p> Description: ${tasks[idNumber.id].description} </p>
                        <p> Steps: ${tasks[idNumber.id].noOfSteps} </p>
                        <p> Planner: ${tasks[idNumber.id].plannerName} </p>

                        <input id="dateInput" type="date" class="merriweather-font input" value="Due Date: 2022/08/ ${tasks[idNumber.id].dueDate}">
                        <input id="descriptionInput" class="merriweather-font input" placeholder="Description: ${tasks[idNumber.id].description}">
                        <input id="stepsInput" class="merriweather-font input" placeholder="Steps: ${tasks[idNumber.id].noOfSteps}">                  
                        <select class="merriweather-font" id="select" name="asdasd"> </select>
                        <button id="${idNumber.value}" class="merriweather-font" onclick="addTaskDetails(this)"> <p> add details </p> </button>
                        <button onclick="swap('nothing', 'taskSidebar')"> X </button>
                    </div>`;

            document.getElementById("taskSidebar").innerHTML = html; 
        }
        
        html = "";
        
        for (i = 0; i < planners.length; i++) {
            html += '<option>' + planners[i] + '</option>';
            document.getElementById("select").innerHTML = html;
        }
    }

    // after displayTaskSidebar is called, you can add details through a button that calls this function. this function overwrites the details.
    function addTaskDetails(idNumber) {
        loadTasks();

        html = "";
        var selectPlanner = document.getElementById("select");
        var dateInput = document.getElementById("dateInput");
        console.log(dateInput.value);
        var stepsInput = document.getElementById("stepsInput");
        var descriptionInput = document.getElementById("descriptionInput");

        tasks[idNumber.value].dueDate = dateInput.value;
        tasks[idNumber.value].noOfSteps = stepsInput.value;
        tasks[idNumber.value].description = descriptionInput.value;
        tasks[idNumber.value].plannerName = selectPlanner.value;

        localStorage.setItem('taskStorage', JSON.stringify(tasks)); 

        displayTasks();
    }

// THE CALENDAR IN THE SIDEBAR / MAIN SECTION
    // this is here to determine the first day of  the Month and the days of the month with Date(). 
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    // this is here to determine the days of the month with Date(). 
    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    // this loads the select option of the years and months through a for loop. at first it was a button but this option was way less complicated to code and more compact.
    function loadCalendarSelect() {
        var html = "";
        html += "<select id='month' onchange='next()'>";
                    for (i = 0; i < months.length; i++) {
                        if (i == date.getMonth()) {
                            html += "<option value=" + i + " selected='selected'>" + months[i] + "</option>";
                        }

                        else {
                            html += "<option value=" + i + ">" + months[i] + "</option>";
                        }
                    }    
        html += "</select>";

        html += "<select id='year' onchange='next()'>";
                for (i = 2000; i < 2050; i++) {
                    if (i == date.getFullYear()) {
                        html += "<option selected='selected'>" + i + "</option>";
                    }

                    else {
                        html += "<option>" + i + "</option>";
                    }
                }    
        html += "<select>";

        document.getElementById("mainButton").innerHTML = html;
    }

    // this function helps the select to jump to the next option chosen by the user. 
    function next() {
        currentYear = year.value;
        currentMonth = month.value;
        displayCalendar(currentMonth, currentYear, 'sidebarCalendar', 'sidebarDate');
        displayCalendar(currentMonth, currentYear, 'calendarSection', 'mainDate');
    }

    // a function that creates a calendar whenever it is called, once again for loops are used and if statements are used to determine the current date etc etc.
    function displayCalendar(month, year, section, header) {    
        const daysToNewMonth = getFirstDayOfMonth(year, month);
        const daysInMonth = getDaysInMonth(year, month);
        
        var html = "";

        html = "<h2>" + months[month] + " " + year + '</h2>';
        document.getElementById(header).innerHTML = html;

        var html = ""; 

        for (i = 0; i < days.length; i++) {
            if (section == "sidebarCalendar") {
                html +=  "<p>" + days[i][0] + "</p>";
            }

            else {
                html +=  "<h4>" + days[i] + "</h4>";
            }
        }

        for (i = 1; i < daysToNewMonth; i++) {
            html +=  "<p> </p>";
        }

        for (i = 1; i < daysInMonth+1; i++) {
            if (i == date.getDate() && date.getMonth() == month) {
                html += `<p class="currentDate" value=${i} onclick="addEvent(this), swap('event', 'nothing')">${i}</p>`;
            }

            else {
                html +=  `<p value=${i} onclick='addEvent(this), swap("event", "nothing")'>${i}</p>`;
            }
        }

        document.getElementById(section).innerHTML = html;
        html = "";
    }

    // when a calendar date is clicked a sidebar pops out that helps you to try make a new task, sadly dosen't work as I wasn't efficent with time. the if statement helps with date input as it only accepts dates in a YYYY-MM-DD format. 
    function addEvent(value){
        var chosenDate;
        if (value.textContent < 10) {
            chosenDate = 0 + value.textContent;
        }

        else { 
            chosenDate = value.textContent;
        }

        html = `<div class="task-sidebar">
                    <input id="test" class="merriweather-font input" placeholder="add a new task or else..." onkeydown="addTasks('test')">
                    <input id="dateInput" type="date" value="2022-08-${chosenDate}" class="merriweather-font input" placeholder="Due Date: ">
                    <input id="descriptionInput" class="merriweather-font input" placeholder="Description: ">
                    <input id="stepsInput" class="merriweather-font input" placeholder="Steps: ">       
                    <select class="merriweather-font" id="select" name="asdasd"> </select>
                    <button value=${value.textContent} class="merriweather-font" onclick="addTaskDetails(this)"> <p> add details </p> </button> 
                    <button onclick="swap('nothing', 'event')"> X </button>
                    <p> ${value.textContent} </p>
                </div>`;

        document.getElementById('event').innerHTML = html;
    }

// EXTRA FUNCTIONS
    // A function that when a checkbox in the sidebar section is unchecked removes tasks related to the planner that was unchecked. It is not finished as there was many features that was more important than this one. 
    function sortTasks(number) {
        for (i = 0; i < tasks.length; i++) {    
            if (number.checked == false) {
                if (tasks[i].plannerName == number.value) {
                    document.getElementById(i).style.display = "none";
                }
            }

            else {
                document.getElementById(i).style.display = "block";
            }
        }
    }

    // this function is used to hide hidden divs such as the calendar / task or the task sidebar. 
    function swap(sectionA, sectionB) {
        var sectionA = document.getElementById(sectionA); 
        var sectionB = document.getElementById(sectionB); 

        if (sectionA.style.display == "grid") {
            sectionA.style.display = "none";
            sectionB.style.display = "grid";
        }

        else {  
            sectionB.style.display = 'none';
            sectionA.style.display = 'grid'
        }
    }