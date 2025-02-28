"use client";



const DescriptionSection = () => {
    return (
        <section className="relative w-auto h-[353px] bg-white">

            <div className="absolute top-[40px] left-[20px] flex flex-col items-start gap-[12px] w-[342px] h-[224px]">

                <h1 className="text-[14px] font-black leading-[14px] text-[#1E1E1E]">
                    Vicsmall 
                </h1>


                <p className="text-[13px] font-normal leading-[14px] text-[rgba(30,30,30,0.72)]">
                Vicsmall is a vibrant online marketplace where buyers and sellers converge to exchange goods and services. With a vast array of products on offer, Vicsmall is poised to revolutionize the e-commerce landscape. Sellers can showcase their wares, from unique handmade items to brand-name goods, in a secure and user-friendly environment. Meanwhile, buyers can browse and purchase with confidence, thanks to Vicsmall&apos;ss robust trust and safety measures. Whether you&apos;sre a seasoned entrepreneur or an occasional seller, Vicsmall provides the perfect platform to connect with customers and grow your business. With its intuitive interface and commitment to excellence, Vicsmall is the go-to destination for online shoppers and sellers alike.
                </p>
            </div>


            {/* <div className="absolute flex flex-row items-center justify-center gap-[18px] px-[17px] py-[11px] border border-[#1E1E1E] rounded-[7px] w-[136px] h-[38px] left-[50%] top-[289px] translate-x-[-50%]">

                <button className="text-[13px] font-semibold leading-[16px] text-[#1E1E1E] flex items-center">
                    View More   <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg> 
                </button>
            </div>*/}
        </section>
    );
};

export default DescriptionSection;
