// "use client";

// import { useState, useContext } from "react";
// import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { signOut } from "@/lib/actions/auth-actions";
// // import { useState } from "react";
// import { auth } from "../../lib/auth";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useTheme } from "@/contexts/ThemeContext";
// import { MdEmail } from "react-icons/md";
// import { FaWallet, FaConnectdevelop } from "react-icons/fa";
// import { SiOkx, SiCoinbase } from "react-icons/si";

// type Session = typeof auth.$Infer.Session;

// export default function Header({ session }: { session: Session | null }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [connectOpen, setConnectOpen] = useState(false);
//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/auth");
//   };
//   const isActive = (path: string) => {
//     return pathname === path;
//   };

//   const [menuOpen, setMenuOpen] = useState(false);
//   // const [isDarkMode, setIsDarkMode] = useState(false);
//   const [languageOpen, setLanguageOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();

//   const [selectedLang, setSelectedLang] = useState("English");

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   // const toggleMode = () => setIsDarkMode(!isDarkMode);
//   const toggleLanguage = () => setLanguageOpen(!languageOpen);

//   const languages = [
//     { name: "English", flag: "/svg/english.png" },
//     { name: "Dutch", flag: "/svg/germany.png" },
//     { name: "Español", flag: "/svg/spain.png" },
//     { name: "Netherlands", flag: "/svg/netherland.png" },
//   ];

//   const handleLanguageSelect = (lang: string) => {
//     setSelectedLang(lang);
//     setLanguageOpen(false);
//   };

//   const selectedFlag =
//     languages.find((lang) => lang.name === selectedLang)?.flag ||
//     "/svg/english.png";

//   return (
//     <header className="header bg-white dark:bg-[#0a0a0a]">
//       <div className="header-container bg-white dark:bg-[#0a0a0a]">
//         <div className="flex gap-7 items-center">
//         <div>
//           {theme === "dark" ? (
//             <svg
//               width="115"
//               height="32"
//               viewBox="0 0 115 32"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               style={{transform: "translateY(2px)"}}
//             >
//               <g clip-path="url(#clip0_623_29714)">
//                 <path
//                   d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M30.0352 21.0644V8.08203H31.2666V13.6965H38.8607V8.08203H40.0736V21.0644H38.8607V14.7411H31.2666V21.0644H30.0352Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M43.2892 25.0005L44.9685 20.8223L41.3301 12.0928H42.5989L44.9872 18.0057C45.124 18.3663 45.3168 18.8451 45.5656 19.442C45.6029 19.3549 45.6402 19.2586 45.6776 19.1529C45.7149 19.0472 45.7522 18.9508 45.7895 18.8638C45.8642 18.7021 45.9295 18.5498 45.9854 18.4068C46.0414 18.2638 46.0943 18.1239 46.144 17.9871L48.3831 12.0928H49.5959L44.5021 25.0005H43.2892Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M50.8262 25V12.0922H51.983V13.7336C52.2816 13.1741 52.7138 12.7171 53.2798 12.3627C53.8458 12.0083 54.4771 11.8311 55.1737 11.8311C56.0071 11.8311 56.7317 12.0331 57.3474 12.4373C57.9631 12.8414 58.4358 13.401 58.7655 14.116C59.0951 14.8311 59.2599 15.6425 59.2599 16.5502C59.2599 17.458 59.0889 18.2912 58.7468 19.0124C58.4047 19.7336 57.9227 20.2994 57.3007 20.7098C56.6788 21.1202 55.9698 21.3254 55.1737 21.3254C54.5019 21.3254 53.8831 21.1637 53.3171 20.8404C52.7511 20.5171 52.3064 20.0445 51.983 19.4228V25H50.8262ZM55.0057 20.3927C55.6152 20.3927 56.1532 20.2311 56.6197 19.9077C57.0862 19.5844 57.4438 19.1336 57.6926 18.5554C57.9414 17.9772 58.0658 17.3088 58.0658 16.5502C58.0658 15.7917 57.9383 15.1637 57.6833 14.5917C57.4283 14.0197 57.0706 13.5751 56.6104 13.258C56.1501 12.9409 55.6152 12.7824 55.0057 12.7824C54.3962 12.7824 53.8769 12.9378 53.4104 13.2487C52.9439 13.5596 52.5801 14.001 52.3189 14.573C52.0576 15.145 51.927 15.8041 51.927 16.5502C51.927 17.2963 52.0576 17.9772 52.3189 18.5554C52.5801 19.1336 52.9408 19.5844 53.4011 19.9077C53.8613 20.2311 54.3962 20.3927 55.0057 20.3927Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M64.7835 21.3254C63.9376 21.3254 63.1944 21.1388 62.5538 20.7658C61.9132 20.3927 61.4156 19.8456 61.0611 19.1243C60.7066 18.4031 60.5293 17.5388 60.5293 16.5316C60.5293 15.6362 60.7128 14.8311 61.0797 14.116C61.4467 13.401 61.9474 12.8414 62.5818 12.4373C63.2162 12.0331 63.9252 11.8311 64.7089 11.8311C65.5547 11.8311 66.2762 12.0238 66.8733 12.4093C67.4703 12.7948 67.9244 13.3388 68.2354 14.0414C68.5463 14.744 68.7018 15.5616 68.7018 16.4943V16.7368H61.6861C61.6861 17.5077 61.8167 18.1668 62.078 18.714C62.3392 19.2611 62.7062 19.6777 63.1788 19.9637C63.6515 20.2497 64.1926 20.3927 64.8021 20.3927C65.5236 20.3927 66.1238 20.2217 66.6027 19.8798C67.0816 19.5378 67.3771 19.0248 67.489 18.3409H68.6458C68.5588 18.9129 68.3566 19.4228 68.0394 19.8704C67.7222 20.3181 67.2869 20.6725 66.7333 20.9336C66.1798 21.1948 65.5298 21.3254 64.7835 21.3254ZM67.4703 15.8601C67.4579 14.9274 67.2091 14.1813 66.724 13.6217C66.2389 13.0621 65.5672 12.7824 64.7089 12.7824C63.8506 12.7824 63.1882 13.0715 62.6471 13.6497C62.106 14.2279 61.7981 14.9647 61.7235 15.8601H67.4703Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M70.4904 21.0645V12.0924H71.6472V13.8831C71.896 13.2862 72.2848 12.795 72.8134 12.4095C73.3421 12.024 73.9609 11.8313 74.67 11.8313C74.8441 11.8313 75.012 11.8437 75.1737 11.8686V12.9878C74.9623 12.9629 74.7757 12.9505 74.614 12.9505C74.0169 12.9505 73.4945 13.0841 73.0466 13.3515C72.5988 13.6189 72.2537 14.0012 72.0111 14.4987C71.7685 14.9961 71.6472 15.5743 71.6472 16.2334V21.0645H70.4904Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M78.0471 20.8158L77.9942 21.0676H74.334L74.3869 20.8158C75.3975 20.707 75.8111 20.4179 75.9728 19.6625L78.0284 9.97852C78.2461 8.98681 77.9382 8.82515 76.8933 9.03966L76.9462 8.78785L79.1821 8.0293H79.434L76.9618 19.6593C76.8 20.4179 77.0706 20.7039 78.044 20.8127L78.0471 20.8158Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M82.1701 20.8158L82.1173 21.0676H78.457L78.5099 20.8158C79.5206 20.707 79.9342 20.4179 80.0959 19.6625L81.3398 13.765C81.5575 12.7547 81.2683 12.6117 80.2047 12.8262L80.2576 12.5744L82.4935 11.8158H82.7454L81.0848 19.6594C80.9231 20.4179 81.1936 20.7039 82.167 20.8127L82.1701 20.8158ZM82.7828 8.55469C83.271 8.55469 83.5944 8.93396 83.5415 9.41894C83.47 9.90702 83.0378 10.2676 82.5682 10.2676C82.0644 10.2676 81.7192 9.90702 81.7938 9.41894C81.8467 8.93085 82.2821 8.55469 82.7859 8.55469H82.7828Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M88.4734 23.6663L89.4779 19.028C88.8466 20.3989 87.5312 21.3347 86.1411 21.3347C83.9052 21.3347 82.8572 19.2238 83.5258 16.0684C83.9953 13.7772 86.0509 11.8124 88.4859 11.8124C89.6054 11.8124 90.5228 12.316 90.9022 13.0559L91.7512 11.8124H92.003L89.4655 23.6601C89.2851 24.4715 89.935 24.6331 90.585 24.7419L90.5321 24.9938H86.3308L86.3837 24.7419C87.5934 24.6331 88.2962 24.4715 88.4765 23.6601L88.4734 23.6663ZM86.7382 20.6694C87.8919 20.6694 89.0456 19.6777 89.5867 18.487L90.3455 14.9337C90.5446 13.6528 89.9319 12.3191 88.1811 12.3191C86.4303 12.3191 85.062 13.8331 84.6111 16.0497C84.0327 18.773 84.8443 20.6663 86.7382 20.6663V20.6694Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M104.518 20.8158L104.465 21.0676H100.805L100.858 20.8158C101.868 20.707 102.282 20.4179 102.444 19.6625L103.687 13.765C103.905 12.7547 103.616 12.6117 102.552 12.8262L102.605 12.5744L104.841 11.8158H105.093L103.432 19.6594C103.271 20.4179 103.541 20.7039 104.515 20.8127L104.518 20.8158ZM105.13 8.55469C105.619 8.55469 105.942 8.93396 105.889 9.41894C105.818 9.90702 105.385 10.2676 104.916 10.2676C104.412 10.2676 104.067 9.90702 104.141 9.41894C104.194 8.93085 104.63 8.55469 105.134 8.55469H105.13Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M99.3212 19.6401L100.152 15.6795L100.969 11.8184H100.717L98.4815 12.5769L98.4287 12.8287C99.4736 12.6111 99.7814 12.7572 99.5638 13.7676L98.5002 18.7976C97.3278 19.8982 96.4975 20.5479 95.4868 20.5479C94.2429 20.5479 93.593 19.6992 93.9008 18.2412L95.2722 11.8215H95.0203L92.7658 12.58L92.7129 12.8318C93.7764 12.6142 94.0656 12.7603 93.8666 13.7707L92.8933 18.3873C92.5139 20.1002 93.3815 21.3437 94.9861 21.3437C96.0497 21.3437 96.9857 20.75 98.4256 19.2049L98.3572 19.5313V19.5469H98.354L98.0306 21.0764H100.354L100.407 20.8028C99.4331 20.694 99.1626 20.4049 99.3243 19.6494L99.3212 19.6401Z"
//                   fill="white"
//                 ></path>
//                 <path
//                   d="M114.269 11.4801L114.996 8.0293H114.745L112.509 8.78785L112.456 9.03966C113.501 8.82204 113.809 8.98681 113.591 9.97852L112.96 12.9163C112.562 12.248 111.697 11.8158 110.686 11.8158C108.233 11.8158 106.196 13.7619 105.673 16.2334C105.042 19.2272 106.071 21.335 108.326 21.335C109.732 21.335 111.069 20.3806 111.681 19.0096L111.52 19.7961L111.249 21.0645L113.572 21.0459L113.625 20.7941C112.652 20.6853 112.381 20.3961 112.543 19.6407L114.266 11.4801H114.269ZM111.787 18.4687C111.246 19.678 110.092 20.6697 108.92 20.6697C107.026 20.6697 106.214 18.7764 106.756 16.2148C107.259 13.8334 108.702 12.3195 110.382 12.3195C112.173 12.3195 112.77 13.7402 112.534 15.0334L112.45 15.4252L111.79 18.4687H111.787Z"
//                   fill="white"
//                 ></path>
//               </g>
//               <defs>
//                 <clipPath id="clip0_623_29714">
//                   <rect width="115" height="32" fill="white"></rect>
//                 </clipPath>
//               </defs>
//             </svg>
//           ) : (
//             <svg
//               width="115"
//               height="32"
//               viewBox="0 0 115 32"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               style={{ transform: "translateY(2px)" }}
//             >
//               <g clipPath="url(#clip0_623_29714)">
//                 <path
//                   d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
//                   fill="black"
//                 />
//                 {/* Paste the rest of your <path /> elements here */}
//               </g>
//               <defs>
//                 <clipPath id="clip0_623_29714">
//                   <rect width="115" height="32" fill="white" />
//                 </clipPath>
//               </defs>
//             </svg>
//           )}
//         </div>

