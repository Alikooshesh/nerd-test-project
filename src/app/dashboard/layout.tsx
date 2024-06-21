'use client'

import {ReactElement, useEffect} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import useLocalStorage from "react-use-localstorage";

interface Iprops{
    children : ReactElement
}

const DashboardLayout = ({children}:Iprops)=>{

    const [accessToken, setAccessToken] = useLocalStorage('accessToken', undefined)

    const pathname = usePathname()

    useEffect(()=>{
        if (!accessToken || accessToken === "null"){
            const at = prompt("give me an access token")
            setAccessToken(at ?? "null")
        }
    },[accessToken])

    return(
        <div className={'w-full h-screen flex flex-col lg:flex-row'}>
            <div className={'hidden lg:block w-[200px] h-screen bg-[#FCFCFD]'}>
                <div className={'w-full min-h-[80px] max-h-[80px] px-[16px] flex items-center gap-[8px] border-b-[3px] border-[#F4F4F4]'}>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.9616 2.57502C17.8663 2.2333 19.8304 2.57179 21.5108 3.53133C22.5676 4.13477 23.4698 4.9597 24.1615 5.94005L25.3738 5.23223C27.0502 4.26446 29.0134 3.91683 30.9202 4.2501C32.8269 4.58337 34.5559 5.57634 35.8046 7.05537C37.0533 8.5344 37.7423 10.4053 37.7512 12.341C37.7568 13.5681 37.4888 14.7718 36.9771 15.8683L38.0663 16.5038C38.0675 16.5046 38.0688 16.5053 38.0701 16.5061C39.9515 17.5942 41.3241 19.3846 41.8865 21.4841C42.4493 23.585 42.1545 25.8234 41.0672 27.7071C39.6955 30.0831 37.3666 31.5263 34.8337 31.7722V33.3062C34.8327 35.2412 34.1517 37.1153 32.9097 38.5992C31.6677 40.0831 29.9438 41.0833 28.0391 41.425C26.1345 41.7667 24.1703 41.4282 22.49 40.4687C21.4332 39.8653 20.5309 39.0403 19.8393 38.06L18.6348 38.7632L18.627 38.7677C16.9507 39.7355 14.9874 40.0832 13.0807 39.7499C11.1739 39.4166 9.44496 38.4236 8.19624 36.9446C6.94752 35.4656 6.25849 33.5947 6.24964 31.659C6.24388 30.3974 6.52729 29.1607 7.06736 28.0397L5.92686 27.3671C4.04746 26.2787 2.67628 24.4894 2.11429 22.3913C1.55154 20.2904 1.84626 18.0519 2.93364 16.1683C4.30527 13.7923 6.63413 12.3491 9.16707 12.1032V10.6939C9.16806 8.75881 9.84906 6.88471 11.091 5.40084C12.333 3.91696 14.057 2.91675 15.9616 2.57502ZM12.8337 14.0192C12.8341 13.9971 12.8341 13.9751 12.8337 13.9531V10.6948C12.8343 9.61959 13.2127 8.57876 13.9028 7.75424C14.5929 6.92971 15.5508 6.37394 16.6092 6.18406C17.6675 5.99418 18.7589 6.18226 19.6926 6.71544C20.1866 6.99755 20.6199 7.36677 20.9738 7.80125L17.4093 9.88244C16.8465 10.2111 16.5004 10.8139 16.5004 11.4657V19.7204C16.5 19.7428 16.5 19.7653 16.5004 19.7877V21.0311L12.8337 18.9227V14.0192ZM6.10918 18.0014C6.81283 16.7825 7.93219 16.0256 9.16707 15.8021L6.10918 18.0014ZM9.16707 15.8021V19.9834C9.16707 20.6395 9.51772 21.2456 10.0865 21.5727L17.3933 25.7741C17.4118 25.7852 17.4305 25.7959 17.4493 25.8063L18.2744 26.2807L14.6923 28.2795L7.78286 24.2048L7.7686 24.1965C6.72716 23.5949 5.96729 22.6043 5.6561 21.4426C5.34491 20.2808 5.50789 19.043 6.10918 18.0014M22.7555 27.9791C22.8503 27.9364 22.9417 27.8855 23.0286 27.8267L23.8338 27.3774V31.4818L16.7938 35.5922C16.7927 35.5929 16.7915 35.5936 16.7903 35.5943C15.8596 36.1305 14.7701 36.3229 13.712 36.138C12.6524 35.9528 11.6918 35.401 10.9979 34.5792C10.3041 33.7574 9.92119 32.7178 9.91627 31.6422C9.91354 31.0458 10.0271 30.4594 10.2459 29.9141L13.7358 31.9722C14.2969 32.3031 14.9915 32.3114 15.5604 31.994L22.7555 27.9791ZM27.5004 24.287V32.5343C27.5004 33.1861 27.1544 33.7889 26.5915 34.1175L23.0269 36.1988C23.3809 36.6333 23.8141 37.0025 24.3082 37.2846C25.2419 37.8178 26.3333 38.0059 27.3916 37.816C28.4499 37.6261 29.4078 37.0703 30.098 36.2458C30.7881 35.4213 31.1665 34.3804 31.167 33.3052V29.9198C31.1667 29.8994 31.1667 29.8791 31.167 29.8587V24.9095L27.5004 22.8623V24.2197C27.5008 24.2422 27.5008 24.2646 27.5004 24.287ZM23.8338 23.1786L22.0075 24.1976L20.1671 23.1394V20.8136L21.9733 19.7763L23.8338 20.8151V23.1786ZM25.681 17.6469L33.8941 22.2326C34.4742 22.5565 34.8337 23.1689 34.8337 23.8333V28.0733C36.0686 27.8498 37.188 27.0929 37.8916 25.874C38.4929 24.8323 38.6559 23.5946 38.3447 22.4328C38.0335 21.271 37.2737 20.2804 36.2322 19.6789L36.2252 19.6748L29.2439 15.6007L25.681 17.6469ZM20.1671 16.5853L28.3382 11.8926C28.9075 11.5656 29.6082 11.568 30.1753 11.8989L33.7861 14.0061C33.9845 13.4835 34.0872 12.9252 34.0846 12.3577C34.0796 11.2822 33.6968 10.2426 33.0029 9.42077C32.3091 8.59894 31.3484 8.04719 30.2889 7.86201C29.2307 7.67706 28.1412 7.86952 27.2105 8.40574C27.2093 8.40641 27.2082 8.40708 27.207 8.40775L20.1671 12.5182V16.5853Z" fill="url(#paint0_linear_6_3916)"/>
                        <defs>
                            <linearGradient id="paint0_linear_6_3916" x1="1.83496" y1="2.44531" x2="49.9308" y2="24.987" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4D84FF"/>
                                <stop offset="1" stopColor="#DE8FFF"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <p className={'text-[24px] font-bold'}>Nerd</p>
                </div>

                <div className={'w-full mt-[16px] flex flex-col gap-[8px] text-[#747474] fill-[#747474] text-[20px]'}>
                    <Link href={"/dashboard/rewrite"}>
                        <div className={`w-full px-[16px] py-[16px] flex items-center gap-[8px] cursor-pointer border-[#9373EE] ${pathname.split("/").includes("rewrite") ? "border-l-[4px] bg-gradient-to-r from-[#F2EEFD] to-transparent fill-[#9373EE]" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 5C15 3.32672 16.3267 2 18 2C19.6733 2 21 3.32672 21 5V17C21 17.2652 20.8946 17.5196 20.7071 17.7071L18.7071 19.7071C18.5196 19.8946 18.2652 20 18 20H5C4.20435 20 3.44129 19.6839 2.87868 19.1213C2.31607 18.5587 2 17.7956 2 17C2 16.2044 2.31607 15.4413 2.87868 14.8787C3.44129 14.3161 4.20435 14 5 14H9C9.26522 14 9.51957 13.8946 9.70711 13.7071C9.89464 13.5196 10 13.2652 10 13C10 12.7348 9.89464 12.4804 9.70711 12.2929C9.51957 12.1054 9.26522 12 9 12H6C5.44772 12 5 11.5523 5 11C5 10.4477 5.44772 10 6 10H9C9.79565 10 10.5587 10.3161 11.1213 10.8787C11.6839 11.4413 12 12.2043 12 13C12 13.7957 11.6839 14.5587 11.1213 15.1213C10.5587 15.6839 9.79565 16 9 16H5C4.73478 16 4.48043 16.1054 4.29289 16.2929C4.10536 16.4804 4 16.7348 4 17C4 17.2652 4.10536 17.5196 4.29289 17.7071C4.48043 17.8946 4.73478 18 5 18H15.5858L15.2929 17.7071C15.1054 17.5196 15 17.2652 15 17V5ZM17 8V16.5858L18 17.5858L19 16.5858V8H17ZM19 6H17V5C17 4.43128 17.4313 4 18 4C18.5687 4 19 4.43128 19 5V6Z" fill={`${pathname.split("/").includes("rewrite") ? "#9373EE" : "#747474"}`}/>
                            </svg>


                            <p>ReWrite</p>
                        </div>
                    </Link>

                    <Link href={"/dashboard/translate"}>
                        <div className={`w-full px-[16px] py-[16px] flex items-center gap-[8px] cursor-pointer border-[#9373EE] ${pathname.split("/").includes("translate") ? "border-l-[4px] bg-gradient-to-r from-[#F2EEFD] to-transparent fill-[#9373EE]" : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9 2C9.55228 2 10 2.44772 10 3V4H11C11.5523 4 12 4.44772 12 5C12 5.55228 11.5523 6 11 6H9.96409C9.82107 7.97938 9.2571 9.78883 8.38337 11.1868C8.35403 11.2337 8.32427 11.2803 8.29408 11.3265C9.236 11.7144 10.4127 11.9681 11.7245 12.0003C12.2767 12.0139 12.7133 12.4724 12.6997 13.0245C12.6861 13.5767 12.2276 14.0133 11.6755 13.9997C9.8896 13.9559 8.23087 13.559 6.91466 12.8935C6.08473 13.5766 5.10007 14 4 14C3.44772 14 3 13.5523 3 13C3 12.4477 3.44772 12 4 12C4.39033 12 4.79264 11.891 5.18789 11.6659C4.47295 10.9415 4 10.0418 4 9C4 8.44772 4.44772 8 5 8C5.55228 8 6 8.44772 6 9C6 9.38079 6.17691 9.82002 6.6041 10.2566C6.63207 10.2141 6.65983 10.1708 6.68738 10.1267C7.34694 9.07149 7.8194 7.63725 7.95804 6H4C3.44772 6 3 5.55228 3 5C3 4.44772 3.44772 4 4 4H8V3C8 2.44772 8.44772 2 9 2ZM16 10C16.3952 10 16.7533 10.2327 16.9138 10.5939L20.9138 19.5939C21.1381 20.0985 20.9108 20.6895 20.4061 20.9138C19.9015 21.1381 19.3105 20.9108 19.0862 20.4061L18.4612 19H13.5388L12.9138 20.4061C12.6895 20.9108 12.0985 21.1381 11.5939 20.9138C11.0892 20.6895 10.8619 20.0985 11.0862 19.5939L15.0862 10.5939C15.2467 10.2327 15.6048 10 16 10ZM14.4277 17H17.5723L16 13.4622L14.4277 17Z" fill={`${pathname.split("/").includes("translate") ? "#9373EE" : "#747474"}`}/>
                            </svg>


                            <p>Translate</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={'w-full lg:w-[calc(100%-200px)]'}>
                <div className={'w-full h-[80px] py-[14px] px-[36px] border-b-[2px] border-[#F4F4F4] flex items-center justify-center'}>
                    <div className={'w-full flex items-center justify-between'}>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H20C20.2833 16 20.5208 16.0958 20.7125 16.2875C20.9042 16.4792 21 16.7167 21 17C21 17.2833 20.9042 17.5208 20.7125 17.7125C20.5208 17.9042 20.2833 18 20 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z" fill="#747474"/>
                            </svg>
                        </div>

                        <div className={'flex items-center gap-[12px]'}>
                            <button className={'p-[12px] rounded-[8px] border border-[#EFEFEF] flex items-center gap-[8px] text-[#747474]'}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.2636 5.88449C15.7826 4.59207 13.8777 3.89012 11.9122 3.91257C9.94669 3.93502 8.05825 4.6803 6.60716 6.0062C5.15608 7.33211 4.24393 9.14584 4.04473 11.1013C3.98877 11.6508 3.49799 12.0508 2.94854 11.9949C2.3991 11.9389 1.99906 11.4481 2.05503 10.8987C2.30402 8.45429 3.44421 6.18713 5.25807 4.52974C7.07192 2.87236 9.43247 1.94076 11.8893 1.9127C14.3462 1.88464 16.7274 2.76207 18.5787 4.3776C20.4299 5.99312 21.6216 8.23364 21.9263 10.6717C22.2311 13.1098 21.6276 15.5747 20.231 17.5962C18.8344 19.6177 16.7424 21.0543 14.3542 21.6318C11.966 22.2094 9.44882 21.8875 7.2828 20.7276C6.0101 20.0461 4.91101 19.1033 4.04988 17.9733V20C4.04988 20.5523 3.60217 21 3.04988 21C2.4976 21 2.04988 20.5523 2.04988 20V15C2.04988 14.4477 2.4976 14 3.04988 14H3.52655C3.54208 13.9996 3.55758 13.9996 3.57304 14H8.04988C8.60217 14 9.04988 14.4477 9.04988 15C9.04988 15.5523 8.60217 16 8.04988 16H5.12686C5.86637 17.244 6.93482 18.2726 8.22695 18.9645C9.95977 19.8924 11.9735 20.1499 13.8841 19.6879C15.7946 19.2258 17.4682 18.0766 18.5855 16.4594C19.7028 14.8422 20.1856 12.8702 19.9418 10.9198C19.698 8.96933 18.7446 7.17691 17.2636 5.88449ZM11.9999 7C12.5522 7 12.9999 7.44772 12.9999 8V11.5858L14.707 13.2929C15.0975 13.6834 15.0975 14.3166 14.707 14.7071C14.3165 15.0976 13.6833 15.0976 13.2928 14.7071L11.2928 12.7071C11.1053 12.5196 10.9999 12.2652 10.9999 12V8C10.9999 7.44772 11.4476 7 11.9999 7Z" fill="#747474"/>
                                </svg>

                                <p>
                                    History
                                </p>
                            </button>

                            <button className={'p-[12px] rounded-[8px] border border-[#EFEFEF] flex items-center gap-[8px] text-[#747474]'}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.1716 3.17157C15.9217 2.42143 16.9391 2 18 2C19.0609 2 20.0783 2.42143 20.8284 3.17157C21.5786 3.92172 22 4.93913 22 6C22 7.06087 21.5786 8.07828 20.8284 8.82843C20.0783 9.57857 19.0609 10 18 10C16.9391 10 15.9217 9.57857 15.1716 8.82843C15.0979 8.75477 15.0274 8.67853 14.9602 8.59993L9.91861 11.1971C9.97235 11.4594 10 11.7283 10 12C10 12.2717 9.97235 12.5406 9.91861 12.8029L14.9602 15.4001C15.0274 15.3215 15.0979 15.2452 15.1716 15.1716C15.9217 14.4214 16.9391 14 18 14C19.0609 14 20.0783 14.4214 20.8284 15.1716C21.5786 15.9217 22 16.9391 22 18C22 19.0609 21.5786 20.0783 20.8284 20.8284C20.0783 21.5786 19.0609 22 18 22C16.9391 22 15.9217 21.5786 15.1716 20.8284C14.4214 20.0783 14 19.0609 14 18C14 17.7283 14.0276 17.4594 14.0814 17.1971L9.03981 14.5999C8.97258 14.6785 8.90209 14.7548 8.82843 14.8284C8.07828 15.5786 7.06087 16 6 16C4.93913 16 3.92172 15.5786 3.17157 14.8284C2.42143 14.0783 2 13.0609 2 12C2 10.9391 2.42143 9.92172 3.17157 9.17157C3.92172 8.42143 4.93913 8 6 8C7.06087 8 8.07828 8.42143 8.82843 9.17157C8.90208 9.24523 8.97257 9.32146 9.03979 9.40005L14.0814 6.80287C14.0276 6.5406 14 6.27173 14 6C14 4.93913 14.4214 3.92172 15.1716 3.17157ZM16.2283 6.92788C16.2166 6.89895 16.2035 6.87031 16.189 6.84203C16.1828 6.83014 16.1765 6.81843 16.17 6.80689C16.0589 6.55504 16 6.28056 16 6C16 5.46957 16.2107 4.96086 16.5858 4.58579C16.9609 4.21071 17.4696 4 18 4C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6C20 6.53043 19.7893 7.03914 19.4142 7.41421C19.0391 7.78929 18.5304 8 18 8C17.4696 8 16.9609 7.78929 16.5858 7.41421C16.4414 7.26979 16.3213 7.10555 16.2283 6.92788ZM7.77178 11.0722C7.67874 10.8945 7.55867 10.7302 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12C4 12.5304 4.21071 13.0391 4.58579 13.4142C4.96086 13.7893 5.46957 14 6 14C6.53043 14 7.03914 13.7893 7.41421 13.4142C7.55864 13.2698 7.6787 13.1055 7.77174 12.9279C7.78338 12.8989 7.79646 12.8703 7.81103 12.842C7.81715 12.8301 7.82348 12.8184 7.83 12.8069C7.94105 12.5551 8 12.2806 8 12C8 11.7194 7.94103 11.4448 7.82994 11.193C7.82344 11.1815 7.81713 11.1698 7.81103 11.1579C7.79648 11.1297 7.78341 11.1011 7.77178 11.0722ZM16.17 17.193C16.059 17.4449 16 17.7194 16 18C16 18.5304 16.2107 19.0391 16.5858 19.4142C16.9609 19.7893 17.4696 20 18 20C18.5304 20 19.0391 19.7893 19.4142 19.4142C19.7893 19.0391 20 18.5304 20 18C20 17.4696 19.7893 16.9609 19.4142 16.5858C19.0391 16.2107 18.5304 16 18 16C17.4696 16 16.9609 16.2107 16.5858 16.5858C16.4413 16.7302 16.3213 16.8945 16.2282 17.0722C16.2166 17.1011 16.2035 17.1297 16.189 17.1579C16.1829 17.1698 16.1766 17.1815 16.17 17.193Z" fill="#747474"/>
                                </svg>


                                <p>
                                    Share
                                </p>
                            </button>
                        </div>
                    </div>

                </div>
                <div className={'w-full max-h-[calc(100vh-81px)] overflow-y-auto'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout