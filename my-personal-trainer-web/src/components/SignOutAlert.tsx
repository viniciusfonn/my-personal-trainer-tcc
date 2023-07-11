import * as AlertDialog from "@radix-ui/react-alert-dialog"
import {useRouter} from "next/router"
import {useAppDispatch} from "../hooks/useAppDispatch"
import {setCurrentUser} from "../store/user/user-reducer"
import {Button, BUTTON_ENUM} from "./Button"

type SignOutAlert = {
	children: React.ReactNode
}

export const SignOutAlert: React.FC<SignOutAlert> = ({children}) => {

	const dispatch = useAppDispatch()
	const router = useRouter()

	const signOut = () => {
		dispatch(setCurrentUser({token: null, user: null, id: null}))
	}

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger className="w-full">
				{children}
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 w-screen h-screen bg-black/60" />
				<AlertDialog.Content className="bg-gray-default flex flex-col gap-4 p-6 text-white rounded-xl w-[500px] max-h-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<AlertDialog.Title className="text-xl">Tem certeza que deseja sair?</AlertDialog.Title>
					<AlertDialog.Description className="text-gray-hard">Ao confirmar, você será redirecionado para a tela de login e terá que se autenticar novamente.</AlertDialog.Description>
					<div className="flex gap-4 mt-8">
						<AlertDialog.Cancel className="flex-1">
							<Button buttonType={BUTTON_ENUM.GRAY}>Cancelar</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action className="flex-1" onClick={signOut}>
							<Button>Confirmar</Button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}
