export class RegisterForm {
    constructor(
        public login: string,
        public email: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public birthday: string
    ) {}
}