import workspaceStore from "../data/stores/workspaceStore";
import { Workspace } from '../components/Workspace';
import { Desk } from '../components/Desk';
import Popup from '../components/Popup';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import Category from "../components/Categories";

export const MainPage = observer(() => {
 
    const [popupActive, setPopupActive] = useState(false);

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

            <Workspace />

            <div className="add">
                <button className="add_btn" onClick={() => setPopupActive(true)}>Добавить рабочую область</button>
            </div>

            <Popup active={popupActive} setActive={setPopupActive} />

        </div>
        <div className="main_block">
            <div className="header">
                <div className="workspace_in_main">
                    <div className="workspace_img"></div>
                    <div className="workspace_title"> {workspaceStore.selectedWorkspace.title} </div>
                </div>

                <Desk desks={workspaceStore.selectedWorkspace.desks}/>
            </div>

            <Category />
        </div>
    </div>
    )
});