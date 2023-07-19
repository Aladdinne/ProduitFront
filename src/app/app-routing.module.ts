import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreerProduitComponent} from "./creer-produit/creer-produit.component";
import {DisplayProductComponent} from "./display-product/display-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products/create', component: CreerProduitComponent },
  { path: 'products', component: DisplayProductComponent },
  { path: 'edit/:id', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
