import { Request, Response } from 'express';
import { MasterDto } from '@dto/MasterDto';
import { MasterFilter } from '@interfaces/MasterFilter';
import { ServiceReturnType } from '@interfaces/ServiceReturnType';
import { ProcessStatus } from '@enums/ProcessStatus';
import MastersService from '@services/masters.service';
import { PageableRequest } from '@interfaces/PageableRequest';
import { PageableResponse } from '@interfaces/PageableResponse';

namespace MastersController {
	export async function masters(req: Request, res: Response) {
		const data: PageableRequest<MasterFilter> = req.body;
		const getMastersResult: ServiceReturnType<PageableResponse<MasterDto>> = await MastersService.getMasters(data);
		switch (getMastersResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).json(getMastersResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(getMastersResult);
				break;
			}
		}
	}

	export async function masterById(req: Request, res: Response) {
		const id = req.params.id;
		const getMasterByIdResult = await MastersService.getMastersById(id);
		switch (getMasterByIdResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).json(getMasterByIdResult.data);
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(getMasterByIdResult);
				break;
			}
		}
	}

	export async function updateMaster(req: Request, res: Response) {
		const master: MasterDto = req.body;
		const updateMasterResult = await MastersService.updateMaster(master);
		switch (updateMasterResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).send();
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(updateMasterResult);
				break;
			}
		}
	}

	export async function createMaster(req: Request, res: Response) {
		const master: MasterDto = req.body;
		const createMasterResult = await MastersService.createMaster(master);
		switch (createMasterResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).send();
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(createMasterResult);
				break;
			}
		}
	}

	export async function deleteMaster(req: Request, res: Response) {
		const id = req.body.id;
		const deleteMasterResult = await MastersService.deleteMaster(id);
		switch (deleteMasterResult.status) {
			case ProcessStatus.SUCCESS: {
				res.status(200).send();
				break;
			}
			case ProcessStatus.ERROR: {
				res.status(500).json(deleteMasterResult);
				break;
			}
		}
	}
}

export default MastersController;
