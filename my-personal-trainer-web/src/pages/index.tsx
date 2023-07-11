import {Customer} from "@components/Customer"
import {Header} from "@components/Header"
import {RouteGuard} from "@components/RouteGuard";
import {useRouter} from "next/router";
import {addHours, format, isAfter, isBefore, parseISO, setHours, setMinutes} from "date-fns";
import {useCallback, useEffect, useState} from "react";
import {Calendar} from "react-calendar"
import {useAppSelector} from "../hooks/useAppSelector";
import {ptBR} from "date-fns/locale";
import {api} from "../utils/api";

type Appointment = {
	id: string
	date: string
	providedBy: {
		name: string
		avatar: string | undefined
	},
	scheduledBy: {
		name: string
		avatar: string | undefined
	}
}

const Dashboard = () => {

	const {token} = useAppSelector(state => state.user)
	const router = useRouter()
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [morningAppointments, setMorningAppointments] = useState<Appointment[]>([])
	const [afternoonAppointments, setAfternoonAppointments] = useState<Appointment[]>([])
	const [nightAppointments, setNightAppointments] = useState<Appointment[]>([])

	const getAppointments = useCallback(
		async () => {
			try {
				const result = await api.get(`/appointments/me?month=${format(selectedDate, 'MM')}&day=${format(selectedDate, 'dd')}&year=${format(selectedDate, 'yyyy')}`, {
					headers: {
						Authorization: `Bearer: ${token}`
					}
				})

				const midDay = setMinutes(setHours(selectedDate, 12), 0)
				const endAfternoon = setMinutes(setHours(selectedDate, 18), 0)

				const morning = result.data.filter((app: Appointment) => {

					const appDate = addHours(parseISO(app.date), 3)

					if (isBefore(appDate, midDay) && isAfter(appDate, Date.now())) {
						return app
					}
				})
				const afternoon = result.data.filter((app: Appointment) => {

					const appDate = addHours(parseISO(app.date), 3)

					if (isAfter(appDate, midDay) && isAfter(appDate, Date.now()) && isBefore(appDate, endAfternoon)) {
						return app
					}
				})

				const night = result.data.filter((app: Appointment) => {

					const appDate = addHours(parseISO(app.date), 3)

					if (isAfter(appDate, endAfternoon) && isAfter(appDate, Date.now())) {
						return app
					}
				})


				setMorningAppointments(morning)
				setAfternoonAppointments(afternoon)
				setNightAppointments(night)

			} catch (err) {
				console.log(err)
			}

		}, [selectedDate, token])

	useEffect(() => {
		getAppointments()
	}, [getAppointments])


	return (
		<RouteGuard>
			<>
				<Header />
				<main className="grid grid-cols-12 px-36 mb-24 pt-12">
					<section className="col-span-7 flex flex-col gap-12">
						<div className="flex flex-col gap-4">
							<h1 className="text-white text-3xl">Horários agendados</h1>
							<h2 className="text-red-light"> {format(selectedDate, 'EEEE', {locale: ptBR})}, {format(selectedDate, 'dd/MM')}</h2>
						</div>

						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-2">
								<span className="text-gray-hard">Manhã</span>
								<hr className="border-gray-hard mb-4" />
								<div className="col-span-10 flex flex-col gap-4">
									{morningAppointments.length > 0 ? morningAppointments.map(appointment => <Customer date={appointment.date} key={appointment.id} customerData={appointment.scheduledBy} />) : <span className="text-gray-lighter">Nenhum atendimento agendado.</span>}
								</div>

							</div>

							<div className="flex flex-col gap-2">
								<span className="text-gray-hard">Tarde</span>
								<hr className="border-gray-hard mb-4" />
								<div className="col-span-10 flex flex-col gap-4">
									{afternoonAppointments.length > 0 ? afternoonAppointments.map(appointment => <Customer date={appointment.date} customerData={appointment.scheduledBy} key={appointment.id} />) : <span className="text-gray-lighter">Nenhum atendimento agendado.</span>}
								</div>

							</div>

							<div className="flex flex-col gap-2">
								<span className="text-gray-hard">Noite</span>
								<hr className="border-gray-hard mb-4" />
								<div className="col-span-10 flex flex-col gap-4">
									{nightAppointments.length > 0 ? nightAppointments.map(appointment => <Customer date={appointment.date} customerData={appointment.scheduledBy} key={appointment.id} />) : <span className="text-gray-lighter">Nenhum atendimento agendado.</span>}
								</div>

							</div>


						</div>
					</section>
					<section className="col-span-5 relative">
						<Calendar onChange={(date: any) => setSelectedDate(date)} value={selectedDate} />
					</section>

				</main>

			</>
		</RouteGuard>
	)
}

export default Dashboard
