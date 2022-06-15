import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";
import Tasks from "./Tasks";


const handleClickCategory = async (workIndex, deskIndex, item) =>{
    console.log(workIndex, deskIndex);
    console.log(item);
    workspaceStore.addCategory(workIndex, deskIndex, item)
}


const Category = observer(( ) => {
    const categorysArr = []

    let sWorkspace = workspaceStore.workspaces.findIndex(item => item.id === workspaceStore.selectedWorkspace);
    let sDesk = workspaceStore.workspaces[sWorkspace].desks.findIndex(item => item.id === workspaceStore.selectedDesk);

    if(workspaceStore.workspaces[sWorkspace].desks.length != 0 && workspaceStore.workspaces[sWorkspace].desks[0].categories.length != 0){
        for(let i = 0; i < workspaceStore.workspaces[sWorkspace].desks[sDesk].categories.length; i++){
            categorysArr.push(<div className="category">
            <div className="category_head">
                <div className="category_title">
                    <input type="text" name="" id="" value={workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[i].title} 
                    onChange={(event) => {
                        workspaceStore.setCategoryTitle(sWorkspace,
                        sDesk ,i ,event.target.value)
                        }}/>
                </div>
                <div className="category_edit">···</div>
            </div>
             <Tasks sWorkspace={sWorkspace} sDesk={sDesk} categoryIndex={i}/>
            </div>
        )
        }
    }

    return(
        <div className="categories">
            {
                categorysArr
            }
            <button className="add_category" onClick={async () => handleClickCategory(sWorkspace, sDesk, {id: Date.now(), title: "New category", tasks: [] })}>+ Добавить категорию</button>
        </div>
    )
});

export default Category
