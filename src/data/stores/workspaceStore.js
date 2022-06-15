import { makeAutoObservable } from "mobx";

class WorkspaceStore{
    workspaces=[
        {
            id: 1,
            img: "",
            title: "Nodes",
            desks: [
                {
                    id: 1,
                    title: "Frontend",
                    categories: [{
                        id: 1,
                        title: "Ready",
                        tasks: [
                            {
                                id: 1,
                                title: "Сделать макет"
                            }
                        ]
                    } ]
                },
                {
                    id: 2,
                    title: "Backend",
                    categories: [ ]
                }
            ]
        }
    ]

    selectedWorkspace = 1
    selectedDesk = this.workspaces[0].desks[0].id

    constructor(){
        makeAutoObservable(this)
    }

    getIndexById(id){
        for(let i = 0; i < this.workspaces.length; i++){
            if(this.workspacesp[i].id === id){
                return i;
            }
        }
    }

    getDeskById(index, id=this.selectedDesk){
        for(let i = 0; i < this.workspaces[index].desks.length; i++){
            if(this.workspacesp[i].id === id){
                return i;
            }
        }
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
        for(let i = 0; i < this.workspaces.find(item => item.id === this.selectedWorkspace).desks.length; i++){
            if( title === this.workspaces.find(item => item.id === this.selectedWorkspace).desks[i].title){
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
