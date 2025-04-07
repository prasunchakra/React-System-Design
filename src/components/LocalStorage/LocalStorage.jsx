import React, { useState, useEffect } from 'react';

function LocalStorage() {
  const [todoList, setTodoList] = useState([]);
  const [newItem, setNewItem] = useState('');

  // 1) Load existing todos (strings or objects) from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem('myTodos');
    if (storedTodos) {
      const parsed = JSON.parse(storedTodos);
      // If the saved array contains strings, convert each to an object
      const normalized = parsed.map((item) => {
        if (typeof item === 'string') {
          return {
            text: item,
            isDone: false,
            isEditing: false,
            editText: item,
          };
        }
        // Already an object; ensure all fields exist
        return {
          text: item.text ?? '',
          isDone: item.isDone ?? false,
          isEditing: item.isEditing ?? false,
          editText: item.editText ?? item.text ?? '',
        };
      });
      setTodoList(normalized);
    }
  }, []);

  // 2) Save todos to localStorage whenever `todoList` changes
  useEffect(() => {
    localStorage.setItem('myTodos', JSON.stringify(todoList));
  }, [todoList]);

  // Add a new todo to the list
  const handleAdd = () => {
    if (!newItem.trim()) return;
    const newTodo = {
      text: newItem.trim(),
      isDone: false,
      isEditing: false,
      editText: newItem.trim(),
    };
    setTodoList([...todoList, newTodo]);
    setNewItem('');
  };

  // Remove a single todo
  const handleRemove = (index) => {
    const updated = [...todoList];
    updated.splice(index, 1);
    setTodoList(updated);
  };

  // Clear all todos
  const handleClearAll = () => {
    setTodoList([]);
  };

  // Switch a todo into editing mode
  const handleEdit = (index) => {
    const updated = [...todoList];
    updated[index].isEditing = true;
    updated[index].editText = updated[index].text; 
    setTodoList(updated);
  };

  // While editing, update the editText field
  const handleEditChange = (index, value) => {
    const updated = [...todoList];
    updated[index].editText = value;
    setTodoList(updated);
  };

  // Save the edited text
  const handleSave = (index) => {
    const updated = [...todoList];
    updated[index].text = updated[index].editText.trim();
    updated[index].isEditing = false;
    setTodoList(updated);
  };

  // Toggle whether the todo is done
  const handleToggleDone = (index) => {
    const updated = [...todoList];
    updated[index].isDone = !updated[index].isDone;
    setTodoList(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Local Storage Todo App</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Add a new todo..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
        <button
          onClick={handleClearAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <ul className="space-y-2">
        {todoList.map((item, index) => {
          const itemClasses = item.isDone
            ? 'line-through text-gray-500 bg-green-50'
            : '';

          return (
            <li
              key={index}
              className={`flex justify-between items-center border p-2 rounded ${itemClasses}`}
            >
              {item.isEditing ? (
                <input
                  type="text"
                  className="border p-1 flex-1 mr-2"
                  value={item.editText}
                  onChange={(e) => handleEditChange(index, e.target.value)}
                />
              ) : (
                <span className="flex-1 mr-2">{item.text}</span>
              )}

              <div className="space-x-2">
                {item.isEditing ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleToggleDone(index)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  {item.isDone ? 'Undone' : 'Done'}
                </button>

                <button
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LocalStorage;
