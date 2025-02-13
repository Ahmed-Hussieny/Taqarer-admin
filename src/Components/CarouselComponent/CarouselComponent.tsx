import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import img1 from "../../assets/Images/Carousel/1.png";
import img2 from "../../assets/Images/Carousel/2.png";
import img3 from "../../assets/Images/Carousel/3.png";
import img4 from "../../assets/Images/Carousel/4.png";
import img5 from "../../assets/Images/Carousel/5.png";
import img6 from "../../assets/Images/Carousel/6.png";
import img7 from "../../assets/Images/Carousel/7.png";
const CarouselComponent = () => {
  return (
    <div className="container mx-auto px-10 md:px-20">
        <div>
        <p className="font-bold text-lg mb-2">مصادرنا الموثوقة</p>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2 },
          600: { slidesPerView: 4 },
          1000: { slidesPerView: 6 },
        }}
      >
        <SwiperSlide>
          <img src={img1} alt="img1" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img2} alt="img2" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img3} alt="img3" />
        </SwiperSlide>
        <SwiperSlide>
         <img src={img4} alt="img4" />
        </SwiperSlide>
        <SwiperSlide>
         <img src={img5} alt="img5" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img6} alt="img6" />
        </SwiperSlide>
        <SwiperSlide>
            <img src={img7} alt="img7" />
        </SwiperSlide>
      </Swiper>
        </div>
    </div>
  );
};

export default CarouselComponent;