//         {/*
// className="
// */}
//         <nav className="navigation">
//           <div className="nav-list flex items-center justify-start gap-12 text-black dark:text-white font-medium text-sm mt-1">
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Chart">Trade</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3] dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Account/Deposit">Wallet</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Portfolio">Portfolio</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Earn">Earn</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Vault">Vaults</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Staking">Staking</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Referrals">Referrals</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Leaderboard">Leaderboard</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3]  dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Account">Account</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3] dark:hover:text-[#46c4b3]"
//             >
//               <Link className="font-[400] text-[12px]" href="/Faq">FAQ</Link>
//             </li>
//             <li
//               className="menu-item relative
//   after:content-[''] after:absolute after:left-0 after:bottom-0
//   after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
//   after:transition-all after:duration-300
//   hover:after:w-full hover:text-[#46c4b3] dark:hover:text-[#46c4b3] "
//             >
//               <Link className="font-[400] text-[12px]" href="/Support">Support</Link>
//             </li>
//           </div>
//         </nav>
//         </div>

//         <div className="header-buttons flex items-center gap-2 relative">
//           {!session ? (
//             <>
//               {/* <Link
//                 href="/Account/Login"
//                 className="border border-2 border-[#46c4b3] dark:border-[#50D2C1] py-2 px-4 dark:hover:bg-[#50D2C1] hover:bg-[#46c4b3]  rounded-xl dark:button dark:login-button "
//               >
//                 <span className="text-black font-normal dark:text-[#50D2C1] dark:hover:text-black ">
//                   Log In
//                 </span>
//               </Link> */}
//               <button
//                 onClick={() => setConnectOpen(true)}
//                 className="font-[400] text-[12px] text-black dark:text-black py-2 px-4 bg-[#46c4b3] rounded-lg"
//               >
//                 Connect
//               </button>

//               <Link
//                 href="/Account/Register"
//                 className="font-[400] text-[12px] py-2 px-4 bg-[#46c4b3] rounded-lg"
//               >
//                 <span className="text-black font-normal">Sign Up</span>
//               </Link>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={handleSignOut}
//                 className="bg-[#46c4b3] p-3 rounded-lg"
//               >
//                 Log Out
//               </button>
//             </>
//           )}

