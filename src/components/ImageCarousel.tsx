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
        "/images/clinica/fachada-premium.png",
        "/images/clinica/recepcao.png",
        "/images/clinica/sala-espera.png",
        "/images/clinica/sala-ludica.png",
    ];

    const imagesNichos = [
        "/images/fonoaudiologia/img-fono-atendimento-01.png",
        "/images/fonoaudiologia/atendimento-premium.png",
        "/images/terapia-occupacional/sessao-sensorial.png",
        "/images/psicomotricidade-hero.png",
        "/images/psicopedagogia-hero.png",
        "/images/musicoterapia-hero.png",
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