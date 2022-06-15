import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";


const handleClickDesk = (index, item) =>{
    console.log(item);
    workspaceStore.addDesk(index, item)
}

const setSelectedDesk = (workspaceId, deskIndex) => {
    workspaceStore.selectedDesk = workspaceStore.workspaces.find(item => item.id === workspaceId).desks[deskIndex].id
}

export const Desk = observer(( ) => {
    const desksArr = []

    for(let i = 0; i < workspaceStore.workspaces[workspaceStore.workspaces.findIndex(item => item.id === workspaceStore.selectedWorkspace)].desks.length; i++){
        desksArr.push(
        <div className="desk" onClick={() => setSelectedDesk(workspaceStore.selectedWorkspace, i)}>
            <input type="text" name="" placeholder="New Desk" value={workspaceStore.workspaces[workspaceStore.workspaces.findIndex(item => item.id === workspaceStore.selectedWorkspace)].desks[i].title} 
                        onChange={(event) => {
                        workspaceStore.setDeskTitle(workspaceStore.workspaces.findIndex(item => item.id === workspaceStore.selectedWorkspace),
                        i, event.target.value)
                        }}/>
        </div>)
    }

    return(
        <div className="desks">
              {
                    desksArr
              }
            <button className="add_desk" onClick={() => handleClickDesk(workspaceStore.workspaces.findIndex(item => item.id === workspaceStore.selectedWorkspace), {id: Date.now(), title: 'New Desk', categories: [] }) }>+</button>
        </div>
    )
});
