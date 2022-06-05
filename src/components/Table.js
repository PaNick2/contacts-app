import React from 'react'
import Row from './Row';
import './Table.css';



function Table({ users }) {

    const rows = users.map((user, i) => {
        return (<Row
            key={i}
            name={users[i].name}
            email={users[i].email}
            address={users[i].address}
            mobile={users[i].mobile}
        />)
    })
    return (
        <div className='table-container'>
            <div div className="wrapper">

                <div className="table">

                    <div className="row header">
                        <div className="cell">
                            <b>Full Name</b>
                        </div>
                        <div className="cell">
                            <b>Email</b>
                        </div>
                        <div className="cell">
                            <b>Address</b>
                        </div>
                        <div className="cell">
                            <b>Mobile</b>
                        </div>
                    </div>
                    {rows}

                </div>

            </div>
        </div>
    )
}

export default Table;