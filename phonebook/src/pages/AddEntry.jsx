import React, { useState } from 'react';

export default function AddEntry() {
    return (
        <div className="container">
            <h1 className="mainText">Add New Entry</h1>

            <div className="inputData">
                <div>
                    <input type="text" className="inputField" name="name" id="name"/>
                    <label for="name" className="inputLabel">Name</label>
                    </div>
                    <div>
                    <input type="text" className="inputField"/>
                    <label for="number" className="inputLabel">Number</label>
                </div>
            </div>

            <div className="buttonContainer">
                <button className="submitButton">SAVE</button>
                <button className="cancelButton">CANCEL</button>
            </div>
        </div>
    );
}
