import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/esm/Button';

function TopRow({ notLatePlanes, latePlanes, totalPlanes, setIsOpen, sortByTown, sortByTownUp, sortByNotLate, sortByLate}) {

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="m-2">
                        <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)} >Add New Plane</button>
                    </div>
                    <div className="m-2">
                        <DropdownButton id="dropdown-basic-button" title="Sorting Options">
                            <Dropdown.Item>Sort by Town : <Button className="m-1" onClick={() => sortByTown()}>Down</Button><Button className="m-1" onClick={() => sortByTownUp()}>Up</Button></Dropdown.Item>
                            <Dropdown.Item>Sort by status : <Button className="m-1" onClick={() => sortByLate()}>Late</Button><Button className="m-1" onClick={() => sortByNotLate()}>Not Late</Button></Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="m-2">
                        <DropdownButton id="dropdown-basic-button" title="Statistics">
                            <Dropdown.Item>Total Planes : {totalPlanes} </Dropdown.Item>
                            <Dropdown.Item>Late Planes : {latePlanes}</Dropdown.Item>
                            <Dropdown.Item>Not Late Planes : {notLatePlanes}</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="m-2">
                        <DropdownButton id="dropdown-basic-button" title="View Options">
                            <Dropdown.Item href="/table">Table</Dropdown.Item>
                            <Dropdown.Item href="/grid">Grid</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TopRow;