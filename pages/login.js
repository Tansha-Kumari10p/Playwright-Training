import {Page, Locator} from '@playwright/test';

export default class LoginPage{

    constructor(page){
        this.usernamefield = page.getByRole('textbox', {name: 'Username'});
        this.passwordfield = page.getByRole('textbox', {name: 'Password'});
        this.submitbutton = page.getByRole('button', {name: 'Submit'});
        this.usernameError = page.locator(".show"); 
        this.passwordError = page.locator("#error");
    }

    async enterUsername(username){
        await this.usernamefield.fill(username);
    }

    async enterPassword(password){
        await this.passwordfield.fill(password);
    }

    async clickSubmit(){
        await this.submitbutton.click();
    }

    //creating a generic method to login
    async login(username, password){
        await this.usernamefield.fill(username);
        await this.passwordfield.fill(password);
        await this.submitbutton.click();
    }    
}