import { makeAutoObservable } from "mobx";

class WorkspaceStore{
    workspaces=[
        {
            id: 1,
            img: "data:image/png;base64,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",
            title: "Nodes",
            desks: [
                {
                    id: 1,
                    title: "Frontend",
                    categories: [{
                        id: 1,
                        title: "Ready",
                        color: "#74D1EA",
                        tasks: [
                            {
                                id: 1,
                                color: "white",
                                title: "Сделать макет",
                                date: null
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

    deleteWorkspace(id){
        console.log("delete")
        this.workspaces = this.workspaces.filter(item => item.id !== id)
        this.selectedWorkspace = this.workspaces[0].id
        this.selectedDesk = this.workspaces[this.workspaces.findIndex(item => item.id === this.selectedWorkspace)].desks[0].id
    }

    deleteCategory(indexWork, indexDesk, id){
        console.log("delete")
        this.workspaces[indexWork].desks[indexDesk].categories = this.workspaces[indexWork].desks[indexDesk].categories.filter(item => item.id !== id)
    }

    deleteTask(indexWork, indexDesk, indexCategory, id){
        console.log("delete")
        this.workspaces[indexWork].desks[indexDesk].categories[indexCategory].tasks = this.workspaces[indexWork].desks[indexDesk].categories[indexCategory].tasks.filter(item => item.id !== id)
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

    searchTask(val){
        this.workspaces.map(works => {
            works.desks.map(desk => {
                desk.categories.map(category => {
                    category.tasks.map(task => {
                        if(task.title.includes(val)){
                            console.log(task.title);
                        }
                    })
                })
            })
        })
    }
}

export default new WorkspaceStore();
