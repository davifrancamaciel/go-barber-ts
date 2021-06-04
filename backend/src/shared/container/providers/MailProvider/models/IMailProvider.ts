import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
	senMail(data: ISendMailDTO): Promise<void>;
}
