export class PlatformModel {
    constructor(
        public id? : any,
        public login?: string,
        public pwd?: string,
        public nom?: string,
        public adresse?: string,
    public $$expanded?: boolean

){

        this.id = id ? id : null;
        this.login = login ? login : null;
        this.pwd = pwd ? pwd : null;
        this.nom = nom ? nom : null;
        this.adresse = adresse ? adresse : null;
    }




}