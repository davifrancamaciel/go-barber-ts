import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'

import ListAppointmentsProviderService from '@modules/apointments/services/ListAppointmentsProviderService'

class Provider {
  public async index (request: Request, response: Response) {
    const provider_id = request.user.id

    const { day, month, year } = request.query

    const listAppointmentsProviderService = container.resolve(
      ListAppointmentsProviderService
    )
    const appoitments = await listAppointmentsProviderService.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id
    })

    return response.json(classToClass(appoitments))
  }
}

export default new Provider()
