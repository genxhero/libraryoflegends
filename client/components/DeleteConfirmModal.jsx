import React from 'react';

const DeleteConfirmModal = prop => {
    return (
        <div className="confirmation-modal">
            <div className="confirmation-dialog">
                <h1>Confirm Deletion</h1>
                <h3>Are you sure you want to delete {char.firstName} {char.lastName}???</h3>
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                    <button className="confirm-btn" onClick={props.delete} value={char.id}>Yes</button>
                    <button className="confirm-btn" onClick={props.closeConfirmationModal}>No</button>
                </div>
            </div>
        </div> 
    )
}

export default DeleteConfirmModal;