import Image from "next/image"
import MenuItem from "../menu/menuItem"
import SectionHeaders from "./sectionheaders"

export default function HomeMenu(){
    return(
        <section className=''>
            <div className='absolute left-0 ring-0 w-full justify-center'>
                <div className='absolute left-0 -top-[50px] text-left -z-10'>
                    <Image src={'/salad.jpg'} width={109} height={189} alt={'sallad'}/>
                </div>
                <div className='absolute -top-[70px] right-0 -z-a0'>
                    <Image src={'/salad.jpg'} alt={"sallad"} width={109} height={189}/>
                </div>
            </div>

            <div className='text-center mb-4'>
            <SectionHeaders 
            subHeader={'Check out'}
            mainHeader={'Menu'}
            />
            </div>
            <div className='grid grid-cols-3 gap-4'>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            </div>

        </section>
    )
}