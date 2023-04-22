import { Login } from "@/domain/useCases/login";
import { storage } from "@/main/Registry";

export const makeLogin = (): Login => ({
  async execute(props) {
    if (props.login !== 'test' || props.password !== 'test') throw new Error('Credenciais inválidas');

    storage.set('auth', { token: '20f52299-ff05-43f1-8f48-557b28ede522' });

    return { authorization: '20f52299-ff05-43f1-8f48-557b28ede522' }
  }
})