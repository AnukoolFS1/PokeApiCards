import { useState, useEffect } from 'react';
import Card from './Card';
import SearchBar from './Searching.jsx';
import './style.css'

const App = () => {
    const [pokemons, setPokemons] = useState([])
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginations, setPaginations] = useState({display:[], paginators:[], multiPage:true})


    function pagination(x) {
        let setPage = (x - 1) * 20
        setPaginations((prev) => {
            let arr = [];
            for (let i = setPage; i < setPage + 20; i++) {
                if (pokemons[i] === undefined) {
                    break;
                }
                arr.push(
                    pokemons[i]
                )
            }
            return {...prev, display:arr}
        })
    }


    useEffect(() => {
        try {
            async function next(api) {
                if (!api.next) {
                    return setLoading(false)
                }

                const res = await fetch(api.next)
                const result = await res.json()
                setPokemons(prev => prev.concat(result.results))

                next(result)
            }

            async function fetchData() {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
                const result = await res.json();
                setPokemons(result.results)
                next(result)
                setPaginations(prev=>({...prev,display:result.results}))
            }
            fetchData()
        }
        catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        setData(pokemons)
        setPaginations(prev => {
            let arr = []
            for (let i = (Math.floor(pokemons.length / 20)) + 1; i > 0; i--) {
                arr.push(
                    <span
                        className='paginators'
                        key={i}
                        onClick={() => pagination(i)}
                    >
                        {i}
                    </span>
                )
            }
            return {...prev, paginators:arr.reverse()}
        })

    }, [pokemons])


    return (
        <div>
            <button className='view' onClick={()=>setPaginations(prev=>({...prev, multiPage:!prev.multiPage}))}>{paginations.multiPage?'single page view':'multipage view'}</button>
            <SearchBar pokemons={pokemons} loading={loading} setData={setData} setPage={setPaginations} />
            <div className='base-card'>
                {
                    paginations.multiPage ?
                        paginations.display.map(pokemon => {
                            return <Card key={pokemon.url} url={pokemon.url} />
                        })
                        :
                        data.length>0?data.map(pokemon => {
                            return (
                                <Card key={pokemon.url} url={pokemon.url} />
                            )
                        }) : <h1 style={{color:'red'}} className='noPokemon'>Whoops! the Pokeball is empty.</h1>
                }
            </div>
            {paginations.multiPage && paginations.paginators}

        </div>
    )
}

export default App