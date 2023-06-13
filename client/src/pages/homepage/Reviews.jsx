import { reviews } from '../../utils/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { Rating } from '@smastrom/react-rating';
import { Slide } from 'react-awesome-reveal';

const Reviews = () => {
  return (
    <div className='mb-10'>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        loop={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className='mySwiper'
      >
        {reviews.map((item) => (
          <SwiperSlide key={item._id}>
            <div className=' flex flex-col gap-5 items-center md:w-2/3 mx-auto py-20'>
              <Slide duration='up'>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={item.rating}
                  readOnly
                />
              </Slide>
              <Slide direction='right'>
                <p className='text-white font-semibold text-center'>
                  {item.details}
                </p>
              </Slide>
              <Slide direction='left'>
                <h1 className='text-2xl font-bold text-yellow-300'>
                  {item.name}
                </h1>
              </Slide>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
