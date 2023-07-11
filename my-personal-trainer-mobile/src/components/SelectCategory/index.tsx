import RNPickerSelect from 'react-native-picker-select'
import {StyleSheet} from 'react-native'
import {PickerStyles} from './styles'
import {useCallback, useContext, useEffect, useState} from 'react'
import {api} from '../../services/api'
import {AxiosResponse} from 'axios'

interface IPicker {
	onValueChange: (value: string) => void
}

interface IRequest {
	id: string
	category: string
}

interface ICategoryItem {
	label: string
	value: string
}

export const SelectCategory: React.FC<IPicker> = ({onValueChange}) => {

	const [categories, setCategories] = useState<ICategoryItem[]>([])

	const getCategories = useCallback(
		() => {
			api.get('/categories').then((response: AxiosResponse<IRequest[]>) => {
				const formatedCategories = response.data.map(category => {return {label: category.category, value: category.id} as ICategoryItem})
				setCategories(formatedCategories)
			})
		}, []
	)

	useEffect(() => {
		getCategories()
	}, [])

	return (
		<RNPickerSelect
			placeholder={{label: "Todos os treinadores", value: null}}
			onValueChange={onValueChange}
			items={categories}
			style={PickerStyles}

		/>
	)

}


