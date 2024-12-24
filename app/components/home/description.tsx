"use client";



const DescriptionSection = () => {
    return (
        <section className="relative w-auto h-[353px] bg-white">

            <div className="absolute top-[40px] left-[20px] flex flex-col items-start gap-[12px] w-[342px] h-[224px]">

                <p className="text-[14px] font-black leading-[14px] text-[#1E1E1E]">
                    Vicsmall Lorem Ipsum
                </p>


                <p className="text-[13px] font-normal leading-[14px] text-[rgba(30,30,30,0.72)]">
                    Lorem ipsum dolor sit amet consectetur. Elit dui diam condimentum egestas et eu neque
                    feugiat. Tellus pellentesque non lacus urna fames sed. Nunc enim gravida lacus augue magna
                    non pharetra. Pellentesque id lorem morbi amet proin sapien sed adipiscing rhoncus. Nam
                    nisl felis dictum eget. Quisque vel sit nisi mattis fermentum orci euismod eget. Diam eros
                    proin id purus eget varius elit. Luctus adipiscing congue pellentesque habitant eu et
                    tellus. Posuere quis facilisis dictum hendrerit velit nascetur venenatis ac. Duis arcu
                    senectus sit netus consectetur at sed. Orci purus viverra libero sed volutpat. Purus nulla
                    porta cras pulvinar aliquam in eu sit convallis lacus.
                </p>
            </div>


            <div className="absolute flex flex-row items-center justify-center gap-[18px] px-[17px] py-[11px] border border-[#1E1E1E] rounded-[7px] w-[136px] h-[38px] left-[50%] top-[289px] translate-x-[-50%]">

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
            </div>
        </section>
    );
};

export default DescriptionSection;
