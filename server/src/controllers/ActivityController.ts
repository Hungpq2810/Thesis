import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { GeneralResponse, commonResponse } from '../utilities/CommonResponse';
import { Activities, ActivityAttributes } from '../models/activities';
import { Op } from 'sequelize';
import { SkillActivities } from '../models/skill_activities';
import { Skills } from '../models/skills';
import { mappedActivities, mappedSearchActivities } from '../mappers/ActivityMapper';
import { Users } from '../models/users';
dotenv.config();

export const listActivity = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const activitiesCurrent = await Activities.findAll();
    const activities = await Promise.all(mappedActivities(activitiesCurrent));
    if (activities.length > 0) {
      const response: GeneralResponse<{
        activities: ActivityAttributes[];
      }> = {
        status: 200,
        data: {
          activities: activities as unknown as ActivityAttributes[],
        },
        message: 'Get list activities successfully',
      };
      commonResponse(req, res, response);
    } else {
      const response: GeneralResponse<{}> = {
        status: 200,
        data: [],
        message: 'Get list activities successfully',
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

export const detailActivity = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const activity = await Activities.findByPk(id);

    if (activity) {
      const activities = [activity];
      const mappedResult = await Promise.all(mappedActivities(activities));

      if (mappedResult.length > 0) {
        const resolvedActivity = mappedResult[0];
        if (resolvedActivity !== null) {
          const response: any = {
            status: 200,
            data: resolvedActivity,
            message: 'Get activity details successfully',
          };
          commonResponse(req, res, response);
        }
      } else {
        const response: GeneralResponse<{}> = {
          status: 404,
          data: null,
          message: 'Activity not found',
        };
        commonResponse(req, res, response);
      }
    } else {
      const response: GeneralResponse<{}> = {
        status: 404,
        data: null,
        message: 'Activity not found',
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

export const searchActivities = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    let activities;
    if (key) {
      const searchKey = `${key}`.toLowerCase();
      const activitiesByName = await Activities.findAll({
        where: {
          name: {
            [Op.like]: `%${searchKey}%`,
          },
        },
      });
      const skills = await Skills.findAll({
        where: {
          name: {
            [Op.like]: `%${searchKey}%`,
          },
        },
      });
      const skillIds = skills.map((skill) => skill.id);
      const skillActivities = await SkillActivities.findAll({
        where: {
          skill_id: skillIds,
        },
      });
      const skillActivitiesIds = skillActivities.map(
        (skillActivity) => skillActivity.activity_id,
      );
      const activitiesBySkill = await Activities.findAll({
        where: {
          id: skillActivitiesIds,
        },
      });

      activities = [...activitiesByName, ...activitiesBySkill];
    } else {
      activities = await Activities.findAll();
    }

    const response = {
      status: 200,
      data: { activities },
      message: 'Search activities successfully',
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchMultipleActivities = async (req: Request, res: Response) => {
  try {
    const { name, address, skills, organizer, date, dateAct } = req.query;
    const parsedSkills = skills ? Object.values((skills as string[]).map(Number)) : [];
    const parsedOrganizer = organizer ? Number(organizer) : undefined;
    // const parsedDate = date ? JSON.parse(date as string) : undefined;
    // console.log(parsedDate);
    // console.log(req.query.date, req.query.dateAct);
    // console.log(Array.isArray(Object.values(req.query.date)));
    
    
    let activities;
    let whereClause: { [key: string]: any } = {};

    if (name) {
      if (typeof name === 'string') {
        whereClause['name'] = {
          [Op.like]: `%${name.toLowerCase()}%`,
        };
      }
    }

    if (address && typeof address === 'string') {
      whereClause['location'] = {
        [Op.like]: `%${address.toLowerCase()}%`,
      };
    }
    
// if (parsedDate) {
//   if (parsedDate.register_from && parsedDate.register_to) {
//     whereClause['register_from'] = {
//       [Op.between]: [parsedDate.register_from, parsedDate.register_to],
//     };
//   } else if (parsedDate.register_from) {
//     whereClause['register_from'] = {
//       [Op.gte]: parsedDate.register_from,
//     };
//   } else if (parsedDate.register_to) {
//     whereClause['register_to'] = {
//       [Op.lte]: parsedDate.register_to,
//     };
//   }
// }

if (parsedOrganizer) {
  const user = await Users.findOne({
    where: {
      role_id: 2,
      organization_id: parsedOrganizer,
    },
  });
  if (user) {
    whereClause['creator'] = user.id;
  }
}

activities = await Activities.findAll({
  where: whereClause,
});

let mappedResult = await Promise.all(mappedSearchActivities(activities));

let activitySet = await SkillActivities.findAll({
  where: {
    skill_id: {
      [Op.in]: parsedSkills
    }
  },
});
let activityIds = [...new Set(activitySet.map(activity => activity.activity_id))];

// mappedResult = mappedResult.filter(activity => activityIds.includes(activity?.id));
mappedResult = mappedResult.filter(activity => activity && activity.id !== undefined && activityIds.includes(activity.id));


const response = {
      status: 200,
      data: { activities: mappedResult },
      message: 'Search activities successfully',
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
