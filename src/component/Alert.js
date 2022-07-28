import React, {useContext} from 'react';
import notecontex from '../contex/notes/notecontex';
const Alert = (props) => {
    const contex = useContext(notecontex);
    const {alerts} = contex;
    return (
        <div className={`alert alert-${alerts.warning}`} role="alert">
            {alerts.message}
        </div>
    )
}
export default Alert;