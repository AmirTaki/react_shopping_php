import SwiperSlide from "./backGroundSlider"
import ResourceImage from "./resourseImage"
import PayloarSlider from "./scrollSlider"

const Session = () => {
    return(
        <div className="pt-14">
            {/* background slider -> swiper slider */}
            <SwiperSlide />
            {/* scroll slider -> payloar slider */}
            <PayloarSlider />
            {/* resource image -> payloar swiper  */}
            <ResourceImage />
             
        </div>
    )
}
export default Session