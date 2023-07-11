import Image from 'next/image'
import {Clock} from 'phosphor-react'
import User from '@public/pngwing.com.png'
import {addHours, format, parseISO} from 'date-fns'

type Customer = {
	nextCustomer?: boolean
	date: string
	customerData: {
		avatar: string | undefined,
		name: string
	}
}

export const Customer: React.FC<Customer> = ({nextCustomer, customerData, date}) => {


	const customerAvatar = customerData.avatar ? `https://my-personal-trainer-api.up.railway.app/files/${customerData.avatar}` : User
	const hour = format(addHours(parseISO(date), 3), 'HH:mm')

	return (
		<div className='flex items-center gap-4'>
			<Clock size={24} className="text-red-light" />
			<span className='text-white'>{hour}</span>

			<div className='bg-gray-light rounded-xl flex justify-between p-4 flex-1'>
				<div className='flex gap-4 items-center'>
					<div className='w-[50px] h-[50px]'>
						<Image src={customerAvatar} alt="User image" width={50} height={50} className="rounded-full w-full h-full object-cover" />
					</div>
					<span className='text-white text-lg'>{customerData.name}</span>
				</div>
			</div>

		</div >
	)
}
