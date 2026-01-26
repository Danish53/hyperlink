"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    //     <div className="dark:bg-[#0a0a0a] bg-white footer-container">
    //       <div className="footer-placeholder ">
    //         <footer className="footer">
    //           <div className="footer__main ">
    //            <div className="footer-company-follow-us left space-y-2">
    //   <div className="footer-company-follow-us">
    //     <Link href="/">
    //       {/* Dark logo SVG */}
    //       <svg
    //         width="120"
    //         height="40"
    //         viewBox="0 0 115 32"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <g clipPath="url(#clip0)">
    //           <path
    //             d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
    //             fill="white"
    //           />
    //           {/* add the rest of your logo paths here */}
    //         </g>
    //         <defs>
    //           <clipPath id="clip0">
    //             <rect width="115" height="32" fill="white" />
    //           </clipPath>
    //         </defs>
    //       </svg>
    //     </Link>

    //     <Link href="/">
    //       {/* Light logo SVG (you can adjust fill if needed) */}
    //       <svg
    //         width="120"
    //         height="40"
    //         viewBox="0 0 115 32"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="hidden"
    //       >
    //         <g clipPath="url(#clip0)">
    //           <path
    //             d="M20.4523 14.5389C20.471 16.2176 20.1196 17.8218 19.4292 19.3544C18.4434 21.5368 16.0799 23.3213 13.9218 21.4218C12.1616 19.8736 11.8351 16.7306 9.19798 16.2705C5.7088 15.8477 5.62483 19.8923 3.34536 20.3492C0.804661 20.8653 -0.0380915 16.5938 -0.000774032 14.6539C0.0365434 12.714 0.552769 9.98759 2.76072 9.98759C5.30142 9.98759 5.47245 13.8332 8.69731 13.6249C11.8911 13.4073 11.947 9.40624 14.0337 7.69329C15.8343 6.2135 17.952 7.29847 19.0125 9.07982C19.9952 10.7275 20.4274 12.6612 20.4492 14.5389H20.4523Z"
    //             fill="black"
    //           />
    //           {/* add the rest of your logo paths here */}
    //         </g>
    //         <defs>
    //           <clipPath id="clip0">
    //             <rect width="115" height="32" fill="white" />
    //           </clipPath>
    //         </defs>
    //       </svg>
    //     </Link>
    //   </div>

    //   <div className="follow-us">
    //     <span className="text-[#999]">
    //       FYBIT - PnL leverage crypto trading platform
    //     </span>

    //     <div className="links flex gap-2">
    //       {/* Telegram */}
    //       <Link href="https://t.me/fybit" target="_blank">
    //         <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    //           <path d="M..." fill="#0088cc" />
    //           {/* Replace with actual Telegram icon path */}
    //         </svg>
    //       </Link>

    //       {/* Facebook */}
    //       <Link href="https://www.facebook.com/fybit" target="_blank">
    //         <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    //           <path d="M..." fill="#1877f2" />
    //           {/* Replace with actual Facebook icon path */}
    //         </svg>
    //       </Link>

    //       {/* YouTube */}
    //       <Link href="https://www.youtube.com/@fybit_com" target="_blank">
    //         <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    //           <path d="M..." fill="#FF0000" />
    //           {/* Replace with actual YouTube icon path */}
    //         </svg>
    //       </Link>

    //       {/* Twitter */}
    //       <Link href="https://twitter.com/fybitcom" target="_blank">
    //         <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    //           <path d="M..." fill="#1DA1F2" />
    //           {/* Replace with actual Twitter icon path */}
    //         </svg>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    //             <div className="footer-menu    flex space-x-10">
    //               <div className="column">
    //                 <div className="header1  dark:text-white text-[#333]">About</div>
    //                 <ul>
    //                   <li>
    //                     <Link href="/en/About">
    //                       <span className="dark:text-[#999] text-gray-500">About Us</span>
    //                     </Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/en/Terms">
    //                       <span className="dark:text-[#999] text-gray-500">Terms of Services</span>
    //                     </Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/en/Security" className="text-[#999]">
    //                       <span className="dark:text-[#999] text-gray-500">Security</span>
    //                     </Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/en/PrivacyPolicy" className="text-[#999]">
    //                       <span className="dark:text-[#999] text-gray-500">Privacy Policy</span>
    //                     </Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/en/CookiePolicy" className="text-[#999]">
    //                       <span className="dark:text-[#999] text-gray-500">Cookie Policy</span>
    //                     </Link>
    //                   </li>
    //                 </ul>
    //               </div>
    //               <div className="column">
    //                 <div className="header1 dark:text-white text-[#333]">Service</div>
    //                 <ul>
    //                   <li>
    //                     <Link href="/en/Faq">
    //                       <span className="dark:text-[#999] text-gray-500">FAQ</span>
    //                     </Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/en/FeesAndLimits">
    //                       <span className="dark:text-[#999] text-gray-500">Fees</span>
    //                     </Link>
    //                   </li>
    //                   <li>
    //                     <Link href="/en/Rules">
    //                       <span className="dark:text-[#999] text-gray-500">Rules</span>
    //                     </Link>
    //                   </li>
    //                 </ul>
    //               </div>
    //               <div className="column">
    //                 <div className="header1  dark:text-white text-[#333]">Referral Program</div>
    //                 <ul>
    //                   <li>
    //                     <Link href="/en/Account/Guide">
    //                       <span className="dark:text-[#999] text-gray-500">Guides</span>
    //                     </Link>
    //                   </li>

    //                   <li>
    //                     <Link href="/en/Account/Rules">
    //                       <span className="dark:text-[#999] text-gray-500">Rules</span>
    //                     </Link>
    //                   </li>

    //                   <li>
    //                     <Link href="/en/Account/ReferralAccount">
    //                       <span className="dark:text-[#999] text-gray-500">Referral Account</span>
    //                     </Link>
    //                   </li>
    //                 </ul>
    //               </div>
    //             </div>
    //             <div className="right"></div>
    //           </div>
    //           <Link href="/support" className="support-button">
    //             <Image
    //               src="/images/icons/support-linkv3.png"
    //               alt="Support Icon"
    //               width={24}
    //               height={24}
    //             />
    //           </Link>
    //         </footer>
    //       </div>

    //       <footer className="footer border-t border-t-gray-700">
    //         <p
    //           className="
    //                       dark:text-[#999] text-gray-500"
    //         >
    //           2018-2025 FYBIT.COM. v3.0.1
    //         </p>
    //       </footer>
    //     </div>
    <div className=" mt-8 pb-4 flex items-center justify-between px-2 text-[11px] text-gray-300">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22c55e] bg-[#050f12]">
        <span className="h-2 w-2 rounded-full bg-[#050f12]" />
        <span>Online</span>
      </div>

      <div className="flex gap-6">
        <button className="hover:text-white">Docs</button>
        <button className="hover:text-white">Support</button>
        <button className="hover:text-white">Terms</button>
        <button className="hover:text-white">Privacy Policy</button>
      </div>
    </div>
  );
}
