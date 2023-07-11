import {useRouter} from "next/router";
import {JSXElementConstructor, ReactElement, ReactNode, useEffect, useState} from "react";
import {useAppSelector} from "../hooks/useAppSelector";

export const RouteGuard = ({children}: {
	children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}) => {

	const router = useRouter()
	const [authorized, setAuthorized] = useState(false)
	const {user, token} = useAppSelector(state => state.user)

	useEffect(() => {
		const authCheck = () => {
			if (!user || !token) {
				setAuthorized(false)
				router.push({pathname: '/sign-in'})
			} else {
				setAuthorized(true)
			}
		}

		authCheck()

		const preventAccess = () => setAuthorized(false)

		router.events.on('routeChangeStart', preventAccess)
		router.events.on('routeChangeComplete', authCheck)

		return () => {
			router.events.off('routeChangeStart', preventAccess)
			router.events.off('routeChangeComplete', authCheck)
		}


	}, [router, user, token, router.events])

	return authorized ? (
		children
	) : (
		<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">Carregando...</span>
	)

}
