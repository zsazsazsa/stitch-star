import { useEffect, useState } from "react"
import { getAllCategories } from "../Services/CategoryService"

export const CategorySelector = ({handleCategory}) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data)
        })
    }, [])

    return (
        <>
        <select key="1" onChange={handleCategory}>
            <option disabled selected>-</option>
            {categories.map(category => {
                return (
                    <>
                    <option 
                        key={category.id}
                        value={category.id}>{category.name}</option>
                    </>
                )
            })}
        </select>
        </>
    )
}