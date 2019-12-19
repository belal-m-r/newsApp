import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsListComponent } from './news-list/news-list.component';
import { SingleNewsPageComponent } from './single-news-page/single-news-page.component';

const routes : Routes = [
    { path: '', component : NewsListComponent },
    { path: 'article/:id', component: SingleNewsPageComponent},
    { path: '**', redirectTo : '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRoutingModule {}