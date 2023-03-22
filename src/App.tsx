import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react"
import { TodoItem } from './components/TodoItem'
import styles from './App.module.css'
import image from './assets/rocket.svg'
import { ClipboardText } from "@phosphor-icons/react"

function App() {

  
  const [inputText, setInputText] = useState('')
  const [todoList, setTodoList]= useState(["Por favor crie um novo todo!"])
  const [itemsCompleted, setItemsCompleted] = useState(0)
  const completedCounter = itemsCompleted > todoList.length ? setItemsCompleted(todoList.length) : itemsCompleted

  function handleCreateNewTodo(ev: FormEvent){
    
    ev.preventDefault()
    setTodoList([...todoList, inputText])
    setInputText('')
  }

  function handleOnInputTextChange(ev: ChangeEvent <HTMLTextAreaElement>){
    ev.target.setCustomValidity('')
    setInputText(ev.currentTarget.value)
  }

  function handleDeleteTodoItem(todoItem: string){
    const todoWithoutDeletedItem = todoList.filter(todoItemToDelete=> {return todoItem !== todoItemToDelete} )
    setTodoList(todoWithoutDeletedItem)
  }

  function handleIputInvalid(ev: InvalidEvent <HTMLTextAreaElement>){
    //Altera a mensagem de validação da textarea.
    ev.target.setCustomValidity('Esse campo precisa ser preenchido!')
}

    
  return (
    <>
      
      <header className={styles.header}>
          <img src={image} alt="Logo" />
          <h1>to<span>do</span></h1>
      </header>

      
      
      <div className={styles.formWrapper}>
        <form onSubmit={handleCreateNewTodo}>
          <textarea 
            placeholder='Adicione uma nova tarefa'
            onChange={handleOnInputTextChange}
            value={inputText}
            required
            onInvalid={handleIputInvalid}
          />

          <button type='submit'>Criar</button>
        </form>
      </div>

      <main className={styles.todo}>
        <header className={styles.todoHeader}>
          <p className={styles.created}>Tarefas Criadas<span>{todoList.length}</span></p>
          <p className={styles.concluded}>Concluídas<span>{`${completedCounter} de ${todoList.length}`}</span></p>
        </header>
        
        <div className={styles.todoItemsList}>
        {todoList.length == 0 ? 
          <div className={styles.nothingTodo}>
            <ClipboardText size={64} />
            <strong>Você ainda não tem tarefas Cadastradas.</strong>
            <span>Crie tarefas e organize os itens a fazer.</span>
          </div>
          : 
          <>
            {todoList.map(todo => {
                return  <TodoItem todoText={todo} 
                  setItemsCompleted ={setItemsCompleted} 
                  itemsCompleted={itemsCompleted} 
                  deleteTodoItem={handleDeleteTodoItem}/>
                })}
          </>
          
        }
        </div>
      </main>
      

    </>
  )
}

export default App