//           <div className="relative">
//             {/* <button
//               onClick={toggleLanguage}
//               className="flex items-center gap-2 p-1 rounded-md border border-gray-300 border-gray-700  hover:bg-gray-800 transition "
//             >
//               <Image
//                 src={selectedFlag}
//                 alt={selectedLang}
//                 width={20}
//                 height={20}
//                 className="rounded-full"
//               />
//               <span className="text-sm font-medium">{selectedLang}</span>
//               <ChevronDown size={16} />
//             </button> */}
//             <button
//               onClick={toggleLanguage}
//               className="language-icon-btn hover:bg-[#46c4b3]  text-black dark:text-white border border-gray-700 rounded-lg p-2"
//               aria-label="Change Language"
//             >
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 14 14"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M7.0001 0.332031C10.6826 0.332031 13.6678 3.31726 13.6678 6.99973C13.6678 10.6822 10.6826 13.6674 7.0001 13.6674C3.31762 13.6674 0.332397 10.6822 0.332397 6.99973C0.332397 3.31726 3.31762 0.332031 7.0001 0.332031Z
//                     M8.95937 9.99953H5.04082C5.47552 11.609 6.2311 12.6674 7.0001 12.6674C7.7691 12.6674 8.52464 11.609 8.95937 9.99953Z
//                     M4.00564 9.99993L2.19064 9.99986C2.82954 11.0219 3.78517 11.8256 4.92009 12.2736C4.5719 11.7271 4.28458 11.0429 4.07324 10.2633L4.00564 9.99993Z
//                     M11.8096 9.99986L9.99457 9.99993C9.7787 10.8891 9.46697 11.6663 9.07937 12.2736C10.144 11.8536 11.0505 11.1209 11.6861 10.1889L11.8096 9.99986Z
//                     M3.72904 5.66596H1.49064C1.38608 6.10166 1.3324 6.5444 1.3324 6.99973C1.3324 7.70386 1.46078 8.37793 1.69544 8.99993H3.81088C3.71601 8.36693 3.66573 7.6948 3.66573 6.99973C3.66573 6.54373 3.68737 6.0976 3.72904 5.66596Z
//                     M9.2647 5.666H4.73548C4.69013 6.09286 4.66572 6.53933 4.66572 6.99973C4.66572 7.70606 4.72316 8.3796 4.82555 8.9998H9.17464C9.27704 8.3796 9.33444 7.70606 9.33444 6.99973C9.33444 6.53933 9.31004 6.09286 9.2647 5.666Z
//                     M12.5098 5.6654H10.2712C10.3128 6.0976 10.3344 6.54373 10.3344 6.99973C10.3344 7.6948 10.2842 8.36693 10.1893 8.99966H12.3048C12.5394 8.37793 12.6678 7.70386 12.6678 6.99973C12.6678 6.54013 12.6131 6.09333 12.5098 5.6654Z
//                     M4.9208 1.72583C3.54065 2.27478 2.43664 3.33299 1.83352 4.66623H3.8656C4.07451 3.49795 4.43907 2.48066 4.9208 1.72583Z
//                     M7.0001 1.33203C6.07937 1.41273 5.26438 2.74738 4.8859 4.6662H9.1143C8.73684 2.75276 7.92537 1.42022 7.0843 1.33624L7.0001 1.33203Z
//                     M9.0801 1.72587C9.59744 2.58358 9.93624 3.55683 10.1346 4.66648H12.1666C11.5902 3.39196 10.5562 2.36894 9.27424 1.80672L9.0801 1.72587Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             </button>

//             {languageOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-200 border-gray-700 rounded-lg shadow-lg z-50">
//                 <ul className="py-2">
//                   {languages.map((lang) => (
//                     <li key={lang.name}>
//                       <button
//                         onClick={() => handleLanguageSelect(lang.name)}
//                         className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
//                       >
//                         <Image
//                           src={lang.flag}
//                           alt={lang.name}
//                           width={18}
//                           height={18}
//                           className="rounded-full"
//                         />
//                         {lang.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={toggleTheme}
//             className="p-1 rounded-md dark:border-gray-700 hover:bg-[#46c4b3] dark:hover:bg-gray-800 transition border border-gray-700 rounded-lg p-2"
//           >
//             {theme === "dark" ? (
//               <Sun size={15} className="text-white" />
//             ) : (
//               <Moon size={15} className="text-gray-700 dark:text-gray-200" />
//             )}
//           </button>
//         </div>

//         <button
//           onClick={toggleMenu}
//           className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//         >
//           {menuOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {connectOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
//           <div className="relative w-[380px] rounded-2xl bg-[#0b141b] p-6 shadow-2xl border border-white/10">
//             {/* Close */}
//             <button
//               onClick={() => setConnectOpen(false)}
//               className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl transition"
//             >
//               ✕
//             </button>

//             {/* Title */}
//             <h2 className="mb-5 text-center text-lg font-semibold text-white">
//               Connect
//             </h2>

//             {/* Button */}
//             <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
//               <MdEmail size={18} />
//               <span className="text-sm font-medium text-white">
//                 Log in with Email
//               </span>
//             </div>

//             {/* Divider */}
//             <div className="my-4 flex items-center gap-3">
//               <div className="h-px flex-1 bg-white/10" />
//               <span className="text-xs text-gray-400">OR</span>
//               <div className="h-px flex-1 bg-white/10" />
//             </div>

//             <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
//               <FaWallet size={18} />
//               <span className="text-sm font-medium text-white">
//                 Default Wallet
//               </span>
//             </div>

//             <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
//               <FaConnectdevelop size={18} />
//               <span className="text-sm font-medium text-white">
//                 WalletConnect
//               </span>
//             </div>

//             <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
//               <SiOkx size={18} />
//               <span className="text-sm font-medium text-white">OKX Wallet</span>
//             </div>

//             <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
//               <SiCoinbase size={18} />
//               <span className="text-sm font-medium text-white">
//                 Coinbase Wallet
//               </span>
//             </div>
//           </div>
//         </div>
//       )}

//       {menuOpen && (
//         <div className="md:hidden bg-[#0a0a0a] border-t border-gray-800 shadow-lg pb-4">
//           <div className="flex items-right justify-end gap-3 py-4 px-4">
//             {!session ? (
//               <>
//                 {/* <Link
//                   href="/Account/Login"
//                   onClick={() => setMenuOpen(false)}
//                   className="text-center border p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition button login-button"
//                 >
//                   Log In
//                 </Link> */}
//                 <button
//                   onClick={() => setConnectOpen(true)}
//                   className="text-black dark:text-black dark:bg-[#50D2C1] dark:hover:bg-yellow-600 py-1 px-4 bg-[#50d2c1] rounded-xl"
//                 >
//                   Connect
//                 </button>
//                 <Link
//                   href="/Account/Register"
//                   onClick={() => setMenuOpen(false)}
//                   className="text-white bg-[#50d2c1] p-1 rounded-md hover:bg-yellow-700"
//                 >
//                   <span className="text-white">Sign Up</span>
//                 </Link>
//               </>
//             ) : (
//               <>
//                 <button
//                   onClick={handleSignOut}
//                   className="bg-[#50d2c1] hover:bg-yellow-600-white p-3 rounded-md"
//                 >
//                   Log Out
//                 </button>
//               </>
//             )}

//             <button
//               onClick={toggleTheme}
//               className="p-2 rounded-md dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               {theme === "dark" ? (
//                 <Sun size={20} className="text-white" />
//               ) : (
//                 <Moon size={20} className="text-gray-700 dark:text-gray-200" />
//               )}
//             </button>
//           </div>

//           <nav className="flex flex-col items-center text-[12px] font-[400] gap-4 py-6">
//             <Link href="/Chart" className="text-[12px] font-[400]" onClick={() => setMenuOpen(false)}>
//               Trade
//             </Link>

//             <Link href="/Account/Deposit" onClick={() => setMenuOpen(false)}>
//               Wallet
//             </Link>

//             <Link href="/Portfolio" onClick={() => setMenuOpen(false)}>
//               Portfolio
//             </Link>

//             <Link href="/Earn" onClick={() => setMenuOpen(false)}>
//               Earn
//             </Link>

//             <Link href="/Vault" onClick={() => setMenuOpen(false)}>
//               Vaults
//             </Link>

//             <Link href="/Staking" onClick={() => setMenuOpen(false)}>
//               Staking
//             </Link>

//             <Link href="/Referrals" onClick={() => setMenuOpen(false)}>
//               Referrals
//             </Link>

//             <Link href="/Leaderboard" onClick={() => setMenuOpen(false)}>
//               Leaderboard
//             </Link>

//             <Link href="/Account" onClick={() => setMenuOpen(false)}>
//               Account
//             </Link>

//             <Link href="/Faq" onClick={() => setMenuOpen(false)}>
//               FAQ
//             </Link>

//             <Link href="/Support" onClick={() => setMenuOpen(false)}>
//               Support
//             </Link>
//           </nav>

