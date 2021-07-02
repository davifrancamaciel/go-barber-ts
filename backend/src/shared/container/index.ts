import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/apointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/apointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository);
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
