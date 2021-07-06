interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email:string;
      name:string;
    }
  }
}
export default {
  driver: process.env.MAIL_DIVER || 'ethereal',
  defaults: {
    from: {
      email: 'nao-responda@upissaude.com.br',
      name: 'Davi da GoBarber'
    }
  }
} as IMailConfig
