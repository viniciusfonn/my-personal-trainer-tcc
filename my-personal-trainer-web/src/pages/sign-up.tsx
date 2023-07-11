import Image from 'next/image'
import Link from 'next/link'
import {Input} from '@components/Input'
import {Button} from '@components/Button'
import Template from '../../public/bg-sign-up.jpg'
import Logo from '../../public/logo.png'
import {ArrowLeft, EnvelopeSimple, LockSimple, User} from 'phosphor-react'
import {SelectCategory} from '@components/SelectCategory'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {api} from '../utils/api'
import {useRouter} from 'next/router'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {setCurrentUser} from '../store/user/user-reducer'

const formSchema = z.object({
	name: z.string().min(3, 'O nome é obrigatório'),
	email: z.string().email('Email inválido').min(5, 'O email é obrigatório'),
	password: z.string().min(1, 'A senha é obrigatória').min(6, 'A senha precisa de no mínimo 6 caracteres.'),
	category: z.string().uuid('Selecione uma categoria').min(1, 'É obrigatório selecionar uma categoria')
})

type FormSchemaType = z.infer<typeof formSchema>

export const SignUp = () => {

	const {register, handleSubmit, formState: {errors}} = useForm<FormSchemaType>({resolver: zodResolver(formSchema)})
	const router = useRouter()
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
		try {
			const response = await api.post('/providers', {
				name: data.name,
				email: data.email,
				password: data.password,
				category_id: data.category
			})
			const {token, user} = response.data
			dispatch(setCurrentUser({token, user}))
			router.push('/sign-in')
		} catch (err: any) {
			alert(err.response.data.message)
		}
	}

	return (
		<main className="grid-cols-12 grid h-screen">

			<section className="col-span-5 h-full flex flex-col items-center gap-16 justify-center">

				<Image src={Logo} alt="Logo image" width={220} />

				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
					<h1 className='text-center text-white text-3xl mb-6 font-bold'>Registre-se gratuitamente</h1>
					<Input required register={register} name="name" type="text" placeholder='Nome'><User className='text-gray-hard' size={24} /></Input>
					{errors.name ? (
						<span className='text-red-600'>{errors.name.message}</span>
					) : null}
					<Input required register={register} name="email" type={"email"} placeholder='E-mail'><EnvelopeSimple className='text-gray-hard' size={24} /></Input>
					{errors.email ? (
						<span className='text-red-600'>{errors.email.message}</span>
					) : null}
					<Input required register={register} name="password" type={"password"} placeholder='Senha'><LockSimple className='text-gray-hard' size={24} /></Input>
					{errors.password ? (
						<span className='text-red-600'>{errors.password.message}</span>
					) : null}
					<SelectCategory register={register} name="category" />
					{errors.category ? (
						<span className='text-red-600'>{errors.category.message}</span>
					) : null}
					<Button>Entrar</Button>
				</form>

				<Link href={'/'} className='text-white hover:text-gray-lighter transition-colors cursor-pointer flex gap-2 '> <ArrowLeft size={24} /> Voltar para o login</Link>
			</section>
			<Image src={Template} alt="template-image" className="col-span-7 bg-blue-600 h-full object-cover grayscale" />

		</main>

	)
}

export default SignUp
