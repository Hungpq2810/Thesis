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
          <div className='max-w-[1980px] max-h-[700px] relative overflow-hidden'>
            <img
              className='w-full h-full object-cover object-center rounded-lg'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t1.6435-9/70778019_1689615927837168_1696734011470118912_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9a8829&_nc_eui2=AeFI3xegKSXZe1Kum4gOosa4OwEBNKhdM9k7AQE0qF0z2Rsbj8Tf3LMnA1Jkaqor6cBwsn7KwujifQeR5xKfE7xz&_nc_ohc=knnSDE59VKcAX8Sr6_Y&_nc_ht=scontent.fhan18-1.fna&oh=00_AfDXGCJEbxOxnezVQR_UAspIkt-dhhZy8pLJojxS3chk2Q&oe=65B6F2F6'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://thanhnien.mediacdn.vn/Uploaded/trongnth/2022_07_08/truc-7-8226.jpg'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/371355413_717856537046816_4577845481359544141_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeE2BqVrKDYpNzxAcVlgupiME4hoMUvku9ITiGgxS-S70lgDXNOYtH0Ryu6L2BqYz14E8HSUcurzv1bcEUAn1Xdb&_nc_ohc=av_bRKu3xMkAX9GmAiC&_nc_ht=scontent.fhan18-1.fna&oh=00_AfBprjpMHHAH-H3WC5V1GV-jZPwvuu54GGGWk3BIb4Ao1Q&oe=65A4AD97'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/372764760_717856150380188_222603127376741645_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEPge2U_3NEhqavW5a2GwqQ4R5lQRI_VzXhHmVBEj9XNV9ME7IMnUk4ZrU3COSsVcxRiB_pLl8XNXAu10CWV-Co&_nc_ohc=n12s2EGEW9AAX8X_VgL&_nc_ht=scontent.fhan18-1.fna&oh=00_AfBQDc5Dt4eFxwsXLQXNA2-6knafWIdpKxGlZKxlP8k4eA&oe=65A4173E'
              style={{ maxWidth: '100%', maxHeight: '100%' }}
              alt='Carousel Image'
            />
          </div>
          <div className='max-w-[1980px] max-h-[700px] relative'>
            <img
              className='w-full h-full object-cover object-center rounded-lg overflow-hidden'
              src='https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/372679129_716716493827487_5152202459787610745_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHClb0zymhiMynNLlrA3Jj7lHnj1pfXpASUeePWl9ekBIC7DQRCafMLQwVKhGoS-I4SiQFoTRD0YNvY7swUrDFE&_nc_ohc=BUkkMi5gaW0AX_n2IZU&_nc_ht=scontent.fhan18-1.fna&oh=00_AfCg7ryRkWawcEsNr9ikrjnOdBIMxE7seqS4omzzxTLbNQ&oe=65A55F4B'
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
