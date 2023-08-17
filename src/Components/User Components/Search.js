import React, { useContext } from 'react'
import SearchItem from './SearchItem'
import ProductContext from '../../Context/Products/ProductContext'

const Search = (props) => {
    const context = useContext(ProductContext);
    const {query, showAlert} = context;

    return (
        <>
            <SearchItem showAlert={showAlert} query={query} />
        </>
    )
}

export default Search