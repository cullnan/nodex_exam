import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";


const handleClickDesk = (index, item) =>{
    console.log(item);
    workspaceStore.addDesk(index, item)
    workspaceStore.setSelectWorkspaceIndex(index)    
}


export const Desk = observer(( ) => {
    const desksArr = []

    for(let i = 0; i < workspaceStore.selectedWorkspace.desks.length; i++){
        desksArr.push(
        <div class="desk" onClick={() => {workspaceStore.selectedDesk = workspaceStore.selectedWorkspace.desks[i].title}}>
            <input type="text" name="" placeholder="New Desk" value={workspaceStore.workspaces[workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title)].desks[i].title} 
                        onChange={(event) => {
                        workspaceStore.setDeskTitle(workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title),
                        i, event.target.value)
                        workspaceStore.selectedDesk = event.target.value
                        }}/>
        </div>)
    }

    return(
        <div className="desks">
              {
                    desksArr
              }
            <button className="add_desk" onClick={() => handleClickDesk(workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title), {title: 'New Desk', categories: [] }) }>+</button>
        </div>
    )
});