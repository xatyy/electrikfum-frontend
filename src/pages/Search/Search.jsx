import React from 'react'
import SearchProducts from "../../components/SearchProducts/SearchProducts"

const Search = () => {
    const [query] = new URLSearchParams(window.location.search);
    let search;
    if(query){
    search = query[1] ?? 0;
    }
    return(
        <div className="products">
            <SearchProducts search={search}/>
        </div>
    )
}

export default Search;