//           <div className="border border-gray-500 my-3"></div>
//           <div className="relative  flex items-center justify-center w-full ">
//             <button
//               onClick={toggleLanguage}
//               className="flex  w-4/5 justify-center items-center gap-2 p-2 rounded-md border border-gray-300 border-gray-700  hover:bg-gray-800 transition"
//             >
//               <Image
//                 src={selectedFlag}
//                 alt={selectedLang}
//                 width={20}
//                 height={20}
//                 className="rounded-full"
//               />
//               <span className="text-sm font-medium">{selectedLang}</span>
//               <ChevronDown size={16} />
//             </button>

//             {languageOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-gray-900 border-gray-700 rounded-lg shadow-lg z-50">
//                 <ul className="py-2">
//                   {languages.map((lang) => (
//                     <li key={lang.name}>
//                       <button
//                         onClick={() => handleLanguageSelect(lang.name)}
//                         className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
//                       >
//                         <Image
//                           src={lang.flag}
//                           alt={lang.name}
//                           width={18}
//                           height={18}
//                           className="rounded-full"
//                         />
//                         {lang.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "../../lib/auth";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { MdEmail } from "react-icons/md";
import { FaWallet, FaConnectdevelop } from "react-icons/fa";
import { SiOkx, SiCoinbase } from "react-icons/si";

type Session = typeof auth.$Infer.Session;

// -----------------  CONSTANT NAV LINKS  -----------------

const MAIN_LINKS = [
  { href: "/", label: "Trade" },
  { href: "/Portfolio", label: "Portfolio" },
  { href: "/Earn", label: "Earn" },
  { href: "/Vault", label: "Vaults" },
  { href: "/Staking", label: "Staking" },
  { href: "/Referrals", label: "Referrals" },
  { href: "/Leaderboard", label: "Leaderboard" },
];

const EXTRA_LINKS = [  
  { href: "/", label: "Testnet" },
  { href: "/", label: "explorer" },
  { href: "/", label: "sub-Accounts" },
  { href: "/", label: "API" },
  { href: "/", label: "Multi-Sig" },
  { href: "/", label: "Points" },
  { href: "/", label: "funding comparison" },
  { href: "/", label: "Announcements" },
  { href: "/", label: "State" },
  { href: "/", label: "Docs" },
  { href: "/Account/Deposit", label: "Wallet" },
  { href: "/Account", label: "Account" },
  { href: "/Faq", label: "FAQ" },
  { href: "/Support", label: "Support" },

];

// -----------------  LOGO COMPONENT  -----------------

