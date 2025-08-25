import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type ImageCarouselProps = {
    typeImages: "clinica" | "nichos";
};

const ImageCarousel = ({ typeImages }: ImageCarouselProps) => {
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

    const imagesClinica = [
        "/images/clinica/fachada-clinica.jpg",
        "/images/clinica/IMG-20250527-WA0024.jpg",
        "/images/clinica/IMG-20250527-WA0025.jpg",
        "/images/clinica/IMG-20250527-WA0026.jpg",
        "/images/clinica/IMG-20250527-WA0027.jpg",
        "/images/clinica/IMG-20250527-WA0028.jpg",
        "/images/clinica/IMG-20250527-WA0029.jpg",
        "/images/clinica/IMG-20250527-WA0030.jpg",
        "/images/clinica/IMG-20250527-WA0031.jpg",
        "/images/clinica/IMG-20250527-WA0032.jpg",
        "/images/clinica/IMG-20250527-WA0033.jpg",
        "/images/clinica/IMG-20250527-WA0034.jpg",
        "/images/clinica/IMG-20250527-WA0035.jpg",
    ];
    const imagesNichos = [
        "/images/fonoaudiologia/img-fono-atendimento-01.png",
        "/images/fonoaudiologia/fono2.jpg",
        "/images/fisioterapia/fisio2.jpg",
        "/images/psicologia/psico2.jpg",
        "/images/terapia-ocupacional/to2.jpg",
        "/images/fonoaudiologia/fono1.jpg",
    ];

    const images = typeImages === "clinica" ? imagesClinica : imagesNichos;

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