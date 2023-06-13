import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import { Fade, Slide } from 'react-awesome-reveal';

import img1 from '../../assets/banner/img1.jpg';
import img2 from '../../assets/banner/img2.jpg';
import img3 from '../../assets/banner/img3.jpg';
import img4 from '../../assets/banner/img4.jpg';

const data = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
];

const Banner = () => {
  return (
    <section className='relative'>
      <Swiper
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className='mySwiper'
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <div>
              <div className='h-[600px] w-full'>
                <img
                  src={item.img}
                  alt='slider'
                  className='h-full w-full object-cover opacity-25'
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className='absolute top-0 left-0 bottom-0 right-0 center'>
          <div className='bg-slate-950 opacity-75 mx-10 md:px-20  py-32 text-center rounded-lg z-20'>
            <Slide direction='up'>
              <h1 className='text-5xl font-bold text-cyan-400'>
                Melodic Symphony
              </h1>
            </Slide>
            <Slide direction='up'>
              <h1 className='text-xl text-white mt-1'>
                Music Instrument Learning Platform where the best instructors
                are contributing !
              </h1>
            </Slide>
          </div>
        </div>
      </Swiper>
    </section>
  );
};

export default Banner;
