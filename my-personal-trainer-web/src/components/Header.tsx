import Logo from '@public/logo.png'
import Image from 'next/image'
import {Power} from 'phosphor-react'
import {ProfileLink} from './ProfileLink'
import {SignOutAlert} from './SignOutAlert'

export const Header: React.FC = () => {

	return (
		<header className="bg-gray-dark py-6 px-36 flex justify-between items-center">
			<div className='flex gap-12 items-center'>
				<Image src={Logo} alt="Logo" width={120} height={120} />
				<ProfileLink />
			</div>
			<div>
				<SignOutAlert>
					<Power size={24} className="text-white hover:text-gray-lighter cursor-pointer" />
				</SignOutAlert>

			</div>
		</header>
	)

}
