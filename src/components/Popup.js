import { useState } from 'react';
import workspaceStore from "../data/stores/workspaceStore";

const handleClickWork = (item) => {
    console.log(item);
    workspaceStore.addWorkspace({id: item.id, img: item.img, title: item.title, desks: item.desks })
    workspaceStore.selectedWorkspace(item.id)
    workspaceStore.selectedDesk(-1)
}

const Popup = ({active, setActive}) => {

    const [imgValue, setImgValue] = useState('');
    const [titleValue, setTitleValue] = useState('');

    return(
        <div className={active ? "popup-bg active" : "popup-bg"} onClick={() => setActive(false)}>
            <div className="popup" onClick={e=>e.stopPropagation()}>
                <form action="">
                    <h3>Новая рабочая область</h3>
                    <input type="text" placeholder="Ссылка на картинку" value={imgValue} onChange={(event) => setImgValue(event.target.value)}/>
                    <input type="tel" placeholder="Название" value={titleValue} onChange={(event) => setTitleValue(event.target.value)}/>
                    <div className='button' 
                    onClick={() => {
                        handleClickWork({id: Date.now(), img: imgValue, title: titleValue, desks: []})
                        setActive(false)
                        setImgValue("")
                        setTitleValue("")
                    }}>Добавить</div>
                </form>
            </div>
        </div>
    )
}

export default Popup;
