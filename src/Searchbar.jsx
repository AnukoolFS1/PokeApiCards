import {useState, useEffect} from 'react'
const SearchBar = ({pokemons, data, setData}) => {
    const [search, setSearch] = useState('');


    const searchBar = (e) => {
        setSearch(new RegExp(`${(e.target.value).toLowerCase()}`));
        if(e.target.value.length === 0){
            setData(pokemons)
        }
    }

    const submitSearch = () => {
        setData(() => {
            return pokemons.filter(e => {
                return search.test(e.name)
            })
        })
    }

    return (
        <div className='searchBase'>
            <input type="text" className='search' onChange={searchBar} />
            <button onClick={submitSearch} className='button'>Search</button>
        </div>
    )
}

export default SearchBar