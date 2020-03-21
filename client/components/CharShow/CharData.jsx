import React from 'react'
const CharData = (props) => {
    return (
        <div style={{ "display": "flex", "flexDirection": "row" }}>
            <div className="char-show-fieldnames" style={{ "display": "flex", "flex-direction": "column", "align-items": "flex-end" }}>
                <span className="char-vital-fieldname">Player:{' '}</span>
                <span className="char-vital-fieldname">Class:{' '}</span>
                <span className="char-vital-fieldname">Level:{' '}</span>
            </div>

            <div className="char-show-data" style={{ "display": "flex", "flex-direction": "column", "justify-content": "flex-start" }}>
                <span className="char-vital"><Link to={`/users/${char.user.username}`}>{char.user.username}</Link> </span>
                <span className="be-capitalized char-vital">{char.class}</span>
                <span className="char-vital">{char.level}</span>
            </div>
        </div>
    )
}

export default CharData;