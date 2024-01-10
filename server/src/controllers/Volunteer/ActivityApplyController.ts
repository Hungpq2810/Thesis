import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { activityApplyMapper } from "../../mapper/ActivityApplyMapper";
import { ActivityApply } from "../../models/activity_apply";
import { Users } from "../../models/users";
import { GeneralResponse, commonResponse } from "../../utilities/CommonResponse";
import { Feedback } from '../../models/feedback';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const listActivityApplied = async (
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
          message: 'Không tìm thấy người dùng',
        };
        commonResponse(req, res, response);
        return;
      }
  
      const userActivity = await ActivityApply.findAll({
        where: { user_id: userId },
      });
      const activityMapper = await activityApplyMapper(userActivity);
      const response: GeneralResponse<{
        activityApplied: any[];
      }> = {
        status: 200,
        data: {
          activityApplied: activityMapper,
        },
        message: 'Lấy thông tin sự kiện đã đăng ký thành công',
      };
      commonResponse(req, res, response);
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