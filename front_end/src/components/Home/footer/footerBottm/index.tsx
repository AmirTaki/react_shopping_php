const FooterBootom = () => {
    return(
        <div className="w-full h-full  ">
            <div className=" max-md:grid max-md:grid-cols-2 max-md:grid-rows-2 max-md:justify-items-center gap-3 py-3 md:flex md:justify-center md:items-center text-black dark:text-white md:gap-30">
                <div className="cursor-pointer hover:text-gray-600! dark:hover:text-[silver]! duration-200 text-[12px]">Cookie Settins</div>
                <div className="cursor-pointer hover:text-gray-600! dark:hover:text-[silver]! duration-200 text-[12px]">Your Privacy Choices</div>
                <div className="cursor-pointer hover:text-gray-600! dark:hover:text-[silver]! duration-200 text-[12px]">Privacy Policy</div>
                <div className="cursor-pointer hover:text-gray-600! dark:hover:text-[silver]! duration-200 text-[12px]">Terms and Conditions</div>
            </div>
        </div>
    )
}
export default FooterBootom;