import { AxiosResponse } from 'axios';
import { https, httpsNoToken } from '../config/https.config';
import { IBaseResponse } from '@/typeDefs/baseReponse.type';
import {
  IRequestVolunteers,
  IVolunteerGroupOrganizer
} from '@/typeDefs/schema/volunteer.type';
import { IActivityApplyList } from '../typeDefs/schema/activity_apply.type';

class VolunteerService {
  // Volunteer
  getAppliedActivities(): Promise<
    AxiosResponse<IBaseResponse<IActivityApplyList>>
  > {
    return https.get('/volunteer/activities');
  }
  requestToOrganization(body: {
    id: number
  }) {
    return https.post('/volunteer/request_to_org', body)
  }
  cancelRequestToOrganization() {
    return https.post('/volunteer/cancel_request_to_org')
  }

  // Organizer
  getAllRequestVolunteer(): Promise<
    AxiosResponse<IBaseResponse<IRequestVolunteers>>
  > {
    return https.get('/organizer/request_volunteer');
  }
  updateRequestVolunteer(body: { user_id: number; status: number }) {
    return https.put('/organizer/update_request_volunteer', body);
  }
  getVolunteerGroupOrganizer(): Promise<
    AxiosResponse<IBaseResponse<IVolunteerGroupOrganizer>>
  > {
    return https.get('/organizer/volunteers');
  }
  removeVolunteerByOrganizer(id: number) {
    return https.post(`/organizer/volunteers/${id}`);
  }

}

export const volunteerService = new VolunteerService();
