import {Button} from '@components/Button'
import {Input} from '@components/Input'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/router'
import {Key, LockSimple} from 'phosphor-react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import {api} from '../utils/api'

type TokenPasswordRecoverForm = {
	setForm(value: number): void
}

const formSchema = z.object({
	token: z.string().uuid('Token inválido').min(1, 'Insira o token'),
	password: z.string().min(6, 'A senha deve ter no mínimo seis caracteres.'),
	password_confirmation: z.string().min(6, 'A confirmação da senha deve ter no mínimo seis caracteres')
}).refine(data => data.password === data.password_confirmation, {
	message: "As senhas devem ser iguais",
	path: ['password_confirmation']
})

type FormSchema = z.infer<typeof formSchema>


export const TokenPasswordRecoverForm: React.FC<TokenPasswordRecoverForm> = ({setForm}) => {

	const {register, handleSubmit, formState: {errors}} = useForm<FormSchema>({
		resolver: zodResolver(formSchema)
	})
	const router = useRouter()

	const onSubmit: SubmitHandler<FormSchema> = async (data) => {
		console.log(data.password_confirmation)
		try {
			await api.patch('/password/reset', data)
			router.push('/sign-in')

		} catch (err: any) {
			alert(err.response.data.message)
			console.log(err.response.data.message)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-default p-4 rounded-lg w-10/12 max-w-[600px] flex flex-col gap-4">
			<h1 className="text-white text-2xl font-semibold">Insira o token enviado e atualize a senha.</h1>
			<h2 className="text-gray-hard">Informe a nova senha desejada e a sua confirmação e o token para conseguir acessar a sua conta.</h2>
			<Input register={register} name="token" placeholder='Insira o token'> <Key className='text-gray-hard' size={24} />  </Input>
			{errors.token ?
				<span className='text-red-600'>{errors.token.message}</span>
				: null
			}
			<Input register={register} name="password" placeholder='Insira a senha'> <LockSimple className='text-gray-hard' size={24} />  </Input>
			{errors.password ?
				<span className='text-red-600'>{errors.password.message}</span>
				: null
			}
			<Input register={register} name="password_confirmation" placeholder='Insira a confirmação de senha'> <LockSimple className='text-gray-hard' size={24} />  </Input>
			{errors.password_confirmation ?
				<span className='text-red-600'>{errors.password_confirmation.message}</span>
				: null
			}
			<h2 className="text-gray-hard">Não recebeu o token? clique no botão abaixo para enviar novamente.</h2>
			<span className='text-white underline cursor-pointer hover:text-gray-lighter' onClick={() => setForm(0)}>Enviar novamente</span>
			<Button type="submit">Enviar</Button>
		</form>

	)

}
