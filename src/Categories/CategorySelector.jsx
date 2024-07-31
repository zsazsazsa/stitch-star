import { useEffect, useState } from "react"
import { getAllCategories } from "../Services/CategoryService"

export const CategorySelector = ({handleCategory, initialValue}) => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(initialValue)

    useEffect(() => {
        getAllCategories().then((data) => {
            setCategories(data)
        })
    }, [])

    useEffect(() => {
        setSelectedCategory(initialValue)
    }, [initialValue])

    return (
        <>
        <select value={selectedCategory} onChange={handleCategory}>
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