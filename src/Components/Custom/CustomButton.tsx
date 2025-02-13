import arrowLeft from '../../assets/Icons/arrow-left.png';
import arrowRight from '../../assets/Icons/arrow-right.png';

export default function CustomButton({
    outline,
    title,
    func
}: {
    title?: string,
    outline?: boolean,
    func?: () => void
}) {
    return (
        <>
            {
                outline ?
                    <div className="bg-white flex justify-center items-center text-main_color px-4 py-2 border-2 border-main_color rounded-lg hover:bg-opacity-80 cursor-pointer 
                        sm:px-3 sm:py-1 lg:px-5 lg:py-3 max-w-max" onClick={func}>
                        <img src={arrowLeft} alt="arrowLeft" className="w-4 h-4 sm:w-3 sm:h-3 lg:w-5 lg:h-5" />
                        <p className="inline mx-2 text-sm sm:text-xs lg:text-base">{title}</p>
                        <img src={arrowRight} alt="arrowRight" className="w-4 h-4 sm:w-3 sm:h-3 lg:w-5 lg:h-5" />
                    </div>
                    :
                    <div className="bg-main_color w-auto flex justify-between items-center text-white px-4 py-2 rounded-md hover:bg-opacity-80 cursor-pointer 
                        sm:px-3 sm:py-1 sm:flex-row sm:text-xs md:px-4 md:py-2 md:text-sm lg:px-5 lg:py-3 lg:text-base max-w-max" onClick={func}>
                        <img
                            src={arrowLeft}
                            alt="arrowLeft"
                            className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 inline"
                        />
                        <p className="inline mx-2">{title}</p>
                        <img
                            src={arrowRight}
                            alt="arrowRight"
                            className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 inline"
                        />
                    </div>
            }
        </>
    );
}
