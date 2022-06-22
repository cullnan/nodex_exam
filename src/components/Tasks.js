import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";
import { useState } from "react";
import moment from 'moment';
import { BgColorsOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, Space, Tooltip, DatePicker } from 'antd';



const Tasks = observer(({sWorkspace, sDesk, categoryIndex}) => {
    const tasksArr = []
    
    const [currentTask, setCurrentTask] = useState(null)

    const handleClickTask = (workIndex, deskIndex, categoryIndex, item) =>{
        console.log(workIndex, deskIndex, categoryIndex);
        workspaceStore.addTask(workIndex, deskIndex, categoryIndex, item)
    }
    
    function dragStartHandler(e, task) {
        console.log('drag', task.title)
        setCurrentTask(task)
    }
    
    function dragLeaveHandler(e) {
        e.target.style.background = 'white'
        
    }
    
    function dragEndHandler(e) {
        e.target.style.background = 'white'
    }
    
    function dragOverHandler(e) {
        e.preventDefault();
        e.target.style.background = 'lightgray'
    }
    
    function dropHandler(e, task, i) {
        e.preventDefault();
        console.log('drop', task.title)
        let item = workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i]
        if(item.id !== currentTask.id) {
            let temp = workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i];
            workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i] = currentTask
            workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks.findIndex(t => t.id === currentTask.id)] = temp;
        }
        e.target.style.background = 'white'

    }

    let colors = ['white', '#E4D5D3', '#F1B2DC', '#BF9BDE', '#74D1EA', '#9DE7D7', '#F2F0A1', '#FCAEBB']
    let colorMenuItems = []
    
    for(let i = 0; i< colors.length; i++){
        colorMenuItems.push({label: colors[i], key: i+1, icon: <div style={{backgroundColor: colors[i], width: '40px', height: '20px'}}></div> })
    }
    
    const handleMenuClick = (e, i) => {
        workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].color = colors[e.key-1]
    }    
    
    const colorDropdown = (i) => (

        <Menu
        onClick={(e) => handleMenuClick(e, i)}
        items={ colorMenuItems }
    />
    );

    const dropdown = (i) => (
        <Menu
        items={[
        {
            label: <Dropdown overlay={colorDropdown(i)} placement="bottomLeft">
                    <Space>
                        Изменить заливку
                    </Space>
                    </Dropdown>,
            key: '1',
            icon: <BgColorsOutlined />,
        },
        {
            label: <div onClick={() => workspaceStore.deleteTask(sWorkspace, sDesk, categoryIndex, workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].id)}>Удалить</div>,
            key: '2',
            icon: <DeleteOutlined onClick={() =>  workspaceStore.deleteTask(sWorkspace, sDesk, categoryIndex, workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].id)} />,
        }
        ]}
    />
    );

    const disabledDate = (current) => {
        return current && current < moment().endOf('day');
      };

    if(workspaceStore.workspaces[sWorkspace].desks.length != 0 && workspaceStore.workspaces[sWorkspace].desks[sDesk].categories.length != 0 && workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks.length != 0){
        for(let i = 0; i < workspaceStore.workspaces.find(item => item.id == workspaceStore.selectedWorkspace).desks.find(item => item.id == workspaceStore.selectedDesk).categories[categoryIndex].tasks.length; i++){
            tasksArr.push(
            <div draggable={true} className="task"
                onDragStart={(e) => dragStartHandler(e, workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i])}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i], i)}
                style={{background: workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].color}}
            >
                <div className="taskMain">
                    <input draggable={false} type="text" name="" id="" value={workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].title}
                    style={{background: workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[categoryIndex].tasks[i].color}}
                    onChange={(event) => {
                        workspaceStore.setTaskTitle(sWorkspace,
                        sDesk, categoryIndex,i ,event.target.value)
                        }}
                    />
                    <Dropdown overlay={dropdown(i)}>
                            <Space>
                            <EditOutlined />
                            </Space>
                    </Dropdown>
                </div>
                <div className="date">
                <DatePicker size="small"  onChange={ (e) =>{
                    console.log(e.value);
                    
                }
                } disabledDate={disabledDate} style={{border: 0, width: '110px', margin: 0, padding: '2px'}}/>
                </div>
            </div>
        )
        }
    }

    return(
        <div className="tasks">
            {
                tasksArr
            }
            <button className="add_task" onClick={() => handleClickTask(sWorkspace, sDesk, categoryIndex, {id: Date.now(), date: null, color: 'white', title: "New task"} )}>+</button>
        </div>
    )
});

export default Tasks
