export class Profile {
    constructor(
        public profileID?: number,
        public username?: string,
        public password?: string,
        public role?: string,
        public firstName?: string,
        public lastName?: string,
        public age?: number,
        public weight?: number,
        public gender?: string,
        public bloodGroupID?: number,
        public contactNo?: string,
        public email?: string,
        public locationID?: number,
        public picture?: string
    ) { }
}
