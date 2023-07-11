import {InputHTMLAttributes} from "react"
import {UseFormRegister} from "react-hook-form"

type Input = {
	children: React.ReactNode
	register: any
} & InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Input> = ({children, register, ...rest}) => {
	return (
		<fieldset className="rounded-xl bg-gray-dark p-4 flex items-center gap-6 w-full text-white">
			{children}
			<input {...rest} {...register(rest.name)} className="bg-transparent placeholder:text-gray-hard outline-none flex-1" />
		</fieldset>
	)
}
