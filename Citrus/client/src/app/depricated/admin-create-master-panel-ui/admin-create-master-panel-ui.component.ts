// import {
// 	ChangeDetectionStrategy,
// 	Component,
// 	EventEmitter,
// 	Input,
// 	OnChanges,
// 	Output,
// 	SimpleChanges,
// } from '@angular/core';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSelectionListChange } from '@angular/material/list';
// import { NewMasterFormData } from '@models/new-master-form-data';
// import { PriceList } from '@models/price-list';

// @Component({
// 	selector: 'app-admin-create-master-panel-ui',
// 	templateUrl: './admin-create-master-panel-ui.component.html',
// 	styleUrls: ['./admin-create-master-panel-ui.component.scss'],
// 	changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AdminCreateMasterPanelComponent implements OnChanges {
// 	public createMasterForm: FormGroup;
// 	@Input() disabledForm: boolean = false;
// 	@Input() priceList: PriceList = new PriceList();
// 	@Input() services: Array<string> | null = [];
// 	@Output() onSaveFormValue: EventEmitter<NewMasterFormData> =
// 		new EventEmitter();
// 	@Output() selectionListChanged: EventEmitter<MatSelectionListChange> =
// 		new EventEmitter();

// 	constructor() {
// 		this.createMasterForm = new FormGroup({
// 			masterName: new FormControl('', [
// 				Validators.required,
// 				Validators.pattern('[А-ЯЁ][а-яё]{1,}'),
// 			]),
// 			services: new FormControl('', [Validators.required]),
// 			price: new FormArray([]),
// 		});
// 	}

// 	ngOnChanges(changes: SimpleChanges): void {
// 		for (let propName in changes) {
// 			switch (propName) {
// 				case 'disabledForm':
// 					if (changes[propName].currentValue) {
// 						this.createMasterForm.disable();
// 					} else {
// 						this.createMasterForm.enable();
// 					}
// 					break;
// 				case 'priceList':
// 					let array = <FormArray>this.createMasterForm.controls['price'];
// 					let currentSelectionList =
// 						changes['priceList'].currentValue?.selectionList;
// 					let previousSelectionList =
// 						changes['priceList'].previousValue?.selectionList;
// 					if (!changes[propName].firstChange) {
// 						if (array.length < currentSelectionList.length) {
// 							array.push(
// 								new FormControl(null, [
// 									Validators.required,
// 									Validators.pattern('[0-9 ]{1,}[.][0-9 ]{1,}'),
// 								]),
// 							);
// 						} else {
// 							if (array.length > currentSelectionList.length) {
// 								for (let i = 0; i < currentSelectionList.length; i++) {
// 									if (previousSelectionList[i] !== currentSelectionList[i]) {
// 										array.removeAt(i);
// 									}
// 								}
// 							}
// 						}
// 					}
// 					break;
// 				default:
// 					break;
// 			}
// 		}
// 	}

// 	matListSelectionChange(e: MatSelectionListChange): void {
// 		this.selectionListChanged.emit(e);
// 	}

// 	trackByFn(index: number, item: string): string {
// 		return item;
// 	}

// 	onSubmit(): void {
// 		this.createMasterForm.disable();
// 		this.onSaveFormValue.emit(this.createMasterForm.value);
// 	}

// 	getErrorMessage(inputName: string) {
// 		switch (inputName) {
// 			case 'masterName': {
// 				if (this.createMasterForm.controls['masterName'].hasError('required')) {
// 					return 'Поле обязательно для заполнения';
// 				}
// 				return this.createMasterForm.controls['masterName'].hasError('pattern')
// 					? 'Введите корректное имя'
// 					: '';
// 			}
// 			case 'services': {
// 				return 'Выберите как минимум одно значение';
// 			}
// 			case 'price': {
// 				return 'Введите корректную сумму';
// 			}
// 			default:
// 				return 'Ошибка';
// 		}
// 	}
// }
