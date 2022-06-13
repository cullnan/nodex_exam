import { makeAutoObservable } from "mobx";

class WorkspaceStore{
    workspaces=[
        {
            img: "",
            title: "Nodes",
            desks: [
                {
                    title: "Frontend",
                    categories: [{
                        title: "Ready",
                        tasks: [
                            {
                                title: "Сделать макет"
                            }
                        ]
                    } ]
                },
                {
                    title: "End",
                    categories: [ ]
                }
            ]
        }
    ]

    selectedWorkspace = this.workspaces[0]
    selectedDesk = this.workspaces[0].desks[0].title

    constructor(){
        makeAutoObservable(this)
    }

    setSelectWorkspace(workspace){
        this.selectedWorkspace = workspace
    }

    setSelectWorkspaceIndex(index){
        this.selectedWorkspace = this.workspaces[index]
    }

    addWorkspace(item){
        this.workspaces.push(item)        
    }

    addDesk(index, item){
        this.workspaces[index].desks.push(item) 
    }

    async addCategory(workIndex, deskIndex, item){
        this.workspaces[workIndex].desks[deskIndex].categories.push(item) 
    }

    addTask(workIndex, deskIndex, categoryIndex, item){
        this.workspaces[workIndex].desks[deskIndex].categories[categoryIndex].tasks.push(item) 
    }

    getWorkIndex(title){
        for(let i = 0; i < this.workspaces.length; i++){
            if( title === this.workspaces[i].title){
                //console.log(i);
                return i;
            }
        }
    }

    getDeskIndex(title){
        for(let i = 0; i < this.selectedWorkspace.desks.length; i++){
            if( title === this.selectedWorkspace.desks[i].title){
                console.log(i);
                return i;
            }
        }
    }

    setDeskTitle(workIndex, deskIndex, title){
        this.workspaces[workIndex].desks[deskIndex].title = title;
    }

    setCategoryTitle(workIndex, deskIndex, categoryIndex, title){
        this.workspaces[workIndex].desks[deskIndex].categories[categoryIndex].title = title;
    }

    setTaskTitle(workIndex, deskIndex, categoryIndex, taskIndex,title){
        this.workspaces[workIndex].desks[deskIndex].categories[categoryIndex].tasks[taskIndex].title = title;
    }

}

export default new WorkspaceStore();