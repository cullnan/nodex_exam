import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";


export const Workspace = observer(() => {

    return(
        <div className="workspaces">
              {
                workspaceStore.workspaces.map(item => (
                <div className="workspace"
                 onClick={() => {
                   workspaceStore.setSelectWorkspace({img: item.img, title:item.title ,desks: item.desks})
                   workspaceStore.selectedDesk = workspaceStore.selectedWorkspace.desks[0].title
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