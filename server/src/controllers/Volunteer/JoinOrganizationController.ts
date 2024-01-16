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
      if (volunteerRequest) {
        const response: GeneralResponse<any> = {
          status: 200,
          data: volunteerRequest,
          message: 'Lấy dữ liệu thành công',
        };
        commonResponse(req, res, response);
      } else {
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

export const requestToOrganization = async (
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

    if (user) {
      if (user.organization_id && user.role_id === 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: 'Bạn đã là tổ chức',
        };
        commonResponse(req, res, response);
      } else {
        const body = {
          user_id: Number(userId) as number,
          organization_id: Number(req.body.organization_id) as number,
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        };
        const existingRequest = await VolunteerRequest.findOne({
          where: { user_id: userId },
        });
        console.log(existingRequest);

        if (existingRequest) {
          await existingRequest.update(body);
        } else {
          await VolunteerRequest.create(body);
        }
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Đăng ký thành công',
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

export const cancelRequestToOrganization = async (
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

    if (user) {
      if (user.organization_id && user.role_id === 2) {
        const response: GeneralResponse<{}> = {
          status: 400,
          data: null,
          message: 'Bạn đã là tổ chức',
        };
        commonResponse(req, res, response);
      } else {
        const checkRequestTime = await VolunteerRequest.findAll({
          where: {
            user_id: userId,
            status: 1,
          },
        });

        if (checkRequestTime.length > 0) {
          await VolunteerRequest.destroy({
            where: { user_id: userId },
          });
        }
        const response: GeneralResponse<{}> = {
          status: 200,
          data: null,
          message: 'Hủy đăng ký vào tổ chức thành công',
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
