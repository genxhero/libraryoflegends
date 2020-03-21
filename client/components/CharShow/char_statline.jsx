import React from 'react';

const CharStatLine = props => {
    return (
        <div className="char-statline">
            <h2 style={{ "fontFamily": "sans-serif" }}>Ability Scores</h2>
            <div style={{ "display": "flex", "fontSize": "larger" }}>

                <div className="char-show-fieldnames" style={{ "display": "flex", "flex-direction": "column", "align-items": "flex-end" }}>
                    <span className="char-vital-fieldname">STR:</span>
                    <span className="char-vital-fieldname">DEX:</span>
                    <span className="char-vital-fieldname">CON:</span>
                    <span className="char-vital-fieldname">INT:</span>
                    <span className="char-vital-fieldname">WIS:</span>
                    <span className="char-vital-fieldname">CHA:</span>
                </div>
                <div className="char-show-data" style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-start" }}>
                    <span className="char-vital">{char.statline.strength}</span>
                    <span className="char-vital">{char.statline.dexterity}</span>
                    <span className="char-vital">{char.statline.constitution}</span>
                    <span className="char-vital">{char.statline.intelligence} </span>
                    <span className="char-vital">{char.statline.wisdom}</span>
                    <span className="char-vital">{char.statline.charisma}</span>
                </div>
            </div>
        </div>
    )
}

export default CharStatLine;