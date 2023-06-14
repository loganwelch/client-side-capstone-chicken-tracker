import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Hens.css"

export const HenList = ({ }) => {
    const [hens, setHens] = useState([])
    const [filteredHens, setFiltered] = useState([])
    const [laying, setLaying] = useState(null)
    const navigate = useNavigate()

    const localPalaceUser = localStorage.getItem("palace_user")
    const palaceUserObject = JSON.parse(localPalaceUser)

    useEffect(
        () => {
            if (laying === true) {
                const layingHens = hens.filter(hen => hen.layingStatusesId === 1)
                setFiltered(layingHens)
            }
            else if (laying === false) {
                const nonLayingHens = hens.filter(hen => hen.layingStatusesId !== 1)
                setFiltered(nonLayingHens)
            }
            else {
                setFiltered(hens)
            }
        },
        [hens, laying]
    )

    // useEffect(
    //     () => {
    //         if (nonLaying) {
    //             const nonLayingHens = hens.filter(hen => hen.layingStatusesId === 2)
    //             setFiltered(nonLayingHens)
    //         }
    //         else {
    //             setFiltered(hens)
    //         }
    //     },
    //     [nonLaying]
    // )


    useEffect(
        () => {
            fetch(`http://localhost:8088/hens?_expand=breed`)
                .then(response => response.json())
                .then((henArray) => {
                    setHens(henArray)

                })
        },
        []
    )

    useEffect(
        () => {
            const myHens = hens.filter(hen => hen.userId === palaceUserObject.id)
            setFiltered(myHens)
        },
        [hens]
    )

    return <>
        <>
            <button onClick={() => { setLaying(true) }} >Laying Hens</button>
            <button onClick={() => { setLaying(false) }} >Non-Laying Hens</button>
            <button onClick={() => { setLaying(null) }} >All Hens</button>
            <button onClick={() => navigate("/hen/create")} >Add New Hen</button>
        </>
        <h2>List of Hens</h2>

        <article className="hens">
            {
                filteredHens.map(
                    (hen) => {
                        return <section className="hen" key={(`hen--${hen.id}`)}>
                            <div>
                                <Link to={`/hens/${hen.id}`}>{hen.name}</Link>
                            </div>
                            <footer>Breed: {hen?.breed?.name}</footer>
                        </section>
                    }
                )
            }

        </article>
    </>
}