function Logo({ theme, className }: { theme: string; className?: string }) {
  return (
    <div className={className}>
      {theme === "dark" ? (
        <svg
          width="115"
          height="32"
          viewBox="0 0 115 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "translateY(2px)" }}
        >
          <g clipPath="url(#clip0_623_29714)">
            <path
              d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
              fill="white"
            ></path>
            <path
              d="M30.0352 21.0644V8.08203H31.2666V13.6965H38.8607V8.08203H40.0736V21.0644H38.8607V14.7411H31.2666V21.0644H30.0352Z"
              fill="white"
            ></path>
            <path
              d="M43.2892 25.0005L44.9685 20.8223L41.3301 12.0928H42.5989L44.9872 18.0057C45.124 18.3663 45.3168 18.8451 45.5656 19.442C45.6029 19.3549 45.6402 19.2586 45.6776 19.1529C45.7149 19.0472 45.7522 18.9508 45.7895 18.8638C45.8642 18.7021 45.9295 18.5498 45.9854 18.4068C46.0414 18.2638 46.0943 18.1239 46.144 17.9871L48.3831 12.0928H49.5959L44.5021 25.0005H43.2892Z"
              fill="white"
            ></path>
            <path
              d="M50.8262 25V12.0922H51.983V13.7336C52.2816 13.1741 52.7138 12.7171 53.2798 12.3627C53.8458 12.0083 54.4771 11.8311 55.1737 11.8311C56.0071 11.8311 56.7317 12.0331 57.3474 12.4373C57.9631 12.8414 58.4358 13.401 58.7655 14.116C59.0951 14.8311 59.2599 15.6425 59.2599 16.5502C59.2599 17.458 59.0889 18.2912 58.7468 19.0124C58.4047 19.7336 57.9227 20.2994 57.3007 20.7098C56.6788 21.1202 55.9698 21.3254 55.1737 21.3254C54.5019 21.3254 53.8831 21.1637 53.3171 20.8404C52.7511 20.5171 52.3064 20.0445 51.983 19.4228V25H50.8262ZM55.0057 20.3927C55.6152 20.3927 56.1532 20.2311 56.6197 19.9077C57.0862 19.5844 57.4438 19.1336 57.6926 18.5554C57.9414 17.9772 58.0658 17.3088 58.0658 16.5502C58.0658 15.7917 57.9383 15.1637 57.6833 14.5917C57.4283 14.0197 57.0706 13.5751 56.6104 13.258C56.1501 12.9409 55.6152 12.7824 55.0057 12.7824C54.3962 12.7824 53.8769 12.9378 53.4104 13.2487C52.9439 13.5596 52.5801 14.001 52.3189 14.573C52.0576 15.145 51.927 15.8041 51.927 16.5502C51.927 17.2963 52.0576 17.9772 52.3189 18.5554C52.5801 19.1336 52.9408 19.5844 53.4011 19.9077C53.8613 20.2311 54.3962 20.3927 55.0057 20.3927Z"
              fill="white"
            ></path>
            <path
              d="M64.7835 21.3254C63.9376 21.3254 63.1944 21.1388 62.5538 20.7658C61.9132 20.3927 61.4156 19.8456 61.0611 19.1243C60.7066 18.4031 60.5293 17.5388 60.5293 16.5316C60.5293 15.6362 60.7128 14.8311 61.0797 14.116C61.4467 13.401 61.9474 12.8414 62.5818 12.4373C63.2162 12.0331 63.9252 11.8311 64.7089 11.8311C65.5547 11.8311 66.2762 12.0238 66.8733 12.4093C67.4703 12.7948 67.9244 13.3388 68.2354 14.0414C68.5463 14.744 68.7018 15.5616 68.7018 16.4943V16.7368H61.6861C61.6861 17.5077 61.8167 18.1668 62.078 18.714C62.3392 19.2611 62.7062 19.6777 63.1788 19.9637C63.6515 20.2497 64.1926 20.3927 64.8021 20.3927C65.5236 20.3927 66.1238 20.2217 66.6027 19.8798C67.0816 19.5378 67.3771 19.0248 67.489 18.3409H68.6458C68.5588 18.9129 68.3566 19.4228 68.0394 19.8704C67.7222 20.3181 67.2869 20.6725 66.7333 20.9336C66.1798 21.1948 65.5298 21.3254 64.7835 21.3254ZM67.4703 15.8601C67.4579 14.9274 67.2091 14.1813 66.724 13.6217C66.2389 13.0621 65.5672 12.7824 64.7089 12.7824C63.8506 12.7824 63.1882 13.0715 62.6471 13.6497C62.106 14.2279 61.7981 14.9647 61.7235 15.8601H67.4703Z"
              fill="white"
            ></path>
            <path
              d="M70.4904 21.0645V12.0924H71.6472V13.8831C71.896 13.2862 72.2848 12.795 72.8134 12.4095C73.3421 12.024 73.9609 11.8313 74.67 11.8313C74.8441 11.8313 75.012 11.8437 75.1737 11.8686V12.9878C74.9623 12.9629 74.7757 12.9505 74.614 12.9505C74.0169 12.9505 73.4945 13.0841 73.0466 13.3515C72.5988 13.6189 72.2537 14.0012 72.0111 14.4987C71.7685 14.9961 71.6472 15.5743 71.6472 16.2334V21.0645H70.4904Z"
              fill="white"
            ></path>
            <path
              d="M78.0471 20.8158L77.9942 21.0676H74.334L74.3869 20.8158C75.3975 20.707 75.8111 20.4179 75.9728 19.6625L78.0284 9.97852C78.2461 8.98681 77.9382 8.82515 76.8933 9.03966L76.9462 8.78785L79.1821 8.0293H79.434L76.9618 19.6593C76.8 20.4179 77.0706 20.7039 78.044 20.8127L78.0471 20.8158Z"
              fill="white"
            ></path>
            <path
              d="M82.1701 20.8158L82.1173 21.0676H78.457L78.5099 20.8158C79.5206 20.707 79.9342 20.4179 80.0959 19.6625L81.3398 13.765C81.5575 12.7547 81.2683 12.6117 80.2047 12.8262L80.2576 12.5744L82.4935 11.8158H82.7454L81.0848 19.6594C80.9231 20.4179 81.1936 20.7039 82.167 20.8127L82.1701 20.8158ZM82.7828 8.55469C83.271 8.55469 83.5944 8.93396 83.5415 9.41894C83.47 9.90702 83.0378 10.2676 82.5682 10.2676C82.0644 10.2676 81.7192 9.90702 81.7938 9.41894C81.8467 8.93085 82.2821 8.55469 82.7859 8.55469H82.7828Z"
              fill="white"
            ></path>
            <path
              d="M88.4734 23.6663L89.4779 19.028C88.8466 20.3989 87.5312 21.3347 86.1411 21.3347C83.9052 21.3347 82.8572 19.2238 83.5258 16.0684C83.9953 13.7772 86.0509 11.8124 88.4859 11.8124C89.6054 11.8124 90.5228 12.316 90.9022 13.0559L91.7512 11.8124H92.003L89.4655 23.6601C89.2851 24.4715 89.935 24.6331 90.585 24.7419L90.5321 24.9938H86.3308L86.3837 24.7419C87.5934 24.6331 88.2962 24.4715 88.4765 23.6601L88.4734 23.6663ZM86.7382 20.6694C87.8919 20.6694 89.0456 19.6777 89.5867 18.487L90.3455 14.9337C90.5446 13.6528 89.9319 12.3191 88.1811 12.3191C86.4303 12.3191 85.062 13.8331 84.6111 16.0497C84.0327 18.773 84.8443 20.6663 86.7382 20.6663V20.6694Z"
              fill="white"
            ></path>
            <path
              d="M104.518 20.8158L104.465 21.0676H100.805L100.858 20.8158C101.868 20.707 102.282 20.4179 102.444 19.6625L103.687 13.765C103.905 12.7547 103.616 12.6117 102.552 12.8262L102.605 12.5744L104.841 11.8158H105.093L103.432 19.6594C103.271 20.4179 103.541 20.7039 104.515 20.8127L104.518 20.8158ZM105.13 8.55469C105.619 8.55469 105.942 8.93396 105.889 9.41894C105.818 9.90702 105.385 10.2676 104.916 10.2676C104.412 10.2676 104.067 9.90702 104.141 9.41894C104.194 8.93085 104.63 8.55469 105.134 8.55469H105.13Z"
              fill="white"
            ></path>
            <path
              d="M99.3212 19.6401L100.152 15.6795L100.969 11.8184H100.717L98.4815 12.5769L98.4287 12.8287C99.4736 12.6111 99.7814 12.7572 99.5638 13.7676L98.5002 18.7976C97.3278 19.8982 96.4975 20.5479 95.4868 20.5479C94.2429 20.5479 93.593 19.6992 93.9008 18.2412L95.2722 11.8215H95.0203L92.7658 12.58L92.7129 12.8318C93.7764 12.6142 94.0656 12.7603 93.8666 13.7707L92.8933 18.3873C92.5139 20.1002 93.3815 21.3437 94.9861 21.3437C96.0497 21.3437 96.9857 20.75 98.4256 19.2049L98.3572 19.5313V19.5469H98.354L98.0306 21.0764H100.354L100.407 20.8028C99.4331 20.694 99.1626 20.4049 99.3243 19.6494L99.3212 19.6401Z"
              fill="white"
            ></path>
            <path
              d="M114.269 11.4801L114.996 8.0293H114.745L112.509 8.78785L112.456 9.03966C113.501 8.82204 113.809 8.98681 113.591 9.97852L112.96 12.9163C112.562 12.248 111.697 11.8158 110.686 11.8158C108.233 11.8158 106.196 13.7619 105.673 16.2334C105.042 19.2272 106.071 21.335 108.326 21.335C109.732 21.335 111.069 20.3806 111.681 19.0096L111.52 19.7961L111.249 21.0645L113.572 21.0459L113.625 20.7941C112.652 20.6853 112.381 20.3961 112.543 19.6407L114.266 11.4801H114.269ZM111.787 18.4687C111.246 19.678 110.092 20.6697 108.92 20.6697C107.026 20.6697 106.214 18.7764 106.756 16.2148C107.259 13.8334 108.702 12.3195 110.382 12.3195C112.173 12.3195 112.77 13.7402 112.534 15.0334L112.45 15.4252L111.79 18.4687H111.787Z"
              fill="white"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_623_29714">
              <rect width="115" height="32" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="115"
          height="32"
          viewBox="0 0 115 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "translateY(2px)" }}
        >
          <g clipPath="url(#clip0_623_29714)">
            <path
              d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
              fill="black"
            ></path>
            <path
              d="M30.0352 21.0644V8.08203H31.2666V13.6965H38.8607V8.08203H40.0736V21.0644H38.8607V14.7411H31.2666V21.0644H30.0352Z"
              fill="black"
            ></path>
            <path
              d="M43.2892 25.0005L44.9685 20.8223L41.3301 12.0928H42.5989L44.9872 18.0057C45.124 18.3663 45.3168 18.8451 45.5656 19.442C45.6029 19.3549 45.6402 19.2586 45.6776 19.1529C45.7149 19.0472 45.7522 18.9508 45.7895 18.8638C45.8642 18.7021 45.9295 18.5498 45.9854 18.4068C46.0414 18.2638 46.0943 18.1239 46.144 17.9871L48.3831 12.0928H49.5959L44.5021 25.0005H43.2892Z"
              fill="black"
            ></path>
            <path
              d="M50.8262 25V12.0922H51.983V13.7336C52.2816 13.1741 52.7138 12.7171 53.2798 12.3627C53.8458 12.0083 54.4771 11.8311 55.1737 11.8311C56.0071 11.8311 56.7317 12.0331 57.3474 12.4373C57.9631 12.8414 58.4358 13.401 58.7655 14.116C59.0951 14.8311 59.2599 15.6425 59.2599 16.5502C59.2599 17.458 59.0889 18.2912 58.7468 19.0124C58.4047 19.7336 57.9227 20.2994 57.3007 20.7098C56.6788 21.1202 55.9698 21.3254 55.1737 21.3254C54.5019 21.3254 53.8831 21.1637 53.3171 20.8404C52.7511 20.5171 52.3064 20.0445 51.983 19.4228V25H50.8262ZM55.0057 20.3927C55.6152 20.3927 56.1532 20.2311 56.6197 19.9077C57.0862 19.5844 57.4438 19.1336 57.6926 18.5554C57.9414 17.9772 58.0658 17.3088 58.0658 16.5502C58.0658 15.7917 57.9383 15.1637 57.6833 14.5917C57.4283 14.0197 57.0706 13.5751 56.6104 13.258C56.1501 12.9409 55.6152 12.7824 55.0057 12.7824C54.3962 12.7824 53.8769 12.9378 53.4104 13.2487C52.9439 13.5596 52.5801 14.001 52.3189 14.573C52.0576 15.145 51.927 15.8041 51.927 16.5502C51.927 17.2963 52.0576 17.9772 52.3189 18.5554C52.5801 19.1336 52.9408 19.5844 53.4011 19.9077C53.8613 20.2311 54.3962 20.3927 55.0057 20.3927Z"
              fill="black"
            ></path>
            <path
              d="M64.7835 21.3254C63.9376 21.3254 63.1944 21.1388 62.5538 20.7658C61.9132 20.3927 61.4156 19.8456 61.0611 19.1243C60.7066 18.4031 60.5293 17.5388 60.5293 16.5316C60.5293 15.6362 60.7128 14.8311 61.0797 14.116C61.4467 13.401 61.9474 12.8414 62.5818 12.4373C63.2162 12.0331 63.9252 11.8311 64.7089 11.8311C65.5547 11.8311 66.2762 12.0238 66.8733 12.4093C67.4703 12.7948 67.9244 13.3388 68.2354 14.0414C68.5463 14.744 68.7018 15.5616 68.7018 16.4943V16.7368H61.6861C61.6861 17.5077 61.8167 18.1668 62.078 18.714C62.3392 19.2611 62.7062 19.6777 63.1788 19.9637C63.6515 20.2497 64.1926 20.3927 64.8021 20.3927C65.5236 20.3927 66.1238 20.2217 66.6027 19.8798C67.0816 19.5378 67.3771 19.0248 67.489 18.3409H68.6458C68.5588 18.9129 68.3566 19.4228 68.0394 19.8704C67.7222 20.3181 67.2869 20.6725 66.7333 20.9336C66.1798 21.1948 65.5298 21.3254 64.7835 21.3254ZM67.4703 15.8601C67.4579 14.9274 67.2091 14.1813 66.724 13.6217C66.2389 13.0621 65.5672 12.7824 64.7089 12.7824C63.8506 12.7824 63.1882 13.0715 62.6471 13.6497C62.106 14.2279 61.7981 14.9647 61.7235 15.8601H67.4703Z"
              fill="black"
            ></path>
            <path
              d="M70.4904 21.0645V12.0924H71.6472V13.8831C71.896 13.2862 72.2848 12.795 72.8134 12.4095C73.3421 12.024 73.9609 11.8313 74.67 11.8313C74.8441 11.8313 75.012 11.8437 75.1737 11.8686V12.9878C74.9623 12.9629 74.7757 12.9505 74.614 12.9505C74.0169 12.9505 73.4945 13.0841 73.0466 13.3515C72.5988 13.6189 72.2537 14.0012 72.0111 14.4987C71.7685 14.9961 71.6472 15.5743 71.6472 16.2334V21.0645H70.4904Z"
              fill="black"
            ></path>
            <path
              d="M78.0471 20.8158L77.9942 21.0676H74.334L74.3869 20.8158C75.3975 20.707 75.8111 20.4179 75.9728 19.6625L78.0284 9.97852C78.2461 8.98681 77.9382 8.82515 76.8933 9.03966L76.9462 8.78785L79.1821 8.0293H79.434L76.9618 19.6593C76.8 20.4179 77.0706 20.7039 78.044 20.8127L78.0471 20.8158Z"
              fill="black"
            ></path>
            <path
              d="M82.1701 20.8158L82.1173 21.0676H78.457L78.5099 20.8158C79.5206 20.707 79.9342 20.4179 80.0959 19.6625L81.3398 13.765C81.5575 12.7547 81.2683 12.6117 80.2047 12.8262L80.2576 12.5744L82.4935 11.8158H82.7454L81.0848 19.6594C80.9231 20.4179 81.1936 20.7039 82.167 20.8127L82.1701 20.8158ZM82.7828 8.55469C83.271 8.55469 83.5944 8.93396 83.5415 9.41894C83.47 9.90702 83.0378 10.2676 82.5682 10.2676C82.0644 10.2676 81.7192 9.90702 81.7938 9.41894C81.8467 8.93085 82.2821 8.55469 82.7859 8.55469H82.7828Z"
              fill="black"
            ></path>
            <path
              d="M88.4734 23.6663L89.4779 19.028C88.8466 20.3989 87.5312 21.3347 86.1411 21.3347C83.9052 21.3347 82.8572 19.2238 83.5258 16.0684C83.9953 13.7772 86.0509 11.8124 88.4859 11.8124C89.6054 11.8124 90.5228 12.316 90.9022 13.0559L91.7512 11.8124H92.003L89.4655 23.6601C89.2851 24.4715 89.935 24.6331 90.585 24.7419L90.5321 24.9938H86.3308L86.3837 24.7419C87.5934 24.6331 88.2962 24.4715 88.4765 23.6601L88.4734 23.6663ZM86.7382 20.6694C87.8919 20.6694 89.0456 19.6777 89.5867 18.487L90.3455 14.9337C90.5446 13.6528 89.9319 12.3191 88.1811 12.3191C86.4303 12.3191 85.062 13.8331 84.6111 16.0497C84.0327 18.773 84.8443 20.6663 86.7382 20.6663V20.6694Z"
              fill="black"
            ></path>
            <path
              d="M104.518 20.8158L104.465 21.0676H100.805L100.858 20.8158C101.868 20.707 102.282 20.4179 102.444 19.6625L103.687 13.765C103.905 12.7547 103.616 12.6117 102.552 12.8262L102.605 12.5744L104.841 11.8158H105.093L103.432 19.6594C103.271 20.4179 103.541 20.7039 104.515 20.8127L104.518 20.8158ZM105.13 8.55469C105.619 8.55469 105.942 8.93396 105.889 9.41894C105.818 9.90702 105.385 10.2676 104.916 10.2676C104.412 10.2676 104.067 9.90702 104.141 9.41894C104.194 8.93085 104.63 8.55469 105.134 8.55469H105.13Z"
              fill="black"
            ></path>
            <path
              d="M99.3212 19.6401L100.152 15.6795L100.969 11.8184H100.717L98.4815 12.5769L98.4287 12.8287C99.4736 12.6111 99.7814 12.7572 99.5638 13.7676L98.5002 18.7976C97.3278 19.8982 96.4975 20.5479 95.4868 20.5479C94.2429 20.5479 93.593 19.6992 93.9008 18.2412L95.2722 11.8215H95.0203L92.7658 12.58L92.7129 12.8318C93.7764 12.6142 94.0656 12.7603 93.8666 13.7707L92.8933 18.3873C92.5139 20.1002 93.3815 21.3437 94.9861 21.3437C96.0497 21.3437 96.9857 20.75 98.4256 19.2049L98.3572 19.5313V19.5469H98.354L98.0306 21.0764H100.354L100.407 20.8028C99.4331 20.694 99.1626 20.4049 99.3243 19.6494L99.3212 19.6401Z"
              fill="black"
            ></path>
            <path
              d="M114.269 11.4801L114.996 8.0293H114.745L112.509 8.78785L112.456 9.03966C113.501 8.82204 113.809 8.98681 113.591 9.97852L112.96 12.9163C112.562 12.248 111.697 11.8158 110.686 11.8158C108.233 11.8158 106.196 13.7619 105.673 16.2334C105.042 19.2272 106.071 21.335 108.326 21.335C109.732 21.335 111.069 20.3806 111.681 19.0096L111.52 19.7961L111.249 21.0645L113.572 21.0459L113.625 20.7941C112.652 20.6853 112.381 20.3961 112.543 19.6407L114.266 11.4801H114.269ZM111.787 18.4687C111.246 19.678 110.092 20.6697 108.92 20.6697C107.026 20.6697 106.214 18.7764 106.756 16.2148C107.259 13.8334 108.702 12.3195 110.382 12.3195C112.173 12.3195 112.77 13.7402 112.534 15.0334L112.45 15.4252L111.79 18.4687H111.787Z"
              fill="black"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_623_29714">
              <rect width="115" height="32" fill="black"></rect>
            </clipPath>
          </defs>
        </svg>
      )}
    </div>
  );
}

// -----------------  HEADER COMPONENT  -----------------

export default function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [connectOpen, setConnectOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [settingOpen, setsettingOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [selectedLang, setSelectedLang] = useState("English");
  const [moreOpen, setMoreOpen] = useState(false);

  const languages = [
    { name: "English", flag: "/svg/english.png" },
    { name: "Dutch", flag: "/svg/germany.png" },
    { name: "Español", flag: "/svg/spain.png" },
    { name: "Netherlands", flag: "/svg/netherland.png" },
  ];

  const selectedFlag =
    languages.find((lang) => lang.name === selectedLang)?.flag ||
    "/svg/english.png";

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth");
  };

  const isActive = (path: string) => pathname === path;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setLanguageOpen(false);
  };

  const toggleLanguage = () => setLanguageOpen((prev) => !prev);

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    setLanguageOpen(false);
  };


  const togglesetting = () => setsettingOpen((prev) => !prev);

  // const handlesettingSelect = () => {
  //   setsettingOpen(false);
  // };

  return (
    <header className="header bg-white dark:bg-[#0F1A1F]">
      {/* TOP BAR */}
      <div className="header-container flex items-center justify-between dark:border-gray-800">
        {/* LEFT: Logo + Desktop Nav */}
        <div className="flex items-center gap-[18px]">
          <Logo theme={theme} />

          {/* Desktop navigation */}
          <nav className="navigation">
            <ul className="nav-list flex items-center justify-start gap-[18px] text-black dark:text-white font-medium text-sm mt-1">
              {/* MAIN LINKS – as is */}
              {MAIN_LINKS.map((link) => (
                <li
                  key={link.href}
                  className={`menu-item relative
          after:content-[''] after:absolute after:left-0 after:bottom-0 
          after:h-[2px] after:w-0 after:bg-[#46c4b3] dark:after:bg-[#46c4b3]
          after:transition-all after:duration-300
          hover:after:w-full hover:text-[#46c4b3] dark:hover:text-[#46c4b3]
          ${isActive(link.href) ? "text-[#46c4b3]" : ""}
        `}
                >
                  <Link
                    className="font-[400] text-[12px] py-[8px] px-[10px]"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* DESKTOP-ONLY MORE DROPDOWN */}
              {EXTRA_LINKS.length > 0 && (
                <li
                  className="relative"
                  style={{ background: "transparent !important" }}
                >
                  <button
                    type="button"
                    onClick={() => setMoreOpen((prev) => !prev)}
                    style={{ background: "transparent !important" }}
                    className="font-[400] text-[12px] flex items-center gap-2 text-black dark:text-white hover:bg-transparent cursor-pointer"
                  >
                    More
                    <span
                      className={`inline-block transition-transform duration-200 ${
                        moreOpen ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 11 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <path
                          d="M1.375 7.7915L5.5 3.6665L9.625 7.7915"
                          stroke-width="0.7"
                          stroke="#fff"
                        ></path>
                      </svg>
                    </span>
                  </button>

                  {moreOpen && (
                    <div className="absolute left-0 mt-1 max-w-[273px] w-[150px] rounded-lg bg-white dark:bg-[#1B2429] border border-gray-300 dark:border-gray-700 shadow-lg z-40">
                      <ul className="py-1 text-sm text-gray-800 dark:text-gray-100">
                        {EXTRA_LINKS.map((link) => (
                          <li key={link.href} className="hover:text-[#00D5BE]">
                            <Link
                              href={link.href}
                              onClick={() => setMoreOpen(false)}
                              className="block text-start p-[10px] font-[400] text-[12px] "
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>

        {/* RIGHT: buttons + lang + theme + mobile menu */}
        <div className="flex items-center gap-2 relative">
          {!session ? (
            <>
              {/* Connect: mobile + desktop */}
              <button
                onClick={() => {
                  setConnectOpen(true);
                  setMenuOpen(false);
                }}
                className="font-[400] text-[12px] cursor-pointer text-black dark:text-black py-2 px-4 bg-[#46c4b3] hover:bg-[#46c4b5] rounded-lg"
              >
                Connect
              </button>

              {/* Sign Up: sirf md aur upar, mobile pe hidden */}
              <Link
                href="/Account/Register"
                className="hidden md:inline-block font-[400] text-[12px] py-2 px-4 bg-[#46c4b3] rounded-lg"
              >
                <span className="text-black font-normal">Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="bg-[#46c4b3] cursor-pointer py-2 px-4 rounded-lg text-black text-[12px]"
              >
                Log Out
              </button>
            </>
          )}

          {/* Language Button */}
          <div className="relative">
            <button
              onClick={toggleLanguage}
              className="language-icon-btn cursor-pointer hover:bg-[#46c4b3] text-black dark:text-white border border-gray-700 rounded-lg p-2"
              aria-label="Change Language"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7.0001 0.332031C10.6826 0.332031 13.6678 3.31726 13.6678 6.99973C13.6678 10.6822 10.6826 13.6674 7.0001 13.6674C3.31762 13.6674 0.332397 10.6822 0.332397 6.99973C0.332397 3.31726 3.31762 0.332031 7.0001 0.332031Z
                    M8.95937 9.99953H5.04082C5.47552 11.609 6.2311 12.6674 7.0001 12.6674C7.7691 12.6674 8.52464 11.609 8.95937 9.99953Z
                    M4.00564 9.99993L2.19064 9.99986C2.82954 11.0219 3.78517 11.8256 4.92009 12.2736C4.5719 11.7271 4.28458 11.0429 4.07324 10.2633L4.00564 9.99993Z
                    M11.8096 9.99986L9.99457 9.99993C9.7787 10.8891 9.46697 11.6663 9.07937 12.2736C10.144 11.8536 11.0505 11.1209 11.6861 10.1889L11.8096 9.99986Z
                    M3.72904 5.66596H1.49064C1.38608 6.10166 1.3324 6.5444 1.3324 6.99973C1.3324 7.70386 1.46078 8.37793 1.69544 8.99993H3.81088C3.71601 8.36693 3.66573 7.6948 3.66573 6.99973C3.66573 6.54373 3.68737 6.0976 3.72904 5.66596Z
                    M9.2647 5.666H4.73548C4.69013 6.09286 4.66572 6.53933 4.66572 6.99973C4.66572 7.70606 4.72316 8.3796 4.82555 8.9998H9.17464C9.27704 8.3796 9.33444 7.70606 9.33444 6.99973C9.33444 6.53933 9.31004 6.09286 9.2647 5.666Z
                    M12.5098 5.6654H10.2712C10.3128 6.0976 10.3344 6.54373 10.3344 6.99973C10.3344 7.6948 10.2842 8.36693 10.1893 8.99966H12.3048C12.5394 8.37793 12.6678 7.70386 12.6678 6.99973C12.6678 6.54013 12.6131 6.09333 12.5098 5.6654Z
                    M4.9208 1.72583C3.54065 2.27478 2.43664 3.33299 1.83352 4.66623H3.8656C4.07451 3.49795 4.43907 2.48066 4.9208 1.72583Z
                    M7.0001 1.33203C6.07937 1.41273 5.26438 2.74738 4.8859 4.6662H9.1143C8.73684 2.75276 7.92537 1.42022 7.0843 1.33624L7.0001 1.33203Z
                    M9.0801 1.72587C9.59744 2.58358 9.93624 3.55683 10.1346 4.66648H12.1666C11.5902 3.39196 10.5562 2.36894 9.27424 1.80672L9.0801 1.72587Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1b2429] border border-gray-700 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {languages.map((lang) => (
                    <li key={lang.name}>
                      <button
                        onClick={() => handleLanguageSelect(lang.name)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-800 text-[12px]"
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.name}
                          width={15}
                          height={15}
                          className="rounded-full"
                        />
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={togglesetting}
              className="border border-gray-700 cursor-pointer rounded-lg p-2 hover:bg-[#46c4b3] dark:hover:bg-gray-800 transition"
            >
              {/* {theme === "dark" ? (
              <Sun size={15} className="text-white" />
            ) : (
              <Moon size={15} className="text-gray-700 dark:text-gray-200" />
            )} */}
              <Settings size={15} className="text-white" />
            </button>
            {settingOpen && (
              <div className="absolute right-0 mt-2 w-[273px] bg-[#1b2429] border border-gray-700 rounded-lg shadow-lg z-50 px-2">
                <ul className="py-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#949e9c] text-[12px]">Skip Open Order Confirmation</p>
                    <input type="checkbox" className="border border-gray-700 bg-none" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#949e9c] text-[12px]">Skip Close Position Confirmation</p>
                    <input type="checkbox" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#949e9c] text-[12px]">Show CCTP Options</p>
                    <input type="checkbox" />
                  </div><div className="flex items-center justify-between mb-2">
                    <p className="text-[#949e9c] text-[12px]">Display Verbose Errors</p>
                    <input type="checkbox" />
                  </div><div className="flex items-center justify-between mb-2">
                    <p className="text-[#949e9c] text-[12px]">Disable Background Fill Notifications</p>
                    <input type="checkbox" />
                  </div><div className="flex items-center justify-between mb-2">
                    <p className="text-[#949e9c] text-[12px]">Customize Layout</p>
                    <input type="checkbox" />
                  </div>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </div>

      {/* CONNECT MODAL */}
      {connectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="relative w-[380px] rounded-2xl bg-[#0b141b] p-6 shadow-2xl border border-white/10">
            <button
              onClick={() => setConnectOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white text-xl transition"
            >
              ✕
            </button>

            <h2 className="mb-5 text-center text-lg font-semibold text-white">
              Connect
            </h2>

            <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
              <MdEmail size={18} />
              <span className="text-sm font-medium text-white">
                Log in with Email
              </span>
            </div>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
              <FaWallet size={18} />
              <span className="text-sm font-medium text-white">
                Default Wallet
              </span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
              <FaConnectdevelop size={18} />
              <span className="text-sm font-medium text-white">
                WalletConnect
              </span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
              <SiOkx size={18} />
              <span className="text-sm font-medium text-white">OKX Wallet</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition cursor-pointer">
              <SiCoinbase size={18} />
              <span className="text-sm font-medium text-white">
                Coinbase Wallet
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE SIDEBAR (LEFT SIDE) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* LEFT: Sidebar panel */}
          <div className="w-64 max-w-[70%] bg-[#020910] text-white h-full shadow-xl flex flex-col">
            {/* Sidebar header (logo + close) */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <Logo theme={theme} className="scale-75 origin-left" />
              <button
                onClick={toggleMenu}
                className="p-1 rounded-md hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sidebar nav items */}
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-3 px-4 text-sm">
                {MAIN_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-1.5 pl-2 border-l-2 text-[14px] font-medium ${
                        isActive(link.href)
                          ? "text-[#46c4b3] border-[#46c4b3]"
                          : "text-white border-transparent"
                      } hover:text-[#46c4b3] hover:border-[#46c4b3]`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {EXTRA_LINKS.length > 0 && (
                <>
                  <div className="mt-5 border-t border-white/10" />
                  <ul className="space-y-3 px-4 pt-4 text-sm">
                    {EXTRA_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block py-1.5 pl-2 text-[13px] text-gray-300 hover:text-[#46c4b3]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </nav>
          </div>

          {/* RIGHT: overlay, click to close */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </header>
  );
}

/*


'use client';

import { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '@/lib/actions/auth-actions';

import { auth } from '../../lib/auth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Session = typeof auth.$Infer.Session;

export default function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth');
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMode = () => setIsDarkMode(!isDarkMode);
  const toggleLanguage = () => setLanguageOpen(!languageOpen);

  const languages = [
    { name: 'English', flag: '/svg/english.png' },
    { name: 'Dutch', flag: '/svg/germany.png' },
    { name: 'Español', flag: '/svg/spain.png' },
    { name: 'Netherlands', flag: '/svg/netherland.png' },
  ];

  const handleLanguageSelect = (lang: string) => {
    setSelectedLang(lang);
    setLanguageOpen(false);
  };

  const selectedFlag =
    languages.find((lang) => lang.name === selectedLang)?.flag || '/svg/english.png';

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Fybit Logo"
              width={120}
              height={40}
              className="block dark:hidden"
            />
          </Link>
        </div>
        <div className="light-logo">
          <Link href="/">
            <Image
              src="/images/FYBIT_black_horizontal.png"
              alt="Fybit Light Logo"
              width={120}
              height={40}
              className="hidden dark:block"
            />
          </Link>
        </div>

        <nav className="navigation">
          <ul className="nav-list">
            <li className="menu-item">
              <Link href="/Chart">Trade</Link>
            </li>
            <li className="menu-item">
              <Link href="/Account/Deposit">Wallet</Link>
            </li>
            <li className="menu-item">
              <Link href="/Account">Account</Link>
            </li>
            <li className="menu-item">
              <Link href="/Faq">FAQ</Link>
            </li>
            <li className="menu-item">
              <Link href="/Support">Support</Link>
            </li>
          </ul>
        </nav>

        <div className="header-buttons flex items-center gap-3 relative">
          {!session ? (
            <>
              <Link href="/Account/Login" className="button login-button">
                Log In
              </Link>
              <Link
                href="/Account/Register"
                className="bg-[#50D2C1] hover:bg-yellow-600 p-3  rounded"
              >
                <span className="text-white">Sign Up</span>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOut}
                className="bg-[#50D2C1] hover:bg-yellow-600 p-3  rounded text-white"
              >
                Log Out
              </button>
            </>
          )}

          <div className="relative">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 p-2 rounded-md border border-gray-300 border-gray-700  hover:bg-gray-800 transition"
            >
              <Image
                src={selectedFlag}
                alt={selectedLang}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{selectedLang}</span>
              <ChevronDown size={16} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-200 border-gray-700 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {languages.map((lang) => (
                    <li key={lang.name}>
                      <button
                        onClick={() => handleLanguageSelect(lang.name)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.name}
                          width={18}
                          height={18}
                          className="rounded-full"
                        />
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={toggleMode}
            className="p-2 rounded-md  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDarkMode ? (
              <Sun size={20} className="text-white" />
            ) : (
              <Moon size={20} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-gray-800 shadow-lg pb-4">
          <div className="flex items-right justify-end gap-3 py-4 px-4">
            {!session ? (
              <>
                <Link
                  href="/Account/Login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center border p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition button login-button"
                >
                  Log In
                </Link>
                <Link
                  href="/Account/Register"
                  onClick={() => setMenuOpen(false)}
                  className="text-white bg-[#50D2C1] p-3 rounded-md hover:bg-yellow-700"
                >
                  <span className="text-white">Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignOut}
                  className="bg-[#50D2C1] hover:bg-yellow-600-white p-3 rounded-md"
                >
                  Log Out
                </button>
              </>
            )}

            <button
              onClick={toggleMode}
              className="p-2 rounded-md  dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>

          <nav className="flex flex-col items-center text-xl gap-4 py-6">
            <Link href="/Chart" onClick={() => setMenuOpen(false)}>
              Trade
            </Link>
            <Link href="/Account/Deposit" onClick={() => setMenuOpen(false)}>
              Wallet
            </Link>
            <Link href="/Account" onClick={() => setMenuOpen(false)}>
              Account
            </Link>
            <Link href="/Faq" onClick={() => setMenuOpen(false)}>
              FAQ
            </Link>
            <Link href="/Support" onClick={() => setMenuOpen(false)}>
              Support
            </Link>
          </nav>
          <div className="border border-gray-500 my-3"></div>
          <div className="relative  flex items-center justify-center w-full ">
            <button
              onClick={toggleLanguage}
              className="flex  w-4/5 justify-center items-center gap-2 p-2 rounded-md border border-gray-300 border-gray-700  hover:bg-gray-800 transition"
            >
              <Image
                src={selectedFlag}
                alt={selectedLang}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{selectedLang}</span>
              <ChevronDown size={16} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-900 border-gray-700 rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  {languages.map((lang) => (
                    <li key={lang.name}>
                      <button
                        onClick={() => handleLanguageSelect(lang.name)}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.name}
                          width={18}
                          height={18}
                          className="rounded-full"
                        />
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


*/
