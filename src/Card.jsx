import { useEffect, useState } from "react"

const Card = ({ url }) => {
    const [data, setData] = useState({})
    let [img, setImg] = useState('')
    const [pokeType, setPoketype] = useState('')
    const [moves, setMoves] = useState([])

    function capitalize(word) {
        if(!word){
            let firstletter = ''
            return firstletter.toUpperCase() + word.slice(1)
        }else{ 
            let firstletter = word[0]
            return firstletter.toUpperCase() + word.slice(1)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const result = await res.json();
            setData(result)
            setImg(result.sprites.other["official-artwork"].front_default)
            setPoketype(result.types[0].type.name)
            setMoves(() => result.moves.map((moves, i) => {
                if (i >= 50) {
                    return
                } else {
                    return moves.move.name
                }
            }).filter(e => e))
        }
        fetchData()
    }, [])
    return (
        <div className='card'>
            <div className="img-base"><img src={img} alt="img" className="img" /></div>
            <div className="details">
                <h1>{data?.name}</h1>
                <p> <strong>Poke Type : </strong> <span className="pokeDetails"> {capitalize(pokeType)} type pokemon</span> </p>
                <p> <strong>Height : </strong> <span className="pokeDetails"> {data.height / 10} m</span> </p>
                <p> <strong>Weight : </strong> <span className="pokeDatails"> {data.weight / 10} kg</span> </p>
                <p> <strong>Moves : </strong> <span className="pokeDetails"> {moves.join(', ')} </span></p>
            </div>
        </div>
    )
}


export default Card