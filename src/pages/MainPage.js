import workspaceStore from "../data/stores/workspaceStore";
import { Workspace } from '../components/Workspace';
import { Desk } from '../components/Desk';
import Popup from '../components/Popup';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import Category from "../components/Categories";
import { AutoComplete } from 'antd';
const { Option } = AutoComplete;

export const MainPage = observer(() => {
 
    const [popupActive, setPopupActive] = useState(false);

    const onSelect = (data) => {
        workspaceStore.selectedWorkspace = workspaceStore.options.find(item => item.title === data).idWork
        workspaceStore.selectedDesk = workspaceStore.options.find(item => item.title === data).idDesk
      };

    return(
        <div className="app">
        <div className="side_menu">

            <div className="user">
                <div className="user_img"></div>
                <div className="user_info">
                    <div className="user_name">Кабдуллин Дамир</div>
                    <div className="user_mail">smilelfvbh2015@gmail.com</div>
                </div>
            </div>

            <AutoComplete
                style={{
                width: '100%',
                }}
                onSelect={(data) => {
                    onSelect(data)
                    this.value = ""
                }}
                onSearch={(e) => workspaceStore.searchTask(e)}
                placeholder="input here">
                {workspaceStore.options.map((item) => (
                    <Option key={item.title} value={item.title}>
                      {item.title}
                    </Option>
                  ))}
            </AutoComplete>
            {workspaceStore.workspaces.length > 0 ? <Workspace /> : <></>}

            <div className="add">
                <button className="add_btn" onClick={() => setPopupActive(true)}>Добавить рабочую область</button>
            </div>

            <Popup active={popupActive} setActive={setPopupActive} />

        </div>
        <div className="main_block">
            <div className="header">
                <div className="workspace_in_main">
                    <div className="workspace_img"><img src={workspaceStore.workspaces.find(item => item.id === workspaceStore.selectedWorkspace).img || "https://plasticsurgery-ua.org/wp-content/uploads/2016/11/default-placeholder.png"} /></div>
                    <div className="workspace_title">{workspaceStore.workspaces.length > 0 ? workspaceStore.workspaces.find(item => item.id == workspaceStore.selectedWorkspace).title : <></>}  </div>
                </div>

                {workspaceStore.workspaces.length > 0 ? <Desk desks={workspaceStore.selectedWorkspace.desks}/> : <></>}
                
            </div>

            {workspaceStore.workspaces.length > 0 ? <Category /> : <></>}
        </div>
    </div>
    )
});
