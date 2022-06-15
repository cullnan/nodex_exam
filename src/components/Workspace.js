import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";


export const Workspace = observer(() => {

    return(
        <div className="workspaces">
              {
                workspaceStore.workspaces.map(item => (
                <div className="workspace"
                 onClick={() => {
                   workspaceStore.selectedWorkspace = item.id
                   workspaceStore.selectedDesk = workspaceStore.workspaces[workspaceStore.workspaces.findIndex(ws => ws.id == workspaceStore.selectedWorkspace)].desks[0].id
                   console.log({img: item.img, title:item.title, desks: item.desks});
                  }}
                >
                  <div className="workspace_img"><img src={item.img || null} alt={item.title[0]}/></div>
                  <div className="workspace_title"> {item.title} </div>
                </div>
                ))
              }
        </div>
    )
});
