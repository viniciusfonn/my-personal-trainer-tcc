import {ArrowLeft, IdentificationCard, SignOut, User} from "phosphor-react"
import PersonalTrainer from '@public/personal-trainer.jpg'
import Image from 'next/image'
import {AsideButton} from "@components/AsideButton"
import {useCallback, useContext, useEffect, useState} from "react"
import {FormInfo} from "@components/FormInfo"
import {FormExhibition} from "@components/FormExhibition"
import {SignOutAlert} from "@components/SignOutAlert"
import Link from 'next/link'
import {useAppSelector} from "../hooks/useAppSelector"
import {api} from "../utils/api"
import {useAppDispatch} from "../hooks/useAppDispatch"
import {setCurrentUser, setUserProfileData} from "../store/user/user-reducer"
import {RouteGuard} from "@components/RouteGuard"
import {ImageProfile} from "@components/ImageProfile"
import {ChangeAvatarDialog} from "@components/ChangeAvatarDialog"

const Profile = () => {

	const [formSelected, setFormSelected] = useState(0)
	const {token, user, id} = useAppSelector(state => state.user)
	const dispatch = useAppDispatch()

	const getProfileData = useCallback(() => {
		api.get(`/providers/${id}`).then(response => dispatch(setUserProfileData(response.data)))
	}, [dispatch, id])

	useEffect(() => {
		getProfileData()
	}, [getProfileData])

	const avatarUser = user?.avatar ? `https://my-personal-trainer-api.up.railway.app/files/${user.avatar}` : PersonalTrainer

	return (
		<RouteGuard>
			<>
				<header className="bg-gray-dark p-8 px-24">
					<Link href="/" className="flex gap-4 items-center text-white">
						<ArrowLeft className="text-white" size={24} />
						<span>Retornar</span>
					</Link>
				</header>
				<main className="grid grid-cols-12">
					<aside className="col-span-2 flex flex-col relative bg-gray-light h-screen items-center pt-8">
						<ChangeAvatarDialog />
						<AsideButton
							formControl={{
								formToSelect: 0,
								selectedForm: formSelected,
								setForm: setFormSelected
							}}
							text="Informações pessoais"><User size={24} /></AsideButton>
						<AsideButton
							formControl={{
								formToSelect: 1,
								selectedForm: formSelected,
								setForm: setFormSelected
							}}
							text="Informações de exibição"><IdentificationCard size={24} /></AsideButton>
						<SignOutAlert>
							<AsideButton text="Sair"><SignOut size={24} /></AsideButton>
						</SignOutAlert>
					</aside>

					<section className="col-span-10 flex flex-col items-center justify-center">
						{formSelected === 0 ?
							<FormInfo
								userData={{
									email: user?.email,
									name: user?.name
								}}
							/>
							:
							<FormExhibition profileData={{
								description: user?.ProviderInfo.description,
								startHour: user?.ProviderInfo.startHour,
								endHour: user?.ProviderInfo.endHour,
								category_id: user?.ProviderInfo.category_id
							}} />}
					</section>

				</main>

			</>
		</RouteGuard>
	)
}

export default Profile
