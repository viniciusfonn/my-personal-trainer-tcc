import * as Dialog from '@radix-ui/react-dialog'
import {FileImage, X} from 'phosphor-react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import {useAppDispatch} from '../hooks/useAppDispatch'
import {useAppSelector} from '../hooks/useAppSelector'
import {setUserProfileData} from '../store/user/user-reducer'
import {api} from '../utils/api'
import {Button, BUTTON_ENUM} from './Button'
import {ImageProfile} from './ImageProfile'
import {Input} from './Input'

type FormSchema = {
	image: FileList
}


export const ChangeAvatarDialog = () => {

	const {register, handleSubmit} = useForm<FormSchema>()
	const {token, user} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const onSubmit = async (data: FormSchema) => {
		const file = data.image[0]
		const formData = new FormData()

		formData.append('avatar', file)

		try {
			await api.patch('/users/avatar', formData, {
				headers: {
					"Content-Type": 'multipart/form-data',
					Authorization: `Bearer: ${token}`
				}
			})

			alert('Imagem atualizada! Pode demorar alguns minutos até ela ser exibida.')

		} catch (err: any) {
			alert(err.response.data.message)
		}

	}

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<ImageProfile />
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='inset-0 fixed w-screen h-screen bg-black/60' />
				<Dialog.Content className='fixed top-1/2 left-1/2 z-[100] bg-gray-default text-white -translate-x-1/2 -translate-y-1/2 w-10/12 max-w-[600px] p-8 rounded-xl flex flex-col gap-4'>

					<Dialog.Close><X size={24} className='text-gray-lighter hover:text-white transition-colors' /></Dialog.Close>
					<Dialog.Title className='text-xl'>Mudar imagem do avatar</Dialog.Title>
					<Dialog.Description className='text-gray-hard'>Selecione uma imagem do seu sistema de arquivos para servir como sua nova foto de perfil.</Dialog.Description>
					<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-start' >
						<Input register={register} name="image" type={'file'}><FileImage className='text-white' size={24} /></Input>
						<Button>Alterar</Button>
					</form>
				</Dialog.Content>

			</Dialog.Portal>

		</Dialog.Root>
	)

}
