import Image from 'next/image'
import PersonalTrainer from '@public/personal-trainer.jpg'
import {useAppSelector} from '../hooks/useAppSelector'

export const ImageProfile: React.FC = () => {

	const userAvatar = useAppSelector(state => state.user.user?.avatar)

	const imageToRender = userAvatar ? `https://my-personal-trainer-api.up.railway.app/files/${userAvatar}` : PersonalTrainer

	return (
		<div className="w-[120px] h-[120px] relative mb-8 cursor-pointer group">
			<span className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 group-hover:block hidden -translate-y-1/2 text-white text-center'>Mudar avatar</span>
			<Image src={imageToRender} height={200} width={200} alt="User profile picture" className="rounded-full group-hover:brightness-50 w-full h-full object-cover" />
		</div>
	)
}
