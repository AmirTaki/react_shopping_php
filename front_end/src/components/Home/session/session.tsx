import SwiperSlide from "./backGroundSlider"
import PayloarSlider from "./scrollSlider"

const Session = () => {
    return(
        <div className="pt-14">
            {/* background slider -> swiper slider */}
            <SwiperSlide />
            {/* scroll slider -> payloar slider */}
            <PayloarSlider />
             
        </div>
    )
}
export default Session