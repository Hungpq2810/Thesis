import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Users } from '../../models/users';
import {
  GeneralResponse,
  commonResponse,
} from '../../utilities/CommonResponse';
import { VolunteerRequest } from '../../models/volunteer_request';

dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const getCurrentRequestToOrganization = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const userId = decodedToken.id;
    const user = await Users.findByPk(userId);
    if (!user) {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Không tìm thấy user',
      };
      commonResponse(req, res, response);
      return;
    } else {
      const volunteerRequest = await VolunteerRequest.findOne({
        where: {
          user_id: userId,
        },
      });
      if (volunteerRequest){
        const response: GeneralResponse<any> = {
          status: 200,
          data: volunteerRequest,
          message: 'Lấy dữ liệu thành công',
        };
        commonResponse(req, res, response);
      }
      else {
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Không tìm thấy dữ liệu',
        };
        commonResponse(req, res, response);
      
      }
    }
  } catch (error: any) {
    console.error(error);
    const response: GeneralResponse<{}> = {
      status: 400,
      data: null,
      message: error.message,
    };
    commonResponse(req, res, response);
  }
};