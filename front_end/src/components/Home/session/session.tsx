import SwiperSlide from "./backGroundSlider"
import ResourceImage from "./resourseImage"
import PayloarSlider from "./scrollSlider"
import GridSwiper from "./sliderPage"

const Session = () => {
    return(
        <div className="pt-14 sizeWidth">
            {/* background slider -> swiper slider */}
            <SwiperSlide />
            
            {/* scroll slider -> payloar slider */}
            <PayloarSlider />
            
            {/* resource image -> payloar swiper  */}
            <ResourceImage />

            {/* grid image -> slider page )(grid swiper)*/}
            <GridSwiper />
        </div>
    )
}
export default Session