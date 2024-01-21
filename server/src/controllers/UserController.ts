import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { UserAttributes, Users } from '../models/users';
import { SkillUsers } from '../models/skill_users';
import { Skills } from '../models/skills';
dotenv.config();
const secretKey = process.env.SECRETKEY as string;

export const updateProfile = async (
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
      if (Array.isArray(req.body.skills) && user.role_id === 1) {
        const skills = req.body.skills.map((skillId: string) => ({
          skill_id: skillId,
          user_id: userId,
          created_at: new Date(),
          updated_at: new Date(),
        }));
        await SkillUsers.destroy({ where: { user_id: userId } });
        for (const skill of skills) {
          await SkillUsers.create(skill);
        }
      }
      const body = req.body;

      const result = await user.update(body);
      const response: GeneralResponse<UserAttributes> = {
        status: 200,
        data: result.toJSON() as UserAttributes,
        message: 'Update successfully',
      };
      commonResponse(req, res, response);
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

export const detailUser = async (
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
    const filteredUser = {
      ...user?.toJSON(),
      password: undefined,
    };
    if (!user) {
      const response: GeneralResponse<{}> = {
        status: 400,
        data: null,
        message: 'Không tìm thấy người dùng',
      };
      commonResponse(req, res, response);
      return;
    }

    const userSkills = await SkillUsers.findAll({
      where: { user_id: userId },
    });
    const skillIds = userSkills.map((skill) => skill.skill_id);
    const skills = await Skills.findAll({ where: { id: skillIds } });
    const skillsWithDetails = userSkills.map((activity) => {
      const skill = skills.find((skill) => skill.id === activity.skill_id);
      return skill;
    });

    const response: GeneralResponse<{
      user: any;
      skills: any[];
    }> = {
      status: 200,
      data: {
        user: filteredUser,
        skills: skillsWithDetails,
      },
      message: 'Lấy thông tin người dùng thành công',
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
