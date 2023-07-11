import Logo from '@public/logo.png'
import Template from '@public/bg-login.jpg'
import Image from 'next/image'
import {Input} from '@components/Input'
import {EnvelopeSimple, LockSimple, SignOut} from 'phosphor-react'
import {Button} from '@components/Button'
import Link from 'next/link'
import {z} from 'zod'
import {SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {api} from '../utils/api'
import {useCallback} from 'react'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {setCurrentUser} from '../store/user/user-reducer'
import {useAppSelector} from '../hooks/useAppSelector'
import {useRouter} from 'next/router'


const formSchema = z.object({
	email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
	password: z.string().min(1, "Senha é obrigatória").min(6, "Senha precisa ter mais de 6 caracteres.")
})

type FormSchemaType = z.infer<typeof formSchema>


export const SignIn = () => {

	const {register, handleSubmit, formState: {errors}} = useForm<FormSchemaType>({resolver: zodResolver(formSchema)})
	const dispatch = useAppDispatch()
	const router = useRouter()

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		try {
			const {user, token} = await signInRequest(data)
			dispatch(setCurrentUser({token, user, id: user.id}))
			router.push('/')
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	const signInRequest = useCallback(
		async (data: FormSchemaType) => {
			const response = await api.post('/sessions/provider', data)
			return response.data
		}
		, [])

	return (
		<main className="grid-cols-12 grid h-screen">
			<Image src={Template} alt="template-image" className="col-span-7 bg-blue-600 h-full object-cover grayscale" />

			<section className="col-span-5 h-full flex flex-col items-center gap-16 justify-center">

				<Image src={Logo} alt="Logo image" width={220} />

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<h1 className='text-center text-white text-3xl mb-6 font-bold'>Faça seu Login</h1>
					<Input type={"email"} register={register} name="email" id="email" placeholder='E-mail'><EnvelopeSimple className='text-gray-hard' size={24} /></Input>
					{errors.email && (
						<span className="text-red-600">{errors.email?.message}</span>
					)}
					<Input type="password" register={register} name="password" id="password" placeholder='Senha'><LockSimple className='text-gray-hard' size={24} /></Input>
					{errors.password && (
						<span className="text-red-600">{errors.password?.message}</span>
					)}
					<Button type="submit">Entrar</Button>
					<Link href={'/forgot-password'} className="text-center underline text-white hover:text-gray-lighter transition-colors">Esqueci minha senha</Link>
				</form>

				<Link href={'/sign-up'} className='text-red-light hover:text-red-default transition-colors cursor-pointer flex gap-2 underline hover'> <SignOut size={24} /> Criar minha conta</Link>
			</section>
		</main>
	)
}

export default SignIn

