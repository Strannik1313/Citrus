import { Request, Response } from 'express';
import { Service } from '@interfaces/Service';
import ServicesService from '@services/services.service';
import { ProcessStatus } from '@enums/ProcessStatus';
import { ServiceReturnType } from '@interfaces/ServiceReturnType';

export namespace ServicesController {
	export async function services(req: Request, res: Response) {
		let filter = req.body.filter;
		const getServicesResult: ServiceReturnType<Service[]> = await ServicesService.getServices(filter);
		switch (getServicesResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).json(getServicesResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(getServicesResult);
				break;
			}
		}
	}
}

export default ServicesController;
