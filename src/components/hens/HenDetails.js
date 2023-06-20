import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const HenDetails = () => {
    const { henId } = useParams()
    const [hen, setHen] = useState({})
    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/hens?_expand=breed&_expand=layingStatuses&id=${henId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleHen = data[0]
                    setHen(singleHen)
                })
        },
        [henId]
    )

    const deleteButton = () => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/hens/${henId}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate("/hens")
                })
        }} className="hen__delete">Delete Hen</button>
    }

    return <>

        <section className="henCard" key={(`hen--${hen.id}`)}>
            <header className="henCard__header">{hen.name}</header>
            <div>Breed: {hen?.breed?.name}</div>
            <div>Date Hatched: {hen.dateHatched}</div>
            <div>Laying Status: {hen?.layingStatuses?.status}</div>
            <div>Behavioral Notes: {hen.notes}</div>
        </section>
        <footer className="hen__footer">
            {
                <button onClick={() => navigate(`/profile/edit/${henId}`)} >Edit Hen</button>
            }
            {
                deleteButton()
            }
        </footer>

    </>
}