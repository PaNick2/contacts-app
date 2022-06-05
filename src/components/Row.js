import React from 'react'

const Row = (props) => {
    const { name, email, address, mobile, clickedRow } = props
    return (
        <div className="row" >
            <div className="cell" data-title="name">
                {name}
            </div>
            <div className="cell email-cell" data-title="email" onClick={(event) => clickedRow(event.target.innerHTML)}>
                {email}
            </div>
            <div className="cell" data-title="address">
                {address}
            </div>
            <div className="cell mobile-cell" data-title="mobile">
                {mobile != null ? mobile[0] ? mobile.join(" \n ") : mobile : "Its null"}
            </div>
        </div>
    )
}

export default Row;
