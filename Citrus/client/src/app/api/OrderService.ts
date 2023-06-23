import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDto } from '@models/OrderDto';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private http: HttpClient) {}

	createOrder(params: OrderDto): Observable<OrderDto> {
		return this.http.post<OrderDto>('/api/order', { ...params });
	}
}
