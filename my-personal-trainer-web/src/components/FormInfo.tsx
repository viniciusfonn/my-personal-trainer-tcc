import {Input} from './Input'
import {Button} from './Button'
import {EnvelopeSimple, LockSimple, User} from 'phosphor-react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {api} from '../utils/api'
import {useAppSelector} from '../hooks/useAppSelector'
import {setUserProfileData} from '../store/user/user-reducer'
import {useAppDispatch} from '../hooks/useAppDispatch'

type FormInfo = {
	userData: {
		name?: string
		email?: string
	}
}

const formSchema = z.object({
	name: z.string().min(3, 'O nome é obrigatório'),
	email: z.string().email('Email inválido').min(5, 'O email é obrigatório'),
	old_password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
	password_confirmation: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
}).refine(data => data.password === data.password_confirmation, {
	message: 'As senhas devem ser iguais',
	path: ['password_confirmation']
})

type FormSchema = z.infer<typeof formSchema>

export const FormInfo: React.FC<FormInfo> = ({userData}) => {

	const {register, handleSubmit, formState: {errors}} = useForm<FormSchema>({
		defaultValues: userData,
		resolver: zodResolver(formSchema)
	})

	const {token, user} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<FormSchema> = async (data) => {
		try {
			await api.put('/profile', data, {
				headers: {
					Authorization: `Bearer: ${token}`
				}
			})

			const newUser = {
				...user,
				name: data.name,
				email: data.email
			}

			dispatch(setUserProfileData(newUser))
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	return (
		<>
			<h1 className="mb-8 text-2xl text-white font-bold text-center">Alterar informações</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-[400px] flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<Input register={register} name="name" placeholder="Nome" type={'text'}><User size={24} className="text-gray-hard" /></Input>
					{errors.name ? (
						<span className='text-red-600'>{errors.name.message}</span>
					) : null}

					<Input register={register} name="email" placeholder="Email" type={'email'}><EnvelopeSimple size={24} className="text-gray-hard" /></Input>
					{errors.email ? (
						<span className='text-red-600'>{errors.email.message}</span>
					) : null}

				</div>
				<div className="flex flex-col gap-2">
					<Input register={register} name="old_password" placeholder="Senha" type={"password"}><LockSimple size={24} className="text-gray-hard" /></Input>
					{errors.old_password ? (
						<span className='text-red-600'>{errors.old_password.message}</span>
					) : null}
					<Input register={register} name="password" placeholder="Nova Senha" type={"password"}><LockSimple size={24} className="text-gray-hard" /></Input>
					{errors.password ? (
						<span className='text-red-600'>{errors.password.message}</span>
					) : null
					}
					<Input register={register} name="password_confirmation" placeholder="Confirmar Senha" type={"password"}><LockSimple size={24} className="text-gray-hard" /></Input>
					{errors.password_confirmation ? (
						<span className='text-red-600'>{errors.password_confirmation.message}</span>
					) : null
					}
				</div>
				<Button type='submit'>Salvar</Button>
			</form>

		</>
	)
}
