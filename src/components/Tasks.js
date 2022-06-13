import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";


const handleClickTask = (workIndex, deskIndex, categoryIndex, item) =>{
    console.log(workIndex, deskIndex, categoryIndex);
    workspaceStore.addTask(workIndex, deskIndex, categoryIndex, item)
    workspaceStore.setSelectWorkspaceIndex(workIndex)    
    workspaceStore.selectedDesk = workspaceStore.workspaces[workIndex].desks[deskIndex].title
}


const Tasks = observer(({categoryIndex}) => {
    const tasksArr = []

    console.log("categoryIndex: ", categoryIndex );
    if(workspaceStore.selectedWorkspace.desks.length != 0 && workspaceStore.selectedWorkspace.desks[0].categories.length != 0 && workspaceStore.selectedWorkspace.desks[0].categories[categoryIndex].tasks.length != 0){
        for(let i = 0; i < workspaceStore.selectedWorkspace.desks[workspaceStore.getDeskIndex(workspaceStore.selectedDesk)].categories[categoryIndex].tasks.length; i++){
            tasksArr.push(
            <div className="task">
                <input type="text" name="" id="" value={workspaceStore.selectedWorkspace.desks[workspaceStore.getDeskIndex(workspaceStore.selectedDesk)].categories[categoryIndex].tasks[i].title}
                onChange={(event) => {
                    workspaceStore.setTaskTitle(workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title),
                    workspaceStore.getDeskIndex(workspaceStore.selectedDesk), categoryIndex,i ,event.target.value)
                    }}
                />
            </div>
        )
        }
    }

    return(
        <div className="tasks">
            {
                tasksArr
            }
            <button className="add_task" onClick={() => handleClickTask(workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title), workspaceStore.getDeskIndex(workspaceStore.selectedDesk), categoryIndex, {title: "New task"})}>+</button>
        </div>
    )
});

export default Tasks