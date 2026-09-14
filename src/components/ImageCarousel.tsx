import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type ImageCarouselProps = {
    typeImages: "clinica" | "nichos";
    onImageClick?: () => void;
};

type CarouselImage = {
    src: string;
    alt: string;
    width: number;
    height: number;
    objectPosition?: string;
    filter?: string;
};

const ImageCarousel = ({ typeImages, onImageClick }: ImageCarouselProps) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        arrows: true,
        fade: true,
        cssEase: 'ease-out',
        lazyLoad: 'ondemand' as const,
        pauseOnFocus: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    autoplay: false,
                    arrows: false
                }
            }
        ]
    };

    const imagesClinica: CarouselImage[] = [
        { src: "/images/clinica/real/entrada-real.jpg", alt: "Entrada real da Clínica Fono Inova em Anápolis", width: 1600, height: 900 },
        { src: "/images/clinica/real/sala-espera-real.jpg", alt: "Sala de espera real da Clínica Fono Inova em Anápolis", width: 1600, height: 900, filter: "brightness(1.08) contrast(0.98)" },
        { src: "/images/clinica/real/consultorio-infantil-real.jpg", alt: "Consultório infantil real da Clínica Fono Inova", width: 1600, height: 900 },
        { src: "/images/clinica/real/terapia-ocupacional-real.jpg", alt: "Sala real de terapia ocupacional da Clínica Fono Inova", width: 900, height: 1600, objectPosition: "center 42%", filter: "brightness(1.04)" },
        { src: "/images/clinica/real/espaco-infantil-real.jpg", alt: "Espaço infantil real da Clínica Fono Inova", width: 900, height: 1600, objectPosition: "center 38%", filter: "brightness(1.03)" },
        { src: "/images/clinica/real/recursos-terapeuticos-real.jpg", alt: "Recursos terapêuticos reais da Clínica Fono Inova", width: 1600, height: 900 },
    ];

    const imagesNichos: CarouselImage[] = [
        { src: "/images/fono-inova-1.png", alt: "Atendimento infantil na Clínica Fono Inova em Anápolis", width: 1024, height: 1024 },
        { src: "/images/fono-inova-2.png", alt: "Terapeuta atendendo criança na Clínica Fono Inova", width: 1024, height: 1024 },
        { src: "/images/fono-inova-4.png", alt: "Atendimento multidisciplinar infantil na Clínica Fono Inova", width: 1024, height: 1024 },
        { src: "/images/fonoaudiologia/atendimento-premium.png", alt: "Atendimento de fonoaudiologia infantil em Anápolis", width: 640, height: 640 },
        { src: "/images/fonoaudiologia/img-fono-atendimento-01.png", alt: "Sessão de fonoaudiologia com criança em Anápolis", width: 4495, height: 7995, objectPosition: "center 32%" },
        { src: "/images/psicomotricidade-hero.png", alt: "Atendimento de psicomotricidade infantil em Anápolis", width: 640, height: 640 },
        { src: "/images/psicopedagogia-hero.png", alt: "Atendimento de psicopedagogia infantil em Anápolis", width: 640, height: 640 },
        { src: "/images/musicoterapia-hero.png", alt: "Atendimento de musicoterapia infantil em Anápolis", width: 640, height: 640 },
        { src: "/images/terapia-ocupacional/sessao-sensorial.png", alt: "Sala de integração sensorial da Clínica Fono Inova em Anápolis", width: 640, height: 640 },
        { src: "/images/fonoaudiologia/fono2.jpg", alt: "Sessão de fonoaudiologia infantil com jogo de articulação em Anápolis", width: 640, height: 720 },
        { src: "/images/psicologia/psico3.jpg", alt: "Atendimento de psicologia infantil na Clínica Fono Inova em Anápolis", width: 2121, height: 1414 },
        { src: "/images/clinica/real/espaco-infantil-real.jpg", alt: "Espaço lúdico real da Clínica Fono Inova em Anápolis", width: 900, height: 1600, objectPosition: "center 30%" },
    ];

    const images = typeImages === "clinica" ? imagesClinica : imagesNichos;

    return (
        <div className="w-full h-full min-h-0 min-w-0 overflow-hidden [&_.slick-slider]:h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full [&_.slick-dots]:bottom-4 [&_.slick-dots_button:before]:text-white [&_.slick-dots_button:before]:opacity-70 [&_.slick-dots_.slick-active_button:before]:text-white [&_.slick-dots_.slick-active_button:before]:opacity-100">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="h-full min-h-0">
                        <img
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            loading={index === 0 && typeImages === "nichos" ? "eager" : "lazy"}
                            decoding="async"
                            onClick={onImageClick}
                            className="w-full h-full object-cover select-none"
                            style={{ objectPosition: image.objectPosition, filter: image.filter }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageCarousel;
