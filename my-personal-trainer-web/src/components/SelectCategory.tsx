import {SelectHTMLAttributes, useCallback, useEffect, useRef, useState} from "react"
import {api} from "../utils/api"

type Select = {
	register: any
} & SelectHTMLAttributes<HTMLSelectElement>

type Category = {
	id: string,
	category: string
}

export const SelectCategory: React.FC<Select> = ({register, ...rest}) => {

	const [categories, setCategories] = useState<Category[]>([])
	const [defaultValue, setDefaultVaue] = useState('')

	const getCategories = useCallback(() => {
		api.get('/categories').then(response => setCategories(response.data))
	}, [])

	useEffect(() => {
		getCategories()
	}, [getCategories])

	if (categories.length === 0) {
		return (
			<select className="bg-gray-dark rounded-xl p-4 text-white placeholder:text-gray-hard">
				<option value="">Carregando...</option>
			</select>

		)
	}


	return (
		<select {...register(rest.name)} {...rest} className="bg-gray-dark rounded-xl p-4 text-white placeholder:text-gray-hard">
			{categories.map(category => <option key={category.id} value={category.id}>{category.category}</option>)}
		</select>
	)
}
