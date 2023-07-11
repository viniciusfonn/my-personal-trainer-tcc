import {Button} from '@components/Button'
import {Input} from '@components/Input'
import {zodResolver} from '@hookform/resolvers/zod'
import {EnvelopeSimple} from 'phosphor-react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import {api} from '../utils/api'

const formSchema = z.object({
	email: z.string().email("Email inválido.").min(1, 'Esse campo é obrigatório')
})

type EmailPasswordRecoverForm = {
	setForm(value: number): void
}

type FormSchema = z.infer<typeof formSchema>

export const EmailPasswordRecoverForm: React.FC<EmailPasswordRecoverForm> = ({setForm}) => {

	const {register, handleSubmit, formState: {errors}} = useForm<FormSchema>({
		resolver: zodResolver(formSchema)
	})

	const onSubmit: SubmitHandler<FormSchema> = async ({email}) => {
		try {
			await api.post('/password/forgot', {email})
			setForm(1)
		} catch (err: any) {
			alert(err.response.data.message)
			console.log(err.response.data.message)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-default p-4 rounded-lg w-10/12 max-w-[600px] flex flex-col gap-4">
			<h1 className="text-white text-2xl font-semibold">Insira seu email</h1>
			<h2 className="text-gray-hard">Caso você possua uma conta com o email informado, você recebera em sua caixa postal um token para recuperar sua senha.</h2>
			<Input register={register} name="email" placeholder='Insira seu email'> <EnvelopeSimple className='text-gray-hard' size={24} />  </Input>
			{errors.email ?
				<span className='text-red-600'>{errors.email.message}</span>
				: null
			}
			<Button type="submit">Enviar</Button>
		</form>

	)

}
