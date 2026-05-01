import SwiperSlide from "./backGroundSlider"
import CardSlider from "./cardSlider"
import CircleSlider from "./circleSlider"
import Cube from "./cube"
import ImageAdvert from "./imageAdvert"
import ImageSliderLoop from "./imageSlider"
import ResourceImage from "./resourseImage"
import PayloarSlider from "./scrollSlider"
import GridSwiper from "./sliderPage"
import WibkitScroll from "./webkitScroll"

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

            {/* image advert -> slider scroll */}
            <ImageAdvert />

            {/* card slider -> card swiper */}
            <CardSlider />

            {/* circle slider -> circle swiper */}
            <CircleSlider />

            {/* image slider loop  */}
            <ImageSliderLoop />

            {/* cube slider loop*/}
            <Cube />

            {/* scroll slider ->  */}
            <WibkitScroll />            
        </div>
    )
}
export default Session