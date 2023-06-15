import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const HenDetails = () => {
    const { henId } = useParams()
    const [hen, updateHen] = useState({})


    useEffect(
        () => {
            fetch(`http://localhost:8088/hens?_expand=breed&_expand=layingStatuses&id=${henId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleHen = data[0]
                    updateHen(singleHen)
                })
        },
        [henId]
    )


    return <section className="henCard" key={(`hen--${hen.id}`)}>
        <header className="henCard__header">{hen.name}</header>
        <div>Breed: {hen?.breed?.name}</div>
        <div>Date Hatched: {hen.dateHatched}</div>
        <div>Laying Status: {hen?.layingStatuses?.status}</div>
        <div>Behavioral Notes: {hen.notes}</div>
    </section>
}