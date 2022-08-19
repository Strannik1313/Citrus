export interface DialogWindow {
	windowHeaderText: string;
	windowText: string;
	buttonLabel?: string;
	customMessage?: string;
	imgClass?: string;
	type: DialogType;
}
export enum DialogType {
	Error = 'error',
	Warning = 'warning',
	Confirm = 'confirm',
}
export const DIALOG_WINDOW_INIT = {
	windowHeaderText: '',
	windowText: '',
	buttonLabel: '',
	customMessage: '',
	type: DialogType.Warning,
};
