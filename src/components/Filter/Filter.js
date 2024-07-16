import { Dropdown } from 'react-bootstrap';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Filter.css';

export default function Filter({ handleFilter }) {
    const filterArray = [
        { name: "Popular", text: "Ən populyarlar" },
        { name: "CheapFirst", text: "Əvvəlcə ucuz" },
        { name: "ExpensiveFirst", text: "Əvvəlcə baha" },
        { name: "NewDateFirst", text: "Əvvəlcə yenilər" },
        { name: "OldDateFirst", text: "Əvvəlcə köhnələr" },
        { name: "Free", text: "Pulsuz kurslar" },
    ];

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle className='dropdown-filter' id="dropdown-basic-filter">
                    <FontAwesomeIcon icon={faFilter} className='me-2' /> Filter
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown-menu-filter'>
                    {filterArray.map((filter, index) => (
                        <Dropdown.Item onClick={() => handleFilter(filter.name)} key={index} className='mb-2 d-flex' value={filter.name}><p className='dropdown-menu-span'></p>{filter.text}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}