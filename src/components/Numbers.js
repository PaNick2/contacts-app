import React from 'react'

function Numbers({ Number, i }) {
    return (
        <div>
            <div key={i}>
                {Number}
            </div>
        </div>


    )
}

export default Numbers
