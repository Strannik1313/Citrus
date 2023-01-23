export function createMouseEvent(value: string | undefined): MouseEvent {
	const event = { target: { value } };
	return <any>event;
}
