import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const ImageCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        fade: true,
        cssEase: 'linear'
    };

    const images = [
        "/images/fonoaudiologia/img-fono-atendimento-01.png",
        "/images/fonoaudiologia/fono2.jpg",
        "/images/fisioterapia/fisio2.jpg",
        "/images/psicologia/psico2.jpg",
        "/images/terapia-ocupacional/to2.jpg",
        "/images/fonoaudiologia/fono1.jpg",
    ];

    return (
        <div className="w-full h-96 rounded-3xl overflow-hidden">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="h-96">
                        <img
                            src={image}
                            alt={`Atendimento de Psicologia ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;