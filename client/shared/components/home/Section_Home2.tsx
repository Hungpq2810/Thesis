import { Carousel } from 'antd';
import React from 'react';

const Section_Home2 = () => {
  const onChange = (currentSlide: number) => {};
  return (
    <React.Fragment>
      <div className='w-full grid grid-cols-1 justify-center items-center gap-5'>
        <h1 className='flex flex-col justify-center items-center gap-5 mb-5 text-4xl leading-8 text-bold text-[#0F147F]'>
          Sinh viên tình nguyện
          <span>Đại học Bách Khoa Hà Nội</span>
        </h1>
        <Carousel afterChange={onChange} autoplay={true} autoplaySpeed={10000}>
          <div className='max-w-[1980px] max-h-[1000px] relative overflow-hidden'>
            <img
              className='w-full h-full object-cover object-center rounded-lg'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t1.6435-9/70778019_1689615927837168_1696734011470118912_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9a8829&_nc_eui2=AeFI3xegKSXZe1Kum4gOosa4OwEBNKhdM9k7AQE0qF0z2Rsbj8Tf3LMnA1Jkaqor6cBwsn7KwujifQeR5xKfE7xz&_nc_ohc=knnSDE59VKcAX8Sr6_Y&_nc_ht=scontent.fhan18-1.fna&oh=00_AfDXGCJEbxOxnezVQR_UAspIkt-dhhZy8pLJojxS3chk2Q&oe=65B6F2F6'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[1000px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://thanhnien.mediacdn.vn/Uploaded/trongnth/2022_07_08/truc-7-8226.jpg'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[1000px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://hust.edu.vn/uploads/sys/news/2022/10/653316.jpg'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[1000px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://hust.edu.vn/uploads/sys/news/2018/07/201827-mua-he-xanh2.218705.13876.jpg'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[1000px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://vtv1.mediacdn.vn/zoom/640_400/2021/1/17/chu-nhat-do-161086041316844253054.jpg'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default Section_Home2;
