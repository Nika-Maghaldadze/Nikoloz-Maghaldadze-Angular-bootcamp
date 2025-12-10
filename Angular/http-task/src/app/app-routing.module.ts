// src/app/app-routing.module.ts

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransferComponent } from "./features/transfer/transfer.component";
import { NotFoundComponent } from "./features/not-found/not-found.component";

const routes: Routes = [
    { path: "", redirectTo: "transfer", pathMatch: "full" },
    { path: "transfer", component: TransferComponent },
    { path: "transfer/:fromAccountId", component: TransferComponent },
    { path: "**", component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
