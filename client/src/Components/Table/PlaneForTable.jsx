import * as React from 'react';

function PlaneForTable(props) {

    return (
            <tr>
                <td>{props.data.id}</td>
                <td>{props.data.from_town}</td>
                <td>{props.data.arrival_time}</td>
                <td>{props.data.is_late === 1 ? "Yes" : "No"}</td>
                <td>{props.data.airline}</td>
                <td>
                <button type="button" className="btn btn-light" onClick={() => props.delete(props.data.id)}>Delete</button>
                <button type="button" className="btn btn-warning" onClick={()=>props.showModal(props.data.id)}>Edit</button>
                </td>
            </tr>
    )
}
export default PlaneForTable;