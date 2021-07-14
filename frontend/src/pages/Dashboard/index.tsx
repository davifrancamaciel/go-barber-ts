import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { FiClock, FiPower } from 'react-icons/fi'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { isToday, format, parseISO } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'

import logo from '../../assets/logo.svg'
import { useAuth } from '../../hooks/auth'

import api from '../../services/api'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Shedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment
} from './styles'

interface MonthAvailabityItem {
  day: number
  available: boolean
}

interface Appointment {
  id: string
  date: string
  hourFormatted: string
  user: {
    name: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setmonthAvailability] = useState<
    MonthAvailabityItem[]
  >([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1
        }
      })
      .then(resp => setmonthAvailability(resp.data))
  }, [currentMonth, user.id])

  useEffect(() => {
    api
      .get<Appointment[]>(`/appointments/me`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate()
        }
      })
      .then(resp => {
        const appoitmentsFormatted = resp.data.map(appointment=>({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date),'HH:mm')
        }))
        setAppointments(appoitmentsFormatted)})
  }, [selectedDate])

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })
    return dates
  }, [currentMonth, monthAvailability])

  const selecttedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR })
  }, [selectedDate])

  const selecttedWeekDayAsText = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR })
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter(a => {
      return parseISO(a.date).getHours() < 12
    })
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(a => {
      return parseISO(a.date).getHours() >= 12
    })
  }, [appointments])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt='GoBarber' />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type='button' onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Shedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selecttedDateAsText}</span>
            <span>{selecttedWeekDayAsText}</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src='https://avatars.githubusercontent.com/u/12069029?v=4'
                alt=''
              />
              <strong>Davi</strong>
              <span>
                <FiClock />
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>

            {morningAppointments.map(a => (
              <Appointment key={a.id}>
                <span>
                  <FiClock /> {a.hourFormatted}
                </span>
                <div>
                  <img src={a.user.avatar_url} alt={a.user.name} />
                  <strong>{a.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.map(a => (
              <Appointment key={a.id}>
                <span>
                  <FiClock /> {a.hourFormatted}
                </span>
                <div>
                  <img src={a.user.avatar_url} alt={a.user.name} />
                  <strong>{a.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Shedule>
        <Calendar>
          <DayPicker
            selectedDays={selectedDate}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
