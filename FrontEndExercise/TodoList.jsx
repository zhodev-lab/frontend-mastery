// my notes 1. need to use object in the to do list , array will miss up
//          2. use filter to do it , splice will make directly change the state
//          3. aria-label , type, placeholder , need in input 

export default function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [txtInput, setTxtInput] = useState('');
  const handleInput = (e) => {
    setTxtInput(e.target.value);
  };
  const handleToDoAdd = () => {
    const txtLabel = txtInput.trim();
    const num = Math.random() * 100;
    setTodoList([...todoList, { label: txtLabel, id: `${num}_${txtLabel}` }]);
    setTxtInput('');
  };
  const handleDeletBtn = (id) => {
    const newToDoList = [...todoList].filter((item) => {
      return item.id !== id;
    });

    setTodoList([...newToDoList]);
  };

  return (
    <div>
      <>
        <input
          value={txtInput}
          onChange={handleInput}
          aria-label = "Add new task"
          type="text"
          placeholder="Add your task"
        />
        <button onClick={handleToDoAdd}> ToDo </button>
      </>
      <ul>
        {todoList.map(({ label = '', id }) => {
          return (
            <li key={`${id}`}>
              <label>{label}</label>
              <button onClick={() => handleDeletBtn(id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}