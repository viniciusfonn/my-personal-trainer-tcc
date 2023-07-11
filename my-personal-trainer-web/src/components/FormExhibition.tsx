import {Input} from './Input'
import {Button} from './Button'
import {Clock} from 'phosphor-react'
import {SelectCategory} from './SelectCategory'
import {SubmitHandler, useForm} from 'react-hook-form'
import {api} from '../utils/api'
import {useAppSelector} from '../hooks/useAppSelector'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {setUserProfileData} from "../store/user/user-reducer"
import {useEffect} from 'react'

type FormSchema = {
	description?: string,
	category_id?: string,
	startHour?: string | number,
	endHour?: string | number
}

type RequestData = {
	[key: string]: string | number
}

type FormExhibition = {
	profileData: {
		description?: string
		endHour?: number
		startHour?: number
		category_id?: string
	}

}

export const FormExhibition: React.FC<FormExhibition> = ({profileData}) => {

	const {register, handleSubmit, setValue} = useForm({
		defaultValues: profileData
	})
	const {token, user} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<FormSchema> = async (data) => {

		const requestData: RequestData = {}

		if (data.startHour && data.endHour) {
			if (Number(data.startHour) < 6 || Number(data.endHour) > 21) {
				alert('Selecione um horário entre 06:00 e 21:00')
				return
			}

			if (Number(data.startHour) >= Number(data.endHour)) {
				alert('A data de início não pode ser maior que a data de fim.')
				return
			}

		}

		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'string') {
				if (value.trim() !== "") {
					requestData[key] = value
				}
			}

		}

		try {
			await api.put('/providers', requestData, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})

			const newUser = {
				...user,
				ProviderInfo: {
					...user?.ProviderInfo,
					...data
				}
			}

			console.log(newUser)

			dispatch(setUserProfileData(newUser))

			alert('Dados atualizados!')
		} catch (err: any) {
			alert(err.response.data.message)
		}

	}

	return (
		<>
			<h1 className="mb-8 text-2xl text-white font-bold text-center">Alterar informações</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] flex flex-col gap-6">
				<textarea id="description" {...register('description')} cols={30} rows={10} placeholder="Descrição" className="bg-gray-dark rounded-xl placeholder:text-gray-hard p-4 box-border text-white outline-none"></textarea>
				<SelectCategory defaultValue={profileData.category_id} register={register} name="category_id" />
				<Input placeholder='Hora de início' name='startHour' register={register} type={'number'}><Clock size={24} className="text-gray-hard" /></Input>
				<Input placeholder='Hora de término' name='endHour' register={register} type={'number'}><Clock size={24} className="text-gray-hard" /></Input>
				<Button>Salvar</Button>
			</form>

		</>
	)
}
