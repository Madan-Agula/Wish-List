const addBtn = document.querySelector(".button");
const input = document.querySelector(".form-input");
const listContainer = document.querySelector(".listcontainer");
let todo = JSON.parse(localStorage.getItem("todo"));
let todoList = todo || [];

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const todo = input.value;
  if(todo.length>0){
    if (addBtn.innerHTML == "Save") {
        todoList = todoList.map((tod) =>
          tod.isEdit == true ? { ...tod, todo, isEdit: false } : tod
        );
        addBtn.innerHTML = "Add";
      } else {
        todoList.push({
          id: new Date().valueOf(),
          todo,
          isCompleted: false,
          isEdit: false,
        });
      }
      localStorage.setItem("todo", JSON.stringify(todoList));
      showTodoList(todoList);
      input.value = "";
  }
});

listContainer.addEventListener("click", (e) => {
  const key = e.target.dataset.key;
  const delTodoKey = e.target.dataset.todokey;
  const editKey = e.target.dataset.editkey;
  if (editKey != undefined) {
    const keyVal = todoList.filter((todo) => todo.id == editKey);
    todoList = todoList.map((todo) =>
      todo.id == editKey ? { ...todo, isEdit: true } : todo
    );  
    addBtn.innerHTML = "Save";
    input.value = keyVal[0].todo;
  }
  todoList = todoList.map((todo) =>
    todo.id == key ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );

  todoList = todoList.filter((todo) => todo.id != delTodoKey);

  localStorage.setItem("todo", JSON.stringify(todoList));

  showTodoList(todoList);
});

function showTodoList(todoList) {
  listContainer.innerHTML = todoList
    .map(
      ({ id, todo, isCompleted }) => `<div class="list-parent">
      <input id=${id} class="check-box" type="checkbox" data-key=${id} ${
        isCompleted ? "checked" : ""
      }/>
      <label for=${id} data-key=${id} class="label ${
        isCompleted ? "label-strike" : ""
      }">${todo}</label>
      <button class="edit-btn cursor"><span class="material-icons-outlined small" data-editkey=${id}>
      edit
     </span></button>
      <button class="del-btn  cursor"><span class="material-icons-outlined small" data-todokey=${id}>
      delete
      </span></button></div>`
    )
    .join("");
}
showTodoList(todoList);
