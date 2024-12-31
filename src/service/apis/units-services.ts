import request from "../base.service";

export const getAllRFQUnits = async () => await request.get(`/units`);
