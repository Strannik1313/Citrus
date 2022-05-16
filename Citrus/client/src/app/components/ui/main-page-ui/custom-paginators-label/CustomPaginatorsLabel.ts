import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Карточек на странице';
  override nextPageLabel     = 'Следующая страница';
  override previousPageLabel = 'Предыдущая страница';  
}