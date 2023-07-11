import Image from 'next/image'
import PersonalImage from '@public/personal-trainer.jpg'
import Link from 'next/link'
import {useAppSelector} from '../hooks/useAppSelector'

export const ProfileLink: React.FC = () => {

	const {user} = useAppSelector(state => state.user)

	const userAvatar = !user?.avatar ? PersonalImage : `https://my-personal-trainer-api.up.railway.app/files/${user?.avatar}`

	return (
		<Link href={'/profile'} className="flex gap-4 items-center">
			<div className='w-[60px] h-[60px]'>
				<Image src={userAvatar} alt="user profile photo" className="object-cover w-full h-full rounded-full" width={120} height={120} />
			</div>
			<div className="flex flex-col gap-2">
				<span className="text-gray-hard">Bem vindo,</span>
				<span className="text-red-light">{user?.name}</span>
			</div>
		</Link>
	)
}
