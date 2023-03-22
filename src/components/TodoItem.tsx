import {useState} from "react"
import styles from './TodoItem.module.css';
import { Check,Trash } from '@phosphor-icons/react'

interface TodoItemProps{
    todoText: string;
    itemsCompleted: number;
    setItemsCompleted: (number: number) => void;
    deleteTodoItem:(todoText: string)  => void;
}


export function TodoItem({todoText,  itemsCompleted, setItemsCompleted, deleteTodoItem}: TodoItemProps){
    const [isComplete, setIsComplete] = useState(false)

    const completed = isComplete ? styles.completed : ''

    function handleTodoCompleted(){
        setIsComplete(!isComplete)
        if(isComplete === false){
            setItemsCompleted(itemsCompleted + 1)
        }else{
            setItemsCompleted(itemsCompleted - 1)

        }
    }

    return(
            <div className={styles.todoItem}>

                <button onClick={handleTodoCompleted} className={`${styles.todoItemCheck} ${completed}`}><Check/> </button>
                <p>{todoText}</p>
                <button type='button' onClick={()=>deleteTodoItem(todoText)}>
                    <Trash size={24}/>
                </button>
                
            </div>
        )
}