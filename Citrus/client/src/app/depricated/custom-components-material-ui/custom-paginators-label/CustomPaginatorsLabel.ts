// import { Injectable } from '@angular/core';
// import { MatPaginatorIntl } from '@angular/material/paginator';

// @Injectable()
// export class MatPaginatorIntlCro extends MatPaginatorIntl {
// 	override itemsPerPageLabel = 'Карточек на странице';
// 	override nextPageLabel = 'Следующая страница';
// 	override previousPageLabel = 'Предыдущая страница';
// 	override getRangeLabel = (page: number, pageSize: number, length: number) => {
// 		if (length === 0 || pageSize === 0) {
// 			return '0 из ' + length;
// 		}
// 		length = Math.max(length, 0);
// 		const startIndex = page * pageSize;
// 		const endIndex =
// 			startIndex < length
// 				? Math.min(startIndex + pageSize, length)
// 				: startIndex + pageSize;
// 		return startIndex + 1 + ' - ' + endIndex + ' из ' + length;
// 	};
// }
