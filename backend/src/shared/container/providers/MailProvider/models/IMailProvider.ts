export default interface IMailProvider {
	senMail(to: string, body: string): Promise<void>;
}
