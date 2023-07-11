import {ButtonHTMLAttributes} from "react"

export enum BUTTON_ENUM {
	DEFAULT = 'DEFAULT',
	GRAY = 'GRAY'
}

type Button = {
	children: React.ReactNode
	buttonType?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Button> = ({children, buttonType, ...rest}) => {
	return (
		<button {...rest} className={`w-full ${buttonType === BUTTON_ENUM.GRAY ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-default hover:bg-red-dark'} grayscale-0 rounded-xl text-white transition-colors p-4`}>
			{children}
		</button>
	)
}
