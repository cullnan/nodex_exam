import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";
import Tasks from "./Tasks";


const handleClickCategory = async (workIndex, deskIndex, item) =>{
    console.log(workIndex, deskIndex);
    console.log(item);
    workspaceStore.addCategory(workIndex, deskIndex, item)
    workspaceStore.setSelectWorkspaceIndex(workIndex)    
    workspaceStore.selectedDesk = workspaceStore.workspaces[workIndex].desks[deskIndex].title
    console.log(workspaceStore.selectedWorkspace.title, workspaceStore.selectedDesk);
}


const Category = observer(( ) => {
    const categorysArr = []

    if(workspaceStore.selectedWorkspace.desks.length != 0 && workspaceStore.selectedWorkspace.desks[0].categories.length != 0){
        for(let i = 0; i < workspaceStore.selectedWorkspace.desks[workspaceStore.getDeskIndex(workspaceStore.selectedDesk)].categories.length; i++){
            categorysArr.push(<div className="category">
            <div className="category_head">
                <div className="category_title">
                    <input type="text" name="" id="" value={workspaceStore.selectedWorkspace.desks[workspaceStore.getDeskIndex(workspaceStore.selectedDesk)].categories[i].title} 
                    onChange={(event) => {
                        workspaceStore.setCategoryTitle(workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title),
                        workspaceStore.getDeskIndex(workspaceStore.selectedDesk),i ,event.target.value)
                        }}/>
                </div>
                <div className="category_edit">···</div>
            </div>
             <Tasks categoryIndex={i}/>
            </div>
        )
        }
    }

    return(
        <div className="categories">
            {
                categorysArr
            }
            <button class="add_category" onClick={async () => handleClickCategory(workspaceStore.getWorkIndex(workspaceStore.selectedWorkspace.title), workspaceStore.getDeskIndex(workspaceStore.selectedDesk), {title: "New category", tasks: [] })}>+ Добавить категорию</button>
        </div>
    )
});

export default Category