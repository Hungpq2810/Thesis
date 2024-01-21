import React from 'react';
import { Collapse } from 'antd';
import dayjs from 'dayjs';
import { IFeedback } from '@/typeDefs/schema/feedback.type';
import { useQuery } from 'react-query';
import { feedbackService } from '../../services/feedback.service';
const { Panel } = Collapse;

type Props = {
  feedbacks: IFeedback[] | undefined;
};

const Section_Home5 = ({ feedbacks }: Props) => {
  const { data: dataFeedback } = useQuery(['listFeedback'], () =>
    feedbackService.getAllFeedbackNoAuth()
  );

  return (
    <React.Fragment>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='text-4xl leading-8 text-bold text-[#0F147F] border-b-2 border-b-black'>
          Feedback người dùng
        </h1>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {dataFeedback?.data.data &&
          dataFeedback?.data.data.feedbacks.map((feedback) => (
            <Collapse
              key={feedback.id}
              collapsible='icon'
              defaultActiveKey={['1']}
            >
              <Panel header={feedback.title} key='1'>
                <p>{feedback.content}</p>
                <p>
                  Cập nhật lúc:{' '}
                  {dayjs(feedback.created_at).format('DD/MM/YYYY')}
                </p>
              </Panel>
            </Collapse>
          ))}
      </div>
    </React.Fragment>
  );
};

export default Section_Home5;
