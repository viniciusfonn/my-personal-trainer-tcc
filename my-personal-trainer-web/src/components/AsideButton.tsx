type AsideButton = {
	children: React.ReactNode
	text: string
	formControl?: {
		setForm: (value: number) => void
		formToSelect: number
		selectedForm: number
	}
}

export const AsideButton: React.FC<AsideButton> = ({children, text, formControl}) => {
	return (
		<div onClick={() => formControl?.setForm(formControl.formToSelect)} className={`w-full p-4 flex hover:bg-gray-default ${formControl?.formToSelect === formControl?.selectedForm && formControl !== undefined ? 'bg-gray-default' : ''} transition-colors text-white items-center gap-4 cursor-pointer text-sm`} >
			{children}
			<span>{text}</span>
		</div >
	)
}
