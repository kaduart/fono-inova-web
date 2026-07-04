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
        { src: "/images/clinica/fachada-premium.png", alt: "Fachada da Clínica Fono Inova em Anápolis" },
        { src: "/images/clinica/recepcao.png", alt: "Recepção da Clínica Fono Inova em Anápolis" },
        { src: "/images/clinica/sala-espera.png", alt: "Sala de espera da Clínica Fono Inova em Anápolis" },
        { src: "/images/clinica/sala-ludica.png", alt: "Sala lúdica de atendimento infantil da Clínica Fono Inova" },
    ];

    const imagesNichos = [
        { src: "/images/fono-inova-1.png", alt: "Atendimento infantil na Clínica Fono Inova em Anápolis" },
        { src: "/images/fono-inova-2.png", alt: "Terapeuta atendendo criança na Clínica Fono Inova" },
        { src: "/images/fono-inova-4.png", alt: "Atendimento multidisciplinar infantil na Clínica Fono Inova" },
        { src: "/images/fonoaudiologia/atendimento-premium.png", alt: "Atendimento de fonoaudiologia infantil em Anápolis" },
        { src: "/images/fonoaudiologia/img-fono-atendimento-01.png", alt: "Sessão de fonoaudiologia com criança em Anápolis" },
        { src: "/images/psicomotricidade-hero.png", alt: "Atendimento de psicomotricidade infantil em Anápolis" },
        { src: "/images/psicopedagogia-hero.png", alt: "Atendimento de psicopedagogia infantil em Anápolis" },
        { src: "/images/musicoterapia-hero.png", alt: "Atendimento de musicoterapia infantil em Anápolis" },
    ];

    const images = typeImages === "clinica" ? imagesClinica : imagesNichos;

    return (
        <div className="w-full h-96 rounded-3xl overflow-hidden">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="h-96">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;