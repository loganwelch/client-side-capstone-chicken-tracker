import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const HenForm = () => {
    const [hen, update] = useState({
        userId: 0,
        breedId: 0,
        name: "",
        dateHatched: "",
        layingStatusesId: 0,
        notes: ""
    })

    const navigate = useNavigate()
    const [breeds, setBreeds] = useState([])
    const [layingStatuses, setLayingStatuses] = useState([])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const henToSendToAPI = {
            userId: hen.userId,
            breedId: hen.breedId,
            name: hen.name,
            dateHatched: hen.dateHatched,
            layingStatusesId: hen.layingStatusesId,
            notes: hen.notes
        }

        if (hen.userId !== 0 && hen.breedId !== 0 && hen.name !== "" && hen.dateHatched !== "" && hen.layingStatusesId !== 0) {
            return fetch(`http://localhost:8088/hens`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(henToSendToAPI)
            })
                .then(response => response.json())
                .then(() => {
                    navigate("/hens")
                })
        }
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/breeds`)
                .then(response => response.json())
                .then((hensArray) => {
                    setBreeds(hensArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/layingStatuses`)
                .then(response => response.json())
                .then((chickensArray) => {
                    setLayingStatuses(chickensArray)
                })
        },
        []
    )

    return (
        <form className="henForm">
            <h2 className="henForm__title">New Hen Addition</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What is the name of your new chicken?"
                        value={hen.name}
                        onChange={
                            (evt) => {
                                const copy = { ...hen }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Breed:</label>
                    <select
                        required autoFocus
                        className="form-control"
                        placeholder="Type of Breed"
                        value={hen.breedId}
                        onChange={
                            (evt) => {
                                const copy = { ...hen }
                                copy.breedId = evt.target.value
                                update(copy)
                            }
                        }>
                        <option value="" defaultValue>Select Breed Type</option>
                        {breeds.map(item => (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Date Hatched:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="When did this hen hatch?"
                        value={hen.dateHatched}
                        onChange={
                            (evt) => {
                                const copy = { ...hen }
                                copy.dateHatched = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Laying Status:</label>
                    <select
                        required autoFocus
                        className="form-control"
                        placeholder="Laying Status"
                        value={hen.layingStatusesId}
                        onChange={
                            (evt) => {
                                const copy = { ...hen }
                                copy.layingStatusesId = evt.target.value
                                update(copy)
                            }
                        }>
                        <option value="" defaultValue>Select Laying Status</option>
                        {layingStatuses.map(item => (
                            <option value={item.id} key={item.id}>{item.status}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Behavioral Notes:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Notate any behavorial comments or special needs/concerns"
                        value={hen.notes}
                        onChange={
                            (evt) => {
                                const copy = { ...hen }
                                copy.notes = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save New Hen
            </button>
        </form>
    )
}