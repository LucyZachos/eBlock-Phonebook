export default function AddPhonebook() {
    return (
        <div className="container">
            <h1 className="mainText">Add New Phonebook</h1>
            <div class="inputData">
                <input type="text" class="inputField" name="name" id="name" />
                <label for="name" class="inputLabel">Name</label>
            </div>

            <div className="buttonContainer">
                <button className="submitButton">SAVE</button>
                <button className="cancelButton">CANCEL</button>
            </div>
        </div>
    )
}