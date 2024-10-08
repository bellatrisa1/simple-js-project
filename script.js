// Находим форму для добавления заметки
const form = document.getElementById("note-form");

// Находим список заметок, куда будут добавляться элементы
const notesList = document.getElementById("notes-list");

// Находим поле для фильтрации заметок по категориям
const filterInput = document.getElementById("filter");

// Массив для хранения всех заметок
let notes = [];

// Функция для отображения заметок
function renderNotes() {
  // Очищаем список заметок перед его перерисовкой
  notesList.innerHTML = "";

  // Получаем значение фильтра и переводим его в нижний регистр для нечувствительности к регистру
  const filterValue = filterInput.value.toLowerCase();

  // Проходим по всем заметкам и отображаем только те, что соответствуют фильтру
  notes.forEach((note, index) => {
    if (note.category.toLowerCase().includes(filterValue)) {
      // Создаем элемент списка для каждой заметки
      const li = document.createElement("li");
      li.className = "list-group-item note-item"; // Добавляем классы для стилей из Bootstrap

      // Добавляем в элемент заголовок, текст и категорию заметки, а также кнопку для удаления
      li.innerHTML = `
                <div>
                    <strong>${note.title}</strong><br>
                    <span>${note.content}</span><br>
                    <small class="text-muted">${note.category}</small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteNote(${index})">Удалить</button>
            `;
      // Добавляем заметку в список
      notesList.appendChild(li);
    }
  });
}

// Добавляем слушатель на отправку формы для добавления новой заметки
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Предотвращаем перезагрузку страницы

  // Получаем значения полей формы
  const title = document.getElementById("note-title").value; // Название заметки
  const content = document.getElementById("note-content").value; // Текст заметки
  const category = document.getElementById("note-category").value; // Категория заметки

  // Добавляем новую заметку в массив
  notes.push({ title, content, category });

  // Очищаем форму после добавления заметки
  form.reset();

  // Перерисовываем список заметок
  renderNotes();
});

// Функция для удаления заметки по индексу
function deleteNote(index) {
  // Удаляем заметку из массива
  notes.splice(index, 1);

  // Перерисовываем список заметок
  renderNotes();
}

// Добавляем слушатель на изменение значения фильтра для обновления списка заметок
filterInput.addEventListener("input", renderNotes);
