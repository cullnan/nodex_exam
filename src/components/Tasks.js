import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";


const handleClickTask = (workIndex, deskIndex, categoryIndex, item) =>{
    console.log(workIndex, deskIndex, categoryIndex);
    workspaceStore.addTask(workIndex, deskIndex, categoryIndex, item)
}


const Tasks = observer(({sWorkspace, sDesk, categoryIndex}) => {
    const tasksArr = []

    console.log("categoryIndex: ", categoryIndex );
    if(workspaceStore.workspaces[sWorkspace].desks.length != 0 && workspaceStore.workspaces[sWorkspace].desks[sDesk].categories.length != 0 && workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks.length != 0){
        for(let i = 0; i < workspaceStore.workspaces.find(item => item.id == workspaceStore.selectedWorkspace).desks.find(item => item.id == workspaceStore.selectedDesk).categories[categoryIndex].tasks.length; i++){
            tasksArr.push(
            <div className="task">
                <input type="text" name="" id="" value={workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].title}
                onChange={(event) => {
                    workspaceStore.setTaskTitle(sWorkspace,
                    sDesk, categoryIndex,i ,event.target.value)
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
            <button className="add_task" onClick={() => handleClickTask(sWorkspace, sDesk, categoryIndex, {id: Date.now(), title: "New task"})}>+</button>
        </div>
    )
});

export default Tasks
