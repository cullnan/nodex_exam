import { observer } from "mobx-react-lite";
import workspaceStore from "../data/stores/workspaceStore";
import Tasks from "./Tasks";
import { BgColorsOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import {  Dropdown, Menu, Space } from 'antd';


const handleClickCategory = async (workIndex, deskIndex, item) =>{
    console.log(workIndex, deskIndex);
    console.log(item);
    workspaceStore.addCategory(workIndex, deskIndex, item)
} 

const Category = observer(( ) => {
    const categorysArr = []
    
    let sWorkspace = workspaceStore.workspaces.findIndex(item => item.id === workspaceStore.selectedWorkspace);
    let sDesk = workspaceStore.workspaces[sWorkspace].desks.findIndex(item => item.id === workspaceStore.selectedDesk);
    let colors = ['#E4D5D3', '#F1B2DC', '#BF9BDE', '#74D1EA', '#9DE7D7', '#F2F0A1', '#FCAEBB']
    let colorMenuItems = []
    
    for(let i = 0; i< colors.length; i++){
        colorMenuItems.push({label: colors[i], key: i+1, icon: <div style={{backgroundColor: colors[i], width: '40px', height: '20px'}}></div> })
    }
    
    const handleMenuClick = (e, i) => {
        workspaceStore.workspaces[sWorkspace].desks[0].categories[i].color = colors[e.key-1]
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
                        Изменить обводку
                    </Space>
                    </Dropdown>,
            key: '1',
            icon: <BgColorsOutlined />,
        },
        {
            label: <div onClick={() => workspaceStore.deleteCategory(sWorkspace, sDesk, workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[i].id)}>Удалить</div>,
            key: '2',
            icon: <DeleteOutlined onClick={() => workspaceStore.deleteCategory(sWorkspace, sDesk, workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[i].id)} />,
        },
        ]}
    />
    );

    if(workspaceStore.workspaces[sWorkspace].desks.length != 0 && workspaceStore.workspaces[sWorkspace].desks[0].categories.length != 0){
        for(let i = 0; i < workspaceStore.workspaces[sWorkspace].desks[sDesk].categories.length; i++){
            categorysArr.push(<div className="category" style={{background: workspaceStore.workspaces[sWorkspace].desks[0].categories[i].color}}>
            <div className="category_head">
                <div className="category_title">
                    <input type="text" name="" id="" value={workspaceStore.workspaces[sWorkspace].desks[sDesk].categories[i].title} 
                    style={{background: workspaceStore.workspaces[sWorkspace].desks[0].categories[i].color}}
                    onChange={(event) => {
                        workspaceStore.setCategoryTitle(sWorkspace,
                        sDesk ,i ,event.target.value)
                        }}/>
                </div>
                <div className="category_edit">
                <Dropdown overlay={dropdown(i)}>
                        <Space>
                            ···
                        </Space>
                </Dropdown>
                </div>
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
            <button className="add_category" onClick={async () => handleClickCategory(sWorkspace, sDesk, {id: Date.now(), title: "New category", tasks: [] , color: colors[Math.floor(Math.random() * colors.length)] })}>+ Добавить категорию</button>
        </div>
    )
});

export default Category
