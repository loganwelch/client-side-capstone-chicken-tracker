import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const HenDetails = () => {
    const { henId } = useParams()
    const [hen, updateHen] = useState({})
    // const [hens, setHens] = useState([])
    // const [filteredHens, setFiltered] = useState([])

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
    // http://localhost:8088/hens?_expand=breed&id=${henId}
    //http://localhost:8088/hens?_expand=breed&_expand=layingStatuse&id=${henId}

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/hens?_expand=breed`)
    //             .then(response => response.json())
    //             .then((henArray) => {
    //                 setHens(henArray)

    //             })
    //     },
    //     []
    // )

    return <section className="henCard" key={(`hen--${hen.id}`)}>
        <header className="henCard__header">{hen.name}</header>
        <div>Breed: {hen?.breed?.name}</div>
        <div>Date Hatched: {hen.dateHatched}</div>
        <div>Laying Status: {hen?.layingStatuses?.status}</div>
        <div>Behavioral Notes: {hen.notes}</div>
    </section>
}