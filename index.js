
// Document elements targeting
const inputBox = document.querySelector('#text-box');
const addBtn = document.querySelector('#submit-btn');
const ol = document.body.querySelector('#OrderList');
// Adding a course in the list
inputBox.addEventListener('keypress', (e) => {
    if (e.key == 'Enter')
        addCourseItemInList(inputBox.value);
});
addBtn.addEventListener('click', (e) => {
    addCourseItemInList(inputBox.value);
});

// Deleting a course
document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.target.parentNode.remove();
        if (ol.children.length < 1) {
            const li = document.createElement('li');
            li.classList.add('course-list');
            li.setAttribute('id', 'emptyMsg4Courses');
            li.textContent = 'No course found! Added courses are displayed here'
            ol.append(li);
        }
    });
});

// Editing & Updating the data/courses
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        editButtonFunctionality(e);
    })
});

// User-Defined Methods
function addCourseItemInList(userInput) {
    if (userInput.trim() === '') // validates if input is empty
        alert('error :\ninvalid course input!');
    else {
        let courseExistence = false;
        const previousCourseList = document.body.querySelectorAll('.course-list'); // targets the 'li'
        for (let list of previousCourseList) { // checks if course already exists in the list
            if (list.firstChild.textContent.trim().toLowerCase() === userInput.trim().toLowerCase()) {
                courseExistence = true;
                break;
            }
        }
        if (courseExistence)
            alert(`error :\n"${userInput}" already exists!`);
        else // course will be added in the list
        {
            if (ol.children[0].id === 'emptyMsg4Courses') {
                ol.children[0].remove();
            }
            const li = document.createElement('li');
            li.classList.add('course-list');
            li.textContent = userInput;

            const btnEdit = document.createElement('button');
            btnEdit.classList.add('edit-btn');
            btnEdit.textContent = 'Edit';
            btnEdit.addEventListener('click', (e) => {
                editButtonFunctionality(e);
            });

            const btnX = document.createElement('button');
            btnX.classList.add('remove-btn');
            btnX.textContent = 'X';
            btnX.addEventListener('click', (e) => {
                e.target.parentNode.remove();
                if (ol.children.length < 1) {
                    const li = document.createElement('li');
                    li.classList.add('course-list');
                    li.setAttribute('id', 'emptyMsg4Courses');
                    li.textContent = 'No course found! Added courses are displayed here'
                    ol.append(li);
                }
            });

            li.append(btnEdit, btnX);
            ol.appendChild(li);
        }
    }
    inputBox.value = '';
}

function editButtonFunctionality(e) {
    const oldCourse = e.target.parentNode;
    let newCourse = '';
    while (newCourse.trim() === '') {
        newCourse = prompt("Error: invalid input \nEnter desired course name down below");
    }
    oldCourse.firstChild.textContent = newCourse;
}
