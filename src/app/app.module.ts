import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerProduitComponent } from './creer-produit/creer-produit.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { RegistreAccountComponent } from './Registre/registre-account/registre-account.component';
import { TopNavbarComponent } from './navbar/top-navbar/top-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    CreerProduitComponent,
    DisplayProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    LoginComponent,
    RegistreAccountComponent,
    TopNